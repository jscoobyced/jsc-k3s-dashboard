export interface Capacity {
  cpu: number;
  storage: number;
  memory: number;
  pods: number;
}

export interface NodeCondition {
  type: string;
  status: string;
  message: string;
}

export interface K3sNode {
  nodeName: string;
  ipAddress: string;
  capacity: Capacity;
  allocatable: Capacity;
  metrics: K3sNodeMetric;
  conditions: NodeCondition[];
}

export interface K3sNodeMetric {
  metadata: {
    name: string;
  };
  usage: {
    cpu: string;
    memory: string;
  };
}
