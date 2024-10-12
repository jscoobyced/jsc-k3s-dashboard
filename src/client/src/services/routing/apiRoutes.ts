import {
  commonUrlPath,
  homeUrlPath,
  nodesUrlPath,
  podsUrlPath,
} from 'jsc-k3s-dashboard-common/src/models/routes';

export const apiDomain = () =>
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/'
    : `https://api.${window.location.hostname}/`;

const baseUrlPath = apiDomain();

export const commonRoute = `${baseUrlPath}${commonUrlPath}`;
export const homeRoute = `${baseUrlPath}${homeUrlPath}`;
export const nodesRoute = `${baseUrlPath}${nodesUrlPath}`;
export const podsRoute = `${baseUrlPath}${podsUrlPath}`;
