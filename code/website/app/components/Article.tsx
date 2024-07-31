import Image from 'next/image';

const Article = (props: {
  content: JSX.Element;
  image?: string;
  title?: string;
  alt?: string;
  right?: boolean;
}) => {
  const { content, image, title, right, alt } = props;
  const float = !!right ? 'float-right' : 'float-left';
  const titleContent = !!title ? (
    <h2 className="py-5 text-2xl">{title}</h2>
  ) : (
    <></>
  );
  const imageElement = image && (
    <Image
      alt={`${alt}`}
      className={`${float} rounded-full circle-shape`}
      src={image}
      width={150}
      height={150}
    />
  );
  return (
    <>
      {titleContent}
      {alt}
      <div>
        {imageElement}
        {content}
      </div>
    </>
  );
};

export default Article;
