import {
  defaultHomePageData,
  HomePageData,
} from 'jsc-k3s-dashboard-common/src/models/pages/home';
import { useEffect, useState } from 'react';
import { getHomePageData } from '../../services/pageContent';
import Article from '../Article';

const Home = () => {
  const [title, setTitle] = useState('');
  const [titleContent, setTitleContent] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleAltContent, setArticleAltContent] = useState('');

  useEffect(() => {
    const getPageData = async () => {
      const homePageData = await getHomePageData();
      setHomePageData(homePageData);
    };

    const setHomePageData = (homePageData: HomePageData) => {
      setTitle(homePageData.title);
      setTitleContent(homePageData.titleContent);
      setArticleContent(homePageData.articleContent);
      setArticleAltContent(homePageData.articleAltContent);
    };

    getPageData().catch((e: unknown) => {
      setHomePageData(defaultHomePageData);
      void e;
    });
  }, []);

  const titleContentElement = <>{titleContent}</>;
  const articleContentElement = <>{articleContent}</>;

  return (
    <>
      <h1 className="w-1/2 mx-auto text-center text-2xl sm:text-5xl font-bold">
        {title}
      </h1>
      <div className="flex flex-col mx-auto text-xl pt-10 md:w-3/5 w-4/5">
        <Article content={titleContentElement}></Article>
        <Article
          content={articleContentElement}
          alt={articleAltContent}
        ></Article>
      </div>
    </>
  );
};

export default Home;
