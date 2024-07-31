import { Metadata } from 'next';
import { siteName, siteUrl } from '../../repositories/site';
import meta from '../meta.json';

const title = `K3s Dashboard - ${siteName} - Your cluster dashboard`;
const description = `This is the configuration and resources of your kubernetes clusters and their nodes.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/dashboard`,
    description,
    siteName: siteName,
    title,
    images: [meta.logo],
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto text-xl pt-10 md:w-4/6 w-5/6">
      {children}
    </div>
  );
};

export default Layout;
