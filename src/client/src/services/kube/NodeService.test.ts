import { defaultK3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/defaults';
import { K3sNode } from 'jsc-k3s-dashboard-common/src/models/kube/k3snode';
import { getNodesData } from './NodeService';

describe('NodeService', () => {
  describe('getNodesData', () => {
    it('should return the nodes data', async () => {
      // Arrange
      const expectedNodes: K3sNode[] = [defaultK3sNode];
      // Act
      const nodes = await getNodesData();
      // Assert
      expect(nodes).toEqual(expectedNodes);
    });
  });
});
