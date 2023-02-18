import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FaGithub, FaKaggle, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa';

function SocialLink({
  href,
  brand,
  className,
  children,
}: {
  href: string;
  brand: string;
  className: string;
  children: React.ReactElement;
}) {
  const baseClasses = 'block h-5 w-5 text-gray-500';

  return (
    <a
      href={href}
      className={classNames(baseClasses, className)}
      aria-label={`Visit author's ${brand} profile`}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  className: PropTypes.string,
};
SocialLink.defaultProps = { className: '' };

export function GithubLink() {
  return (
    <SocialLink
      href="https://github.com/nizhib"
      brand="GitHub"
      className="hover:text-brand-gh dark:hover:text-gray-100"
    >
      <FaGithub className="h-full w-full" />
    </SocialLink>
  );
}

export function KaggleLink() {
  return (
    <SocialLink
      href="https://www.kaggle.com/nizhibitsky"
      brand="Kaggle"
      className="hover:text-brand-kg dark:hover:text-brand-kg"
    >
      <FaKaggle className="-mt-px h-full w-full" />
    </SocialLink>
  );
}

export function LinkedinLink() {
  return (
    <SocialLink
      href="https://www.linkedin.com/in/nizhibitsky/"
      brand="LinkedIn"
      className="hover:text-brand-li dark:hover:text-brand-li"
    >
      <FaLinkedin className="h-full w-full" />
    </SocialLink>
  );
}

export function TelegramLink() {
  return (
    <SocialLink
      href="https://t.me/nizhib"
      brand="Telegram"
      className="hover:text-brand-tg dark:hover:text-brand-tg"
    >
      <FaTelegram className="h-full w-full" />
    </SocialLink>
  );
}

export function TwitterLink() {
  return (
    <SocialLink
      href="https://twitter.com/nizhib"
      brand="Twitter"
      className="block h-5 w-5 text-gray-500 hover:text-brand-tw dark:text-gray-500 dark:hover:text-brand-tw"
    >
      <FaTwitter className="h-full w-full" />
    </SocialLink>
  );
}
