'use client'

import { useEffect, useState } from 'react'
import Article from '../components/Article'
import { K3sNode } from '../models/nodes/k3snode'
import { getNodes } from '../services/nodes/NodeService'
import NodeList from '../components/kube/NodeList'
import '../../styles/dashboard.css'

const Page = () => {
  const [nodes, setNodes] = useState([] as K3sNode[])
  const content = (
    <>
      <NodeList nodes={nodes} />
    </>
  )

  useEffect(() => {
    const getCurrentNodes = async () => {
      const nodes = await getNodes()
      setNodes(nodes)
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
