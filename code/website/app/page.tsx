import Article from './components/Article'
import meta from './meta.json'

const Home = () => {
  const titleContent = (
    <>
      This website is a poor&apos;s man kubernetes dashboard. It allows to monitor
      essential info about the cluster and the deployed services and nodes.
    </>
  )
  const articleContent = <>You will find here different info.</>

  return (
    <>
      <h1 className="w-1/2 mx-auto text-center text-2xl sm:text-5xl font-bold">
        Welcome to {meta.siteName}
      </h1>
      <div className="flex flex-col mx-auto text-xl pt-10 md:w-3/5 w-4/5">
        <Article content={titleContent}></Article>
        <Article
          content={articleContent}
          alt="A k8s simple dashboard."
        ></Article>
      </div>
    </>
  )
}

export default Home
