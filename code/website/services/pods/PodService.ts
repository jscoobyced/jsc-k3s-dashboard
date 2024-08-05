'use server';

import { K3sPod } from '../../app/models/pods/k3spod';
import { getPodsData } from './PodDataService';

export const getPods = async (nodeName: string): Promise<K3sPod[]> => {
  const podData = await getPodsData().then((data) => {
    const pods = data.filter((pod) => pod.spec.nodeName === nodeName);
    return pods;
  });
  return podData;
};
