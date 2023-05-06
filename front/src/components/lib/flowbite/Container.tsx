import { Component, ParentProps } from 'solid-js';

import { cx } from 'class-variance-authority';

const baseClass = 'mx-auto max-w-5xl';

interface ContainerProps extends ParentProps {
  class: string;
}

const Container: Component<ContainerProps> = (props) => {
  return <div class={cx([baseClass, props.class])}>{props.children}</div>;
};

export default Container;
