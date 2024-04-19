import { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/montserrat.css'
import '../styles/menu.css'
import RootLayout from './base_layout'
import meta from './meta.json'

const title = `Home - ${meta.siteName} - Nerd stuff...`
const description =
  'This website is a poor\'s man kubernetes dashboard. It allows to monitor essential info about the cluster and the deployed services and nodes.'

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title,
  description,
  authors: [{ url: 'https://narok.io' }],
  keywords: [
    'kubernetes',
    'k8s',
    'dashboard',
  ],
  publisher: 'Cédric Rochefolle',
  openGraph: {
    type: 'website',
    url: meta.siteUrl,
    description,
    siteName: meta.siteName,
    title,
    images: [meta.logo],
  },
}

export default RootLayout
