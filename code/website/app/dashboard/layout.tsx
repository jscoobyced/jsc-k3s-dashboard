import { Metadata } from 'next'
import meta from '../meta.json'

const title = `K3s Dashboard - ${meta.siteName} - Your cluster dashboard`
const description = `This is the configuration and resources of your kubernetes clusters and their nodes.`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${meta.siteUrl}/dashboard`,
    description,
    siteName: meta.siteName,
    title,
    images: [meta.logo],
  },
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto text-xl pt-10 md:w-3/5 w-4/5">
      {children}
    </div>
  )
}

export default Layout
