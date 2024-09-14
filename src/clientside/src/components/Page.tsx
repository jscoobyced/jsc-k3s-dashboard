import Article from './Article';

const Page = (props: {
  title: string;
  articleContentElement: JSX.Element;
  bgColor?: string;
}) => {
  const { title, articleContentElement, bgColor } = props;
  return (
    <>
      <h1 className="w-1/2 mx-auto text-center text-2xl sm:text-5xl font-bold">
        {title}
      </h1>
      <div className="flex flex-col mx-auto text-xl pt-10 md:w-3/5 w-4/5">
        <Article
          content={articleContentElement}
          className={`block p-5 ${bgColor} mt-10`}
        ></Article>
      </div>
    </>
  );
};

export default Page;
