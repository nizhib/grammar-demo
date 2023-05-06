import { Component } from 'solid-js';

import { ThemeProvider } from './lib/flowbite/ThemeSwitcher';

import Footer from './Footer';
import Grammarify from './Grammarify';
import Header from './Header';

const App: Component = () => {
  return (
    <ThemeProvider>
      <div class="flex min-h-screen flex-col bg-white dark:bg-gray-800">
        <Header />
        <main class="flex grow">
          <Grammarify />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
