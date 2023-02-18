import { useState } from 'react';

import { Button } from 'flowbite-react';

import Container from './ui/Container';
import TextEditor from './ui/TextEditor';
import TextRenderer from './ui/TextRenderer';

// import samples from '../assets/data';

// const DEFAULT_TEXT = samples[0].input;
const DEFAULT_TEXT = 'London iz a capital ov Great Britain';
const PLACEHOLDER = 'Who is on duty today?';

function Grammarify() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [fixed, setFixed] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setFixed('');
      setError('');
      setIsLoading(true);
      try {
        const response = await fetch('/api/grammarify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!response.ok) {
          let message = await response.text();
          try {
            message = JSON.parse(message).message;
          } catch {
            // ignore
          } finally {
            message ||= `${response.status}: ${response.statusText}`;
            setError(message);
          }
        } else {
          const data = await response.json();
          setFixed(data.data.message);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        setIsLoading(false);
        setIsEditing(false);
      }
    }
  }

  return (
    <Container className="flex grow flex-col gap-4 px-2 py-4 md:px-4 lg:px-6">
      {isEditing || isLoading ? (
        <TextEditor
          className="text-gray-800 dark:text-gray-300 md:text-lg"
          placeholder={PLACEHOLDER}
          value={text}
          onValueChange={setText}
        />
      ) : (
        <>
          {fixed && (
            <TextRenderer className="text-gray-800 dark:text-gray-300 md:text-lg" text={fixed} />
          )}
          {error && (
            <div className="grow">
              <h2 className="text-lg text-red-600 dark:text-red-400 md:text-xl lg:text-2xl">
                {error}
              </h2>
            </div>
          )}
        </>
      )}
      <div>
        <Button disabled={isLoading} color={isEditing ? 'info' : 'purple'} onClick={handleClick}>
          {isLoading ? 'Sending $5 to Kenya...' : isEditing ? 'Analyze the text' : 'Edit the text'}
        </Button>
      </div>
    </Container>
  );
}

export default Grammarify;
