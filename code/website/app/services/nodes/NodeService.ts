'use server'

import { K3sNode } from '../../models/nodes/k3snode'
import { getNodesData } from './NodeDataService'

export const getNodes = async (): Promise<K3sNode[]> => {
  const nodeData = await getNodesData()
  return nodeData
}
