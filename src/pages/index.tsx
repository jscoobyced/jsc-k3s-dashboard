import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { K3sNode } from '../models/k3snode'
import { readablizeBytes } from '../services/format'
import styles from '../styles/Home.module.css'

const Home: NextPage<{ data: K3sNode[] }> = (data: { data: K3sNode[] }) => {

  const nodes = (): JSX.Element[] => {
    const nodeRows: JSX.Element[] = [];
    if (data === null) return [];
    const allNodes = data.data.sort((a, b) => (a.nodeName > b.nodeName ? 1 : -1));
    for (const item of allNodes) {
      const row = (<tr key={'node-' + item.nodeName}>
        <td><Link href={'/node/' + item.nodeName}>{item.nodeName}</Link></td>
        <td>{item.ipAddress}</td>
        <td>{item.capacity.cpu}</td>
        <td>{readablizeBytes(item.capacity.memory)}</td>
        <td>{readablizeBytes(item.capacity.storage)}</td>
        <td>{item.capacity.pods}</td>
        <td>{item.allocatable.cpu}</td>
        <td>{readablizeBytes(item.allocatable.memory)}</td>
        <td>{readablizeBytes(item.allocatable.storage)}</td>
        <td>{item.allocatable.pods}</td>
      </tr>);
      nodeRows.push(row);
    }
    return nodeRows;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>JSC k3s Dashboard</title>
        <meta name='viewport' content='' />
        <meta name="description" content="This is a simple k3s dashboard to monitor nodes, pods and resources." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to JSC Poor&apos;s man k3s Dashboard
        </h1>
        <table className='nodes-list'>
          <caption>Nodes list</caption>
          <thead>
            <tr>
              <th rowSpan={2}>Node Name</th>
              <th rowSpan={2}>IP Address</th>
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
          <tbody>
            {nodes()}
          </tbody>
        </table>
      </main>

      <footer className={styles.footer}>
        &copy; Cédric ROCHEFOLLE - 2022
      </footer>
    </div>
  )
}

export const getServerSideProps = async (req: any, resp: any) => {
  const server = req.req.headers['host'];
  if (!server) return { props: { data: [] } };

  const res = await fetch(`http://${server}/api/nodes`)
  const data = await res.json()
  return { props: { data: data.data } }
}

export default Home
