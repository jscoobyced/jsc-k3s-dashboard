'use client'

import { useEffect, useState } from 'react'
import Article from '../../components/Article'
import { K3sNode } from '../../models/nodes/k3snode'
import { getNodes } from '../../services/nodes/NodeService'
import NodeConditions from '../../components/kube/NodeConditions'
import '../../../styles/dashboard.css'
import Link from 'next/link'

const Page = ({ params }: { params: { node: string } }) => {
  const emptyNode: K3sNode = {
    allocatable: { cpu: 0, memory: 0, pods: 0, storage: 0 },
    capacity: { cpu: 0, memory: 0, pods: 0, storage: 0 },
    conditions: [],
    ipAddress: '',
    nodeName: '',
  }
  const [node, setNode] = useState(emptyNode)

  const nodeName = params.node

  const content = (
    <>
      <NodeConditions node={node} />
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
    getCurrentNodes().catch((error) => {
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
