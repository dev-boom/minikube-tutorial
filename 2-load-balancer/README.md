# Tutorial

## Objectives
From previous tutorial we can SSH inside container but we cannot access via url yet. We will create load balancer to handle this.

## Instruction
1 Create loadbalancer yaml file

Create yaml file with any name. In my case I will name it `loadbalancer.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: "my-app-loadbalancer"
  namespace: "default"
  labels:
    app: "my-app-loadbalancer"
spec:
  externalTrafficPolicy: Cluster
  ports:
  - port: 80
    protocol: TCP
    targetPort: 3000
  selector:
    app: my-app
  sessionAffinity: None
  type: LoadBalancer
```

Please note port and targetPort. 3000 is port that NodeJS application is using. see `index.js` line 8 `app.listen(3000)`
port: 80 means it is http

Also please note that you can put everything in one yaml file or you can create multiple yaml files
If you would like to create single file you can use do like following.

```yaml
firstFile:
  ...
---
secondFile:
  ...
```

Please not `---` is used to saperate 2 files.

2 Apply yaml
Note -f for FILENAME or you can do -k for DIRECTORY
``` sh
$ kubectl apply -f loadbalancer.yaml
```

3 see URL
to see URL
``` sh
$ minikube service my-app-loadbalancer --url
```
Pleae note my-app-loadbalancer is the one from loadbalancer yaml file


Output example
``` sh
http://192.168.99.100:31794
```

you can go to that URL and see `Hello Kubenetes`
