import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { useEffect, useState } from 'react';
import { getNodesData } from '../../../services/kube/NodeService';
import '../../../styles/dashboard.css';
import NodeList from '../../kube/NodeList';
import Page from '../../Page';

const Dashboard = () => {
  const [nodes, setNodes] = useState([] as K3sNode[]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setNodes([]);
    const fetchNodeData = async () => {
      const nodes = await getNodesData();
      setNodes(nodes);
    };
    fetchNodeData().catch((error: unknown) => {
      const errorObject = error as Error;
      setErrorMessage(errorObject.message);
    });
  }, []);

  const content = (
    <>
      {errorMessage && (
        <div className="text-primary-error text-sm pb-2">{errorMessage}</div>
      )}
      <NodeList nodes={nodes} />
    </>
  );

  return (
    <Page
      articleContentElement={content}
      title={`Information about your cluster`}
    ></Page>
  );
};

export default Dashboard;
