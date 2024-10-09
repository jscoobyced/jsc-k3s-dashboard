export const apiDomain = () =>
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/'
    : `https://api.${window.location.hostname}/`;
export const pageRoutes = `${apiDomain()}api/pages`;

export const commonRoute = 'common';
export const homeRoute = 'home';
export const dashboardRoute = 'dashboard';
export const nodesRoute = 'nodes';
export const podsRoute = 'pods';
