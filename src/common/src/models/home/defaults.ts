import { getFromProcess } from '../../services/process';
import { CommonPageData, HomePageData } from './home';

const domain = getFromProcess('DOMAIN', 'localhost');
const version = getFromProcess('GIT_TAG', '0.0.0');

export const defaultCommonPageData: CommonPageData = {
  siteName: domain,
  year: 2024,
  version,
};

export const defaultHomePageData: HomePageData = {
  title: `Welcome to ${domain}`,
  articleContent: `This website is a poor's man kubernetes dashboard. It allows to
    monitor essential info about the cluster and the deployed services and
    nodes.`,
};
