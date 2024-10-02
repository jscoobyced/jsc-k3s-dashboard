import { createBrowserRouter, Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import Home from '../../components/pages/home';
import Information from '../../components/pages/info';
import Dashboard from '../../components/pages/kube/dashboard';
import PrivacyPolicy from '../../components/pages/privacy';
import TermOfUse from '../../components/pages/tos';

const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
};

export const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/info',
        element: <Information />,
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/tos',
        element: <TermOfUse />,
      },
    ],
  },
]);
