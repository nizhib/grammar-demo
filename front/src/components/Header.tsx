import { DarkThemeToggle } from 'flowbite-react';

import Container from './ui/Container';

function Header() {
  return (
    <header>
      <nav className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <Container className="flex flex-wrap items-center justify-between px-2 py-4 md:px-4 lg:px-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50 md:text-2xl lg:text-3xl">
            🧑‍🏫{' '}
            <span className="lime-600 bg-gradient-to-tr from-lime-600 to-blue-600 bg-clip-text text-transparent">
              Who is on duty tod.ai?
            </span>{' '}
            🤖
          </h1>
          <DarkThemeToggle />
        </Container>
      </nav>
    </header>
  );
}

export default Header;
