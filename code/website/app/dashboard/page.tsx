'use client';

import { useEffect, useState } from 'react';
import { getNodes } from '../../services/nodes/NodeService';
import '../../styles/dashboard.css';
import Article from '../components/Article';
import NodeList from '../components/kube/NodeList';
import { K3sNode } from '../models/nodes/k3snode';

const Page = () => {
  const [nodes, setNodes] = useState([] as K3sNode[]);

  const content = (
    <>
      <NodeList nodes={nodes} />
    </>
  );

  useEffect(() => {
    (async () => {
      const nodes = await getNodes();
      setNodes(nodes);
    })();
  }, []);

  return (
    <Article content={content} alt={`Information about your cluster`}></Article>
  );
};

export default Page;
