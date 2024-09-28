import { defaultCommonPageData } from 'jsc-k3s-dashboard-common/src/models/pages/home';

export interface ApplicationContextData {
  version: string;
  year: number;
  siteName: string;
}

export const defaultApplicationContext: ApplicationContextData = {
  version: defaultCommonPageData.version,
  year: defaultCommonPageData.year,
  siteName: defaultCommonPageData.siteName,
};
