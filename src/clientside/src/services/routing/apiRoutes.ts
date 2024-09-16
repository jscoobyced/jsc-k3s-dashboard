export const apiDomain =
  window.location.hostname === 'localhost'
    ? '/'
    : `//api.${window.location.hostname}/`;
export const pageRoutes = `${apiDomain}api/pages`;

export const commonRoute = 'common';
export const homeRoute = 'home';
