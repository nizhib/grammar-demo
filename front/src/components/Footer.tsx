import Container from './ui/Container';
import { GithubLink, KaggleLink, LinkedinLink, TelegramLink, TwitterLink } from './ui/SocialLinks';

function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <Container className="px-2 py-4 md:px-4 lg:p-6">
        <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 md:flex-row md:gap-1 ">
          <p>&copy; {year} Evgeny Nizhibitsky.</p>
          <p>
            Powered by{' '}
            <a
              href="https://openai.com/"
              className="text-primary-600 hover:underline dark:text-primary-500"
              target="_blank"
              rel="noreferrer"
            >
              OpenAI
            </a>
            .
          </p>
        </div>
        <ul className="mt-4 flex justify-center gap-4">
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
}

export default Footer;
