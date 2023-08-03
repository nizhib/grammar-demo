import { Component, ParentProps } from 'solid-js';

import { cx } from 'class-variance-authority';
import {
  FaBrandsGithub,
  FaBrandsKaggle,
  FaBrandsLinkedin,
  FaBrandsTelegram,
  FaBrandsTwitter,
} from 'solid-icons/fa';

interface SocialLinkProps extends ParentProps {
  href: string;
  brand: string;
  class?: string;
}

const SocialLink: Component<SocialLinkProps> = (props) => {
  const baseClass = 'block h-5 w-5 text-gray-500';

  return (
    <a
      href={props.href}
      class={cx(baseClass, props.class)}
      aria-label={`Visit author's ${props.brand} profile`}
      rel="noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
};

export const GithubLink: Component = () => {
  return (
    <SocialLink
      href="https://github.com/nizhib"
      brand="GitHub"
      class="hover:text-[#171515] dark:hover:text-gray-100"
    >
      <FaBrandsGithub class="h-full w-full" fill="currentColor" />
    </SocialLink>
  );
};

export const KaggleLink: Component = () => {
  return (
    <SocialLink
      href="https://www.kaggle.com/nizhibitsky"
      brand="Kaggle"
      class="hover:text-[#20BEFF] dark:hover:text-[#20BEFF]"
    >
      <FaBrandsKaggle class="-mt-px h-full w-full" fill="currentColor" />
    </SocialLink>
  );
};

export const LinkedinLink: Component = () => {
  return (
    <SocialLink
      href="https://www.linkedin.com/in/nizhibitsky/"
      brand="LinkedIn"
      class="hover:text-[#0077B5] dark:hover:text-[#0077B5]"
    >
      <FaBrandsLinkedin class="h-full w-full" fill="currentColor" />
    </SocialLink>
  );
};

export const TelegramLink: Component = () => {
  return (
    <SocialLink
      href="https://t.me/nizhib"
      brand="Telegram"
      class="hover:text-[#0088CC] dark:hover:text-[#0088CC]"
    >
      <FaBrandsTelegram class="h-full w-full" fill="currentColor" />
    </SocialLink>
  );
};

export const TwitterLink: Component = () => {
  return (
    <SocialLink
      href="https://twitter.com/nizhib"
      brand="Twitter"
      class="hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]"
    >
      <FaBrandsTwitter class="h-full w-full" fill="currentColor" />
    </SocialLink>
  );
};
