import { createEffect, createSignal, JSXElement, ParentComponent } from 'solid-js';

import { cx } from 'class-variance-authority';

import Tooltip from '../lib/flowbite/Tooltip';

interface ResultViewerProps {
  result: string;
  class?: string;
}

const ResultViewer: ParentComponent<ResultViewerProps> = (props) => {
  const [elements, setElements] = createSignal<JSXElement[]>();

  createEffect(() => {
    let text = props.result;
    if (text.startsWith('Output:')) {
      text = text.slice(7);
    }
    text = text.trim();

    const fixRE = /<bad>([^<>]*)<\/bad><good>([^<>]*)<\/good><why>([^<>]*)<\/why>/g;
    const splitRE = /<bad>[^<>]*<\/bad><good>[^<>]*<\/good><why>[^<>]*<\/why>/g;

    const fixes = [...text.matchAll(fixRE)].reverse();
    const parts: JSXElement[] = fixes.map((fix) => {
      const [bad, good, why] = fix.slice(1, 4);
      let p = 0;
      while (bad[p] && bad[p] === good[p]) {
        p += 1;
      }
      while (p && bad[p - 1] !== ' ') {
        p -= 1;
      }
      const commonPrefix = bad.substring(0, p);
      const badSuffix = bad.substring(p, bad.length);
      const goodSuffix = good.substring(p, good.length);
      const badElement = (
        <span class="select-none text-red-600 line-through dark:text-red-400">{badSuffix}</span>
      );
      const goodElement = <span class="text-emerald-600 dark:text-emerald-400">{goodSuffix}</span>;
      return (
        <>
          {commonPrefix}
          <Tooltip content={why}>
            {badElement}
            {goodElement}
          </Tooltip>
        </>
      );
    });

    const plains = text.split(splitRE).reverse();

    const newElements: JSXElement[] = [];
    while (parts.length) {
      newElements.push(<span>{plains.pop()}</span>);
      newElements.push(parts.pop());
    }
    newElements.push(<span>{plains.pop()}</span>);
    setElements(newElements);
  });

  const baseClass = 'grow whitespace-pre-wrap font-sans';

  return <pre class={cx(baseClass, props.class)}>{elements()}</pre>;
};

export default ResultViewer;
