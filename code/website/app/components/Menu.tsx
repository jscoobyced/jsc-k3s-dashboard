import Link from 'next/link'

const Menu = () => {
  return (
    <nav className="flex justify-center">
      <ul data-id="menu-top" className="p-0 m-0 list-none relative">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/info">Info</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
