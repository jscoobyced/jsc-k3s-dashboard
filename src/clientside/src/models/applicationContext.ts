import { defaultCommonPageData } from './pages/home';

export type ApplicationContextData = {
  version: string;
  year: number;
  siteName: string;
};

export const defaultApplicationContext: ApplicationContextData = {
  version: defaultCommonPageData.version,
  year: defaultCommonPageData.year,
  siteName: defaultCommonPageData.siteName,
};
