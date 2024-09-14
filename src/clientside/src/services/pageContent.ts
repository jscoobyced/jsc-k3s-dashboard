import {
  CommonPageData,
  defaultCommonPageData,
  defaultHomePageData,
  HomePageData,
} from '../models/pages/home';
import { commonRoute, homeRoute, pageRoutes } from './routing/apiRoutes';

export const getCommonPageData = async (): Promise<CommonPageData> => {
  const data = await getPageContent<CommonPageData>(commonRoute);
  return data ?? defaultCommonPageData;
};

export const getHomePageData = async (): Promise<HomePageData> => {
  const data = await getPageContent<HomePageData>(homeRoute);
  return data ?? defaultHomePageData;
};

const getPageContent = async <T>(page: string): Promise<T | undefined> => {
  const response = await fetch(`${pageRoutes}/${page}`);
  if (!response.ok) return undefined;
  const data: T = (await response.json()) as T;
  return data;
};