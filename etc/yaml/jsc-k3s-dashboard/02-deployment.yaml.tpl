apiVersion: apps/v1
kind: Deployment
metadata:
  name: k3s-dashboard
  namespace: jsc-k3s-dashboard
  labels:
    app: k3s-dashboard
    component: k3s-dashboard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: k3s-dashboard
      component: k3s-dashboard
  template:
    metadata:
      labels:
        app: k3s-dashboard
        component: k3s-dashboard
    spec:
      containers:
      - name: k3s-dashboard
        image: jscdroiddev/jsc-k3s-dashboard:arm64-latest
        imagePullPolicy: Always
        securityContext:
          runAsUser: 1001
          runAsGroup: 1001
          privileged: false
        env:
        - name: TZ
          value: "Asia/Bangkok"
        - name: MAIN_NODE_IP
          value: "IPADDRESS"
        - name: API_TOKEN
          valueFrom:
            secretKeyRef:
              name: jsc-api-token
              key: token
        ports:
          - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "1024Mi"
          requests:
            cpu: "500m"
            memory: "512Mi"
      terminationGracePeriodSeconds: 30
