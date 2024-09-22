import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../context';
import Page from '../Page';

const Information = () => {
  const { siteName } = useContext(ApplicationContext);
  const title = 'Information';
  const articleContentElement = (
    <>
      <Link to="/">{siteName}</Link> is a website that provides free information
      for the users, on a few topics:
      <p>
        Please don&apos;t hesitate to suggest more topics you would like to see.
      </p>
    </>
  );

  return (
    <Page title={title} articleContentElement={articleContentElement}></Page>
  );
};

export default Information;
