import { Component, JSX, splitProps } from 'solid-js';

import { cx } from 'class-variance-authority';

const SourceEditor: Component<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const [, rest] = splitProps(props, ['class', 'spellcheck']);

  const baseClass = [
    'col-span-full',
    'row-span-full',
    'resize-none',
    'overflow-hidden',
    'border-0',
    'bg-white',
    'p-0',
    'text-lg',
    'placeholder-gray-400',
    'focus:ring-0',
    'dark:border-gray-800',
    'dark:bg-gray-800',
    'dark:placeholder-gray-400',
  ];

  const eoledValue = () => {
    switch (typeof props.value) {
      case 'object':
        return props.value.concat(['\n']);
      case 'string':
      case 'number':
        return `${props.value}\n`;
      default:
        return '\n';
    }
  };

  return (
    <div class="grid grow">
      <pre class={cx([baseClass, 'whitespace-pre-wrap', 'font-sans'])}>{eoledValue()}</pre>
      <textarea class={cx(baseClass, props.class)} spellcheck={false} {...rest} />
    </div>
  );
};

export default SourceEditor;
