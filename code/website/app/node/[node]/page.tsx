'use client'

import { useEffect, useState } from 'react'
import Article from '../../components/Article'
import { K3sNode } from '../../models/nodes/k3snode'
import { getNodes } from '../../services/nodes/NodeService'
import NodeConditions from '../../components/kube/NodeConditions'
import '../../../styles/dashboard.css'
import Link from 'next/link'
import PodList from '../../components/kube/PodList'
import { getPods } from '../../services/pods/PodService'
import { K3sPod } from '../../models/pods/k3spod'

const Page = ({ params }: { params: { node: string } }) => {
  const emptyNode: K3sNode = {
    allocatable: { cpu: 0, memory: 0, pods: 0, storage: 0 },
    capacity: { cpu: 0, memory: 0, pods: 0, storage: 0 },
    conditions: [],
    ipAddress: '',
    nodeName: '',
    metrics: { metadata: { name: '' }, usage: { cpu: '', memory: '' } },
  }
  const [node, setNode] = useState(emptyNode)
  const [pods, setPods] = useState([] as K3sPod[])

  const nodeName = params.node

  const content = (
    <>
      <NodeConditions node={node} />
      <PodList pods={pods} />
      <div className="mx-auto text-right">
        <Link href={'/dashboard'}>Back</Link>
      </div>
    </>
  )

  useEffect(() => {
    const getCurrentNodes = async () => {
      const nodes = await getNodes()
      const node = nodes.find((node) => node.nodeName === nodeName) || emptyNode
      setNode(node)
    }
    const getCurrentPods = async () => {
      const pods = await getPods(nodeName)
      setPods(pods)
    }
    getCurrentNodes().catch((error) => {
      console.error(error)
    })
    getCurrentPods().catch((error) => {
      console.error(error)
    })
  }, [])

  return (
    <Article
      content={content}
      alt={`Information about your cluster.`}
    ></Article>
  )
}

export default Page
