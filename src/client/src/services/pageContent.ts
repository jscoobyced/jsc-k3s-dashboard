import {
  defaultCommonPageData,
  defaultHomePageData,
} from 'jsc-k3s-dashboard-common/src/models/home/defaults';
import {
  CommonPageData,
  HomePageData,
} from 'jsc-k3s-dashboard-common/src/models/home/home';
import {
  defaultK3sNode,
  defaultK3sPod,
} from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { K3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/k3spod';
import {
  commonRoute,
  homeRoute,
  nodesRoute,
  podsRoute,
} from './routing/apiRoutes';

export const getCommonPageData = async (): Promise<CommonPageData> => {
  const data = await getPageContent<CommonPageData>(commonRoute);
  return data ?? defaultCommonPageData;
};

export const getHomePageData = async (): Promise<HomePageData> => {
  const data = await getPageContent<HomePageData>(homeRoute);
  return data ?? defaultHomePageData;
};

export const getNodesData = async (): Promise<K3sNode[]> => {
  const data = await getPageContent<K3sNode[]>(nodesRoute);
  const defaultNode: K3sNode = { ...defaultK3sNode, nodeName: 'Default Node' };
  return data ?? [defaultNode];
};

export const getPodsByNodeName = async (
  nodeName: string,
): Promise<K3sPod[]> => {
  const data = await getPageContent<K3sPod[]>(`${podsRoute}/${nodeName}`);
  return data ?? [defaultK3sPod];
};

const getPageContent = async <T>(page: string): Promise<T | undefined> => {
  const response = await fetch(page);
  if (!response.ok) return undefined;
  const data: T = (await response.json()) as T;
  return data;
};
