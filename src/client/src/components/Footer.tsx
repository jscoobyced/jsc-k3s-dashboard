import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context';

const Footer = (): React.JSX.Element => {
  const { siteName, year, version } = useContext(ApplicationContext);

  return (
    <footer className="flex justify-center py-2 text-sm sm:text-base ">
      {siteName} &copy; 2023-{year} IndyTheDog - {version} -
      <Link to="privacy">Privacy Policy</Link> -<Link to="tos">TOS</Link>
    </footer>
  );
};

export default Footer;
