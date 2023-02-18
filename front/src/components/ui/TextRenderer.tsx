import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Tooltip } from 'flowbite-react';

function renderText(text: string) {
  if (text.startsWith('Output:')) {
    text = text.slice(7);
  }
  text = text.trim();

  const fixRE = /<bad>([^<>]*)<\/bad><good>([^<>]*)<\/good><why>([^<>]*)<\/why>/g;
  const splitRE = /<bad>[^<>]*<\/bad><good>[^<>]*<\/good><why>[^<>]*<\/why>/g;

  const fixes = [...text.matchAll(fixRE)];
  const parts: JSX.Element[] = fixes.map((fix) => {
    const [bad, good, why] = fix.slice(1, 4);
    const badElement = <span className="text-red-600 line-through dark:text-red-400">{bad}</span>;
    const goodElement = <span className="text-emerald-600 dark:text-emerald-400">{good}</span>;
    return (
      <Tooltip content={why}>
        {badElement}
        {goodElement}
        {/* {whyElement} */}
      </Tooltip>
    );
  });

  const plains: string[] = text.split(splitRE);

  const elements: JSX.Element[] = [];
  while (parts.length) {
    elements.push(<span key={elements.length}>{plains.pop()}</span>);
    elements.push(
      <div className="inline-block" key={elements.length}>
        {parts.pop()}
      </div>
    );
  }
  elements.push(<span key={elements.length}>{plains.pop()}</span>);
  return elements.reverse();
}

function TextRenderer({ className, text }: { className: string; text: string }) {
  return (
    <pre className={classNames('grow whitespace-pre-wrap font-sans', className)}>
      {renderText(text)}
    </pre>
  );
}
TextRenderer.propTypes = { className: PropTypes.string, text: PropTypes.string.isRequired };
TextRenderer.defaultProps = { className: '' };

export default TextRenderer;
