import { Component, JSX, ParentComponent, splitProps } from 'solid-js';

import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

const buttonVariants = cva('rounded-lg text-center font-medium focus:outline-none focus:ring-4', {
  variants: {
    intent: {
      primary: 'text-white focus:ring-primary-300 dark:focus:ring-primary-800',
      secondary: 'border bg-white focus:ring-gray-200 dark:bg-gray-800 dark:focus:ring-gray-600',
      dark: 'text-white focus:ring-gray-300 dark:border-gray-700 dark:focus:ring-gray-700',
      light: 'border bg-white focus:ring-gray-200 dark:focus:ring-gray-700',
      info: 'text-white focus:ring-blue-300 dark:focus:ring-blue-800',
      success: 'text-white focus:ring-green-300 dark:focus:ring-green-800',
      warning: 'text-white focus:ring-amber-300 dark:focus:ring-amber-800',
      danger: 'text-white focus:ring-red-300 dark:focus:ring-red-800',
      transparent:
        'text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
    },
    size: {
      xs: 'px-3 py-2 text-xs',
      sm: 'px-3 py-2 text-sm',
      sq: 'p-2.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
      xl: 'px-6 py-3.5 text-base',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      disabled: false,
      intent: 'primary',
      class: 'bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 hover:dark:bg-primary-700',
    },
    {
      disabled: true,
      intent: 'primary',
      class: 'bg-primary-400 dark:bg-primary-500 hover:bg-primary-400 hover:dark:bg-primary-500',
    },
    {
      disabled: false,
      intent: 'secondary',
      class:
        'border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-primary-700 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
    },
    {
      disabled: true,
      intent: 'secondary',
      class:
        'border-gray-200 text-gray-400 hover:bg-white hover:text-gray-400 dark:border-gray-700 dark:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-600',
    },
    {
      disabled: false,
      intent: 'dark',
      class: 'bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 hover:dark:bg-gray-600',
    },
    {
      disabled: true,
      intent: 'dark',
      class:
        'bg-gray-500 dark:text-gray-300 dark:bg-gray-500 hover:bg-gray-500 hover:dark:bg-gray-500',
    },
    {
      disabled: false,
      intent: 'light',
      class:
        'border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700',
    },
    {
      disabled: true,
      intent: 'light',
      class:
        'border-gray-200 text-gray-400 hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-600 dark:hover:border-gray-700 dark:hover:bg-gray-800',
    },
    {
      disabled: false,
      intent: 'info',
      class: 'bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 hover:dark:bg-blue-700',
    },
    {
      disabled: true,
      intent: 'info',
      class: 'bg-blue-400 dark:bg-blue-500 hover:bg-blue-400 hover:dark:bg-blue-500',
    },
    {
      disabled: false,
      intent: 'success',
      class: 'bg-green-700 dark:bg-green-600 hover:bg-green-800 hover:dark:bg-green-700',
    },
    {
      disabled: true,
      intent: 'success',
      class: 'bg-green-400 dark:bg-green-500 hover:bg-green-400 hover:dark:bg-green-500',
    },
    {
      disabled: false,
      intent: 'warning',
      class: 'bg-amber-700 dark:bg-amber-600 hover:bg-amber-800 hover:dark:bg-amber-700',
    },
    {
      disabled: true,
      intent: 'warning',
      class: 'bg-amber-400 dark:bg-amber-500 hover:bg-amber-400 hover:dark:bg-amber-500',
    },
    {
      disabled: false,
      intent: 'danger',
      class: 'bg-red-700 dark:bg-red-600 hover:bg-red-800 hover:dark:bg-red-700',
    },
    {
      disabled: true,
      intent: 'danger',
      class: 'bg-red-400 dark:bg-red-500 hover:bg-red-400 hover:dark:bg-red-500',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
});

// FIXME(nizhib): why cva creates T | null | **undefined**?
export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'disabled'> {}

const Button: ParentComponent<ButtonProps> = (props) => {
  const [, rest] = splitProps(props, ['intent', 'size', 'children', 'class']);

  return (
    <button
      class={buttonVariants({
        intent: props.intent,
        size: props.size,
        class: props.class,
        disabled: rest.disabled,
      })}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export const ButtonDemo: Component = () => {
  return (
    <div class="-mr-4 mt-4 flex flex-col gap-4 px-4 py-4">
      <div class="flex gap-4">
        <Button>Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="dark">Dark</Button>
        <Button intent="light">Light</Button>
        <Button intent="info">Info</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
      </div>
      <div class="flex gap-4">
        <Button disabled>Primary</Button>
        <Button intent="secondary" disabled>
          Secondary
        </Button>
        <Button intent="dark" disabled>
          Dark
        </Button>
        <Button intent="light" disabled>
          Light
        </Button>
        <Button intent="info" disabled>
          Info
        </Button>
        <Button intent="success" disabled>
          Success
        </Button>
        <Button intent="warning" disabled>
          Warning
        </Button>
        <Button intent="danger" disabled>
          Danger
        </Button>
      </div>
      <div class="flex items-center gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </div>
  );
};

export default Button;
