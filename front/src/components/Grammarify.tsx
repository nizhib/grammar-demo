import { Component, createSignal } from 'solid-js';

import Button from './lib/flowbite/Button';
import Container from './lib/flowbite/Container';
import { ThreeDots } from './lib/loaders';

import ResultViewer from './ui/ResultViewer';
import SourceEditor from './ui/SourceEditor';

const DEFAULT_TEXT = 'London iz ze capital ov Great Britain';
const PLACEHOLDER = 'Who is on duty today?';

type RequestData = {
  text: string;
};

type ResponseData = {
  success: boolean;
  total: number;
};

type SuccessfulResponse = ResponseData & {
  data: {
    message: string;
    conversation_id?: string;
    parent_id?: string;
  };
};

type FailedResponse = ResponseData & {
  message: string;
};

const Grammarify: Component = () => {
  const [source, setSource] = createSignal(DEFAULT_TEXT);
  const [result, setResult] = createSignal('');
  const [state, setState] = createSignal<'edit' | 'busy' | 'done' | 'fail'>('edit');

  const handleClick = async () => {
    if (state() !== 'edit') {
      setState('edit');
      return;
    }
    setResult('');
    setState('busy');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const request = { text: source() } as RequestData;
      const response = await fetch('/api/grammarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        let message = await response.text();
        try {
          const reponseData = JSON.parse(message) as FailedResponse;
          message = reponseData.message;
        } catch {
          // ignore
        } finally {
          message ||= `${response.status}: ${response.statusText}`;
          setResult(message);
          setState('fail');
        }
      } else {
        const data = (await response.json()) as SuccessfulResponse;
        setResult(data.data.message);
        setState('done');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setResult(message);
      setState('fail');
    }
  };

  const baseClass = 'text-gray-800 dark:text-gray-300 md:text-lg';
  const intent = () => {
    switch (state()) {
      case 'edit':
        return 'primary';
      case 'busy':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container class="flex grow flex-col gap-4 px-2 py-4 md:px-4 lg:px-6">
      {['edit', 'busy'].includes(state()) && (
        <SourceEditor
          value={source()}
          onInput={(e) => setSource(e.currentTarget.value)}
          class={baseClass}
          placeholder={PLACEHOLDER}
        />
      )}
      {state() === 'done' && <ResultViewer class={baseClass} result={result()} />}
      {state() === 'fail' && (
        <h2 class="grow text-lg text-red-600 dark:text-red-400 md:text-xl lg:text-2xl">
          {result()}
        </h2>
      )}
      <div>
        <Button
          disabled={state() === 'busy'}
          intent={intent()}
          onClick={handleClick}
          class="flex items-center gap-2"
        >
          {state() === 'edit' && 'Analyze the text'}
          {state() === 'busy' && (
            <>
              <ThreeDots class="h-4 w-4" />
              Sending $5 to Kenya...
            </>
          )}
          {['done', 'fail'].includes(state()) && 'Edit the text'}
        </Button>
      </div>
    </Container>
  );
};

export default Grammarify;
