import { ParentComponent, createSignal, onCleanup, onMount } from 'solid-js';

import { cx } from 'class-variance-authority';

interface TooltipProps {
  content: string;
}

const Tooltip: ParentComponent<TooltipProps> = (props) => {
  let baseRef: HTMLDivElement | undefined;
  let tipRef: HTMLDivElement | undefined;
  let sqRef: HTMLDivElement | undefined;

  const [isActive, setIsActive] = createSignal(false);
  const [tipLeft, setTipLeft] = createSignal(0);
  const [tipTop, setTipTop] = createSignal(0);
  const [sqLeft, setSqLeft] = createSignal(0);
  const [sqBot, setSqBot] = createSignal(0);

  const onResize = () => {
    const bodyWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    const baseRect = baseRef!.getBoundingClientRect();
    const tipRect = tipRef!.getBoundingClientRect();
    const sqRect = sqRef!.getBoundingClientRect();
    const newLeft = baseRef!.offsetLeft + baseRect.width / 2 - tipRect.width / 2;
    const overflow = Math.max(0, newLeft + tipRect.width - bodyWidth + 1);
    const underflow = Math.min(0, newLeft);
    setTipLeft(newLeft - overflow - underflow);
    setSqLeft(tipRect.width / 2 - sqRect.width / 2 + overflow + underflow);
    setTipTop(baseRef!.offsetTop - sqRect.height / 6 - tipRect.height);
    setSqBot(-sqRect.height / 3);
  };

  onMount(() => {
    onResize();
    window.addEventListener('resize', onResize);
  });

  onCleanup(() => {
    window.removeEventListener('resize', onResize);
  });

  const baseClasses =
    'absolute z-10 inline-block rounded-lg bg-gray-900 py-2 px-3 text-sm font-medium text-white shadow-sm transition-opacity duration-300 dark:bg-gray-700';
  const hiddenClasses = 'invisible opacity-0';

  return (
    <span
      class="inline-block"
      ref={baseRef}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {props.children}
      <span
        ref={tipRef}
        class={cx(baseClasses, !isActive() && hiddenClasses)}
        style={{ top: `${tipTop()}px`, left: `${tipLeft()}px` }}
        role="tooltip"
      >
        <span class="relative z-20">{props.content}</span>
        <span
          ref={sqRef}
          class="absolute z-10 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"
          style={{ bottom: `${sqBot()}px`, left: `${sqLeft()}px` }}
        >
          &nbsp;
        </span>
      </span>
    </span>
  );
};

export default Tooltip;
