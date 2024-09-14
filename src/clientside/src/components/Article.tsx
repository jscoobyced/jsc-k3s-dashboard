import React from 'react';

const Article = (props: {
  content: React.JSX.Element;
  image?: string;
  title?: string;
  alt?: string;
  right?: boolean;
  className?: string;
}) => {
  const { content, image, title, right, alt, className } = props;
  const float = right ? 'float-right' : 'float-left';
  const titleContent = title ? (
    <h2 className="py-5 text-2xl">{title}</h2>
  ) : (
    <></>
  );
  const imageElement = image && (
    <img
      alt={alt ?? title ?? 'image'}
      className={`${float} rounded-full circle-shape`}
      src={image}
      width={150}
      height={150}
    />
  );
  return (
    <article>
      {titleContent}
      {alt}
      <div className={className}>
        {imageElement}
        {content}
      </div>
    </article>
  );
};

export default Article;
