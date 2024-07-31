import { NextPage } from 'next';
import Link from 'next/link';
import { siteName } from '../../repositories/site';

const Footer: NextPage = () => {
  const version = process.env.GIT_TAG || 'unknown';
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center py-2 text-sm sm:text-base ">
      {siteName} &copy; 2023-{year} IndyTheDog - {version} -
      <Link className="px-1 inline text-primary-link" href="/privacy">
        Privacy Policy
      </Link>{' '}
      -
      <Link className="px-1 inline text-primary-link" href="/tos">
        TOS
      </Link>
    </footer>
  );
};

export default Footer;
