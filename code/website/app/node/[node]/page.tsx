'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNodes } from '../../../services/nodes/NodeService';
import { getPods } from '../../../services/pods/PodService';
import '../../../styles/dashboard.css';
import Article from '../../components/Article';
import NodeConditions from '../../components/kube/NodeConditions';
import PodList from '../../components/kube/PodList';
import { K3sNode } from '../../models/nodes/k3snode';
import { K3sPod } from '../../models/pods/k3spod';

const Page = ({ params }: { params: { node: string } }) => {
  const [node, setNode] = useState({} as K3sNode);
  const [pods, setPods] = useState([] as K3sPod[]);

  const nodeName = params.node;

  const content = (
    <>
      <NodeConditions node={node} />
      <PodList pods={pods} />
      <div className="mx-auto text-right">
        <Link className="text-primary-link" href={'/dashboard'}>
          Back
        </Link>
      </div>
    </>
  );

  useEffect(() => {
    const getCurrentNodes = async () => {
      const nodes = await getNodes();
      const node =
        nodes.find((node) => node.nodeName === nodeName) || ({} as K3sNode);
      setNode(node);
    };
    const getCurrentPods = async () => {
      const pods = await getPods(nodeName);
      setPods(pods);
    };
    getCurrentNodes().catch((error) => {
      console.error(error);
    });
    getCurrentPods().catch((error) => {
      console.error(error);
    });
  }, [nodeName]);

  return (
    <Article content={content} alt={`Information about your node.`}></Article>
  );
};

export default Page;
