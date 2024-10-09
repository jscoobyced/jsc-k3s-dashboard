import { K3sPod } from 'jsc-k3s-dashboard-common/src/models/kube/k3spod';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPodsByNodeName } from '../../../services/pageContent';
import '../../../styles/dashboard.css';
import PodList from '../../kube/PodList';
import Page from '../../Page';

const Nodes = () => {
  const [pods, setPods] = useState([] as K3sPod[]);
  const [errorMessage, setErrorMessage] = useState('');

  const { nodeName } = useParams();

  useEffect(() => {
    setErrorMessage('');
    setPods([]);
    const fetchPodsData = async () => {
      if (nodeName) {
        const pods = await getPodsByNodeName(nodeName);
        setPods(pods);
      }
    };
    fetchPodsData().catch((error: unknown) => {
      const errorObject = error as Error;
      setErrorMessage(errorObject.message);
    });
  }, [nodeName]);

  const content = (
    <>
      {errorMessage && (
        <div className="text-primary-error text-sm pb-2">{errorMessage}</div>
      )}
      <PodList pods={pods} />
    </>
  );

  return (
    <Page
      articleContentElement={content}
      title={`Information about ${nodeName ?? ''} node`}
      wide={true}
    ></Page>
  );
};

export default Nodes;
