import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="flex justify-center">
      <ul className="p-0 m-0 list-none relative">
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="info">Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
