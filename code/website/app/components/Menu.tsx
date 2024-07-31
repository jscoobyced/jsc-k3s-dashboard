import Link from 'next/link';

const Menu = () => {
  return (
    <nav className="flex justify-center">
      <ul data-id="menu-top" className="p-0 m-0 list-none relative">
        <li>
          <Link className="text-primary-link" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-primary-link" href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="text-primary-link" href="/info">
            Info
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
