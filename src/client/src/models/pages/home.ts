import { getFromProcess } from '../../services/process';

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

const domain = getFromProcess('DOMAIN', 'localhost');
const version = getFromProcess('GIT_TAG', '0.0.0');

export const defaultCommonPageData: CommonPageData = {
  siteName: domain,
  year: 2024,
  version,
};

export const defaultHomePageData: HomePageData = {
  title: `Welcome to ${domain}`,
  titleContent: ``,
  articleContent: `This website is a poor's man kubernetes dashboard. It allows to
    monitor essential info about the cluster and the deployed services and
    nodes.`,
  articleAltContent: `A k8s simple dashboard.`,
};
