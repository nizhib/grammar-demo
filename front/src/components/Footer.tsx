import { Component } from 'solid-js';

import Container from './lib/flowbite/Container';

import { GithubLink, KaggleLink, LinkedinLink, TelegramLink, TwitterLink } from './ui/SocialLinks';

const Footer: Component = () => {
  const year = new Date().getFullYear();

  return (
    <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <Container class="px-2 py-4 md:px-4 lg:p-6">
        <div class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 md:flex-row md:gap-1 ">
          <p>&copy; {year} Evgeny Nizhibitsky.</p>
          <p>
            Powered by{' '}
            <a
              href="https://openai.com/"
              class="text-blue-600 hover:underline dark:text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              OpenAI
            </a>
            .
          </p>
        </div>
        <ul class="mt-4 flex justify-center gap-4">
          <li>
            <GithubLink />
          </li>
          <li>
            <LinkedinLink />
          </li>
          <li>
            <TwitterLink />
          </li>
          <li>
            <KaggleLink />
          </li>
          <li>
            <TelegramLink />
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
