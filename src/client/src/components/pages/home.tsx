import { defaultHomePageData } from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import { HomePageData } from 'jsc-k3s-dashboard-common/src/models/home/home';
import { useEffect, useState } from 'react';
import { getHomePageData } from '../../services/pageContent';
import Page from '../Page';

const Home = () => {
  const [title, setTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  useEffect(() => {
    const getPageData = async () => {
      const homePageData = await getHomePageData();
      setHomePageData(homePageData);
    };

    const setHomePageData = (homePageData: HomePageData) => {
      setTitle(homePageData.title);
      setArticleContent(homePageData.articleContent);
    };

    getPageData().catch((e: unknown) => {
      setHomePageData(defaultHomePageData);
      void e;
    });
  }, []);

  const articleContentElement = <>{articleContent}</>;

  return (
    <Page title={title} articleContentElement={articleContentElement}></Page>
  );
};

export default Home;
