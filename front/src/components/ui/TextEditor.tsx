import classNames from 'classnames';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange: (newValue: string) => void;
}

function TextEditor(props: TextAreaProps) {
  const baseClass = classNames(
    'resize-none',
    'placeholder-gray-400',
    'border-0',
    'bg-white',
    'p-0',
    'focus:ring-0',
    'dark:border-gray-800',
    'dark:bg-gray-800',
    'dark:placeholder-gray-400'
  );
  const { className, placeholder, value, onValueChange } = props;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(e.target.value);
  };

  const valueEOL = `${value ? value.toString() : ''}\n`;

  return (
    <div className="grid grow">
      <pre className="col-span-full row-span-full whitespace-pre-wrap font-sans text-lg">
        {valueEOL}
      </pre>
      <textarea
        value={value}
        onChange={onChange}
        className={classNames('col-span-full row-span-full overflow-hidden', baseClass, className)}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
}

export default TextEditor;
