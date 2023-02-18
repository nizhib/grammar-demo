#!/usr/bin/env python3

__author__ = "nizhib"

import json
import logging
import os
import time
from dataclasses import asdict, dataclass
from http import HTTPStatus

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import UJSONResponse as JSONResponse
from pydantic import BaseModel
from revChatGPT.V1 import Chatbot

load_dotenv()

ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
LOGGING_LEVEL = "DEBUG"
LOGGING_FORMAT = "[%(asctime)s] %(name)s:%(lineno)d: %(message)s"

logging.basicConfig(format=LOGGING_FORMAT, level=LOGGING_LEVEL)

with open("prompts.json") as fin:
    prompts = json.load(fin)
chatbot = Chatbot(config={"access_token": ACCESS_TOKEN})
app = FastAPI(root_path="/api")
logger = logging.getLogger(__file__)


class RequestData(BaseModel):
    text: str


@dataclass
class GPTQuery:
    prompt: str
    conversation_id: str | None = None
    parent_id: str | None = None


@dataclass
class GPTResponse:
    message: str
    conversation_id: str | None = None
    parent_id: str | None = None


@dataclass
class ResponseData:
    success: bool = False
    data: GPTResponse | None = None
    message: str | None = None
    total: float | None = None


def prompt_for(text: str) -> str:
    prompt = []
    prompt.append(prompts["intro"])
    for rule in prompts["rules"]:
        prompt.append(rule)
    prompt.append(prompts["before"])
    for example in prompts["examples"]:
        prompt.append(f"Input: {example['input']}")
        prompt.append(f"Output: {example['output']}")
    prompt.append(prompts["after"])
    prompt.append(f"Input: {text}")
    return "\n".join(prompt)


@app.post("/grammarify", response_model=ResponseData, response_class=JSONResponse)
def grammarify(request: RequestData) -> JSONResponse:
    start = time.time()
    status = HTTPStatus.OK
    result = ResponseData()

    query = GPTQuery(prompt=prompt_for(request.text))

    try:
        messages = []
        read = 0
        for data in chatbot.ask(**asdict(query)):
            messages.append(data["message"][read:])
            read = len(data["message"])

        result.data = GPTResponse(message="".join(messages))
        result.success = True
    except Exception as e:
        logger.exception(e)
        result.message = str(e)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    result.total = time.time() - start

    return JSONResponse(asdict(result), status_code=status)
