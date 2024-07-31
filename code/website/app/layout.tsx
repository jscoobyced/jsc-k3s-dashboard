import { Metadata } from 'next';
import { siteName, siteUrl } from '../repositories/site';
import '../styles/globals.css';
import '../styles/menu.css';
import '../styles/montserrat.css';
import RootLayout from './base_layout';
import meta from './meta.json';

const title = `Home - ${siteName} - Nerd stuff...`;
const description =
  "This website is a poor's man kubernetes dashboard. It allows to monitor essential info about the cluster and the deployed services and nodes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ url: 'https://narok.io' }],
  keywords: ['kubernetes', 'k8s', 'dashboard'],
  publisher: 'Cédric Rochefolle',
  openGraph: {
    type: 'website',
    url: siteUrl,
    description,
    siteName: siteName,
    title,
    images: [meta.logo],
  },
};

export default RootLayout;
