'use client'

import Article from '../components/Article'
import { Formatter } from '../services/format'
import { K3sNode } from '../models/nodes/k3snode'
import Link from 'next/link'
import { getNodes } from '../services/nodes/NodeService'
import { useEffect, useState } from 'react'
import '../../styles/dashboard.css'

const getNodesTable = (nodes: K3sNode[]): JSX.Element[] => {
  const formatter = Formatter()
  const nodeRows: JSX.Element[] = []
  if (nodes === null) return []
  const allNodes = nodes.sort((a, b) => (a.nodeName > b.nodeName ? 1 : -1))
  for (const item of allNodes) {
    const row = (
      <tr key={'node-' + item.nodeName}>
        <td>
          <Link href={'/node/' + item.nodeName}>{item.nodeName}</Link>
        </td>
        <td>{item.capacity.cpu}</td>
        <td>{formatter.readablizeBytes(item.capacity.memory)}</td>
        <td>{formatter.readablizeBytes(item.capacity.storage)}</td>
        <td>{item.capacity.pods}</td>
        <td>{item.allocatable.cpu}</td>
        <td>{formatter.readablizeBytes(item.allocatable.memory)}</td>
        <td>{formatter.readablizeBytes(item.allocatable.storage)}</td>
        <td>{item.allocatable.pods}</td>
      </tr>
    )
    nodeRows.push(row)
  }
  return nodeRows
}

const Page = () => {
  const [nodes, setNodes] = useState([] as K3sNode[])
  const content = (
    <table className="dashboard mx-auto">
      <caption>Nodes list</caption>
      <thead>
        <tr>
          <th rowSpan={2}>Node Name</th>
          <th colSpan={4}>Capacity</th>
          <th colSpan={4}>Allocatable</th>
        </tr>
        <tr>
          <th>CPU</th>
          <th>Memory</th>
          <th>Storage</th>
          <th>Pods</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Storage</th>
          <th>Pods</th>
        </tr>
      </thead>
      <tbody>{getNodesTable(nodes)}</tbody>
    </table>
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
