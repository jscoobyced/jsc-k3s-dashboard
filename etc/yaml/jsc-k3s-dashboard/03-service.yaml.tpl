---
apiVersion: v1
kind: Service
metadata:
  name: k3s-dashboard
  namespace: jsc-k3s-dashboard
spec:
  selector:
    app: k3s-dashboard
  ports:
  - port: 8080
    targetPort: 3000
    name: k3s-dashboard-web
  externalIPs:
  - IPADDRESS