export interface CommonPageData {
  siteName: string;
  year: number;
  version: string;
}

export interface HomePageData {
  title: string;
  titleContent: string;
  articleContent: string;
  articleAltContent: string;
}

export const defaultCommonPageData: CommonPageData = {
  siteName: 'localhost',
  year: 2024,
  version: '0.0.0',
};

export const defaultHomePageData: HomePageData = {
  title: 'Welcome to localhost',
  titleContent: ``,
  articleContent: `This website is a poor's man kubernetes dashboard. It allows to
    monitor essential info about the cluster and the deployed services and
    nodes.`,
  articleAltContent: `A k8s simple dashboard.`,
};
