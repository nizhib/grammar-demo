#!/usr/bin/env python3

__author__ = "nizhib"

import json
import logging
import os
import time
from dataclasses import asdict, dataclass
from http import HTTPStatus

import openai
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import UJSONResponse as JSONResponse
from pydantic import BaseModel

load_dotenv()

OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "NO_MODEL_PROVIDED")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "NO_API_KEY_PROVIDED")
OPENAI_ORGANIZATION = os.environ.get("OPENAI_ORGANIZATION")
LOGGING_LEVEL = "DEBUG"
LOGGING_FORMAT = "[%(asctime)s] %(name)s:%(lineno)d: %(message)s"

logging.basicConfig(format=LOGGING_FORMAT, level=LOGGING_LEVEL)

openai.api_key = OPENAI_API_KEY
openai.organization = OPENAI_ORGANIZATION

app = FastAPI(root_path="/api")
logger = logging.getLogger(__file__)
with open("prompts.json") as fin:
    prompts = json.load(fin)


class RequestData(BaseModel):
    text: str


@dataclass
class GPTMessage:
    content: str
    role: str = "user"


@dataclass
class GPTQuery:
    model: str
    messages: list[GPTMessage]


@dataclass
class GPTResponse:
    message: str


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

    message = GPTMessage(content=prompt_for(request.text))
    query = GPTQuery(model=OPENAI_MODEL, messages=[message])

    try:
        completion = openai.ChatCompletion.create(**asdict(query))
        response = completion.choices[0].message.content
        result.data = GPTResponse(message=response)
        result.success = True
    except Exception as e:
        logger.exception(e)
        result.message = str(e)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    result.total = time.time() - start

    return JSONResponse(asdict(result), status_code=status)
