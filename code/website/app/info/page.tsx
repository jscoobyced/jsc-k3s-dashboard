import { Metadata } from 'next';
import { siteName, siteUrl } from '../../repositories/site';
import Article from '../components/Article';
import meta from '../meta.json';

const title = `Info - ${siteName} - Information about this website`;
const description = `You can find here additional information that can help you navigate through ${siteName} website.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/info`,
    description,
    siteName: siteName,
    title,
    images: [meta.logo],
  },
};

const Page = () => {
  const title = 'Information';
  const description = `${siteName} is a website that provides free information for the users, on a few topics:`;
  const content = (
    <>
      <p>
        Please don&apos;t hesitate to suggest more topics you would like to see.
      </p>
    </>
  );

  return (
    <>
      <div className="flex flex-col mx-auto text-xl pt-10 md:w-3/5 w-4/5">
        <p>{description}</p>
        <Article
          content={content}
          title={title}
          alt={`A Information about ${siteName}.`}
        ></Article>
      </div>
    </>
  );
};

export default Page;
