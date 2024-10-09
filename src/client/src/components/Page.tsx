import React from 'react';
import Article from './Article';

const Page = (props: {
  title: string;
  articleContentElement: React.JSX.Element;
  bgColor?: string;
  wide?: boolean;
}) => {
  const { title, articleContentElement, bgColor, wide } = props;
  const backgroundColor = bgColor ? ` ${bgColor}` : '';
  const width = wide ? 'w-9/10' : 'md:w-3/5 w-4/5';
  return (
    <>
      <h1 className="w-1/2 mx-auto text-center text-2xl sm:text-5xl font-bold">
        {title}
      </h1>
      <div className={`flex flex-col mx-auto text-xl pt-2${width}`}>
        <Article
          content={articleContentElement}
          className={`block p-5 mt-10${backgroundColor}`}
        ></Article>
      </div>
    </>
  );
};

export default Page;
