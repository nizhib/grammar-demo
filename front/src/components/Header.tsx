import { Component } from 'solid-js';

import Container from './lib/flowbite/Container';
import ThemeSwitcher from './lib/flowbite/ThemeSwitcher';

const Header: Component = () => {
  return (
    <header>
      <nav class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <Container class="flex flex-wrap items-center justify-between px-2 py-4 md:px-4 lg:px-6">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-50 md:text-2xl lg:text-3xl">
            🧑‍🏫{' '}
            <span class="lime-600 bg-gradient-to-tr from-lime-600 to-blue-600 bg-clip-text text-transparent">
              Who is on duty tod.ai?
            </span>{' '}
            🤖
          </h1>
          <ThemeSwitcher />
        </Container>
      </nav>
    </header>
  );
};

export default Header;
