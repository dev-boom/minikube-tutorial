# Tutorial

## Objectives
We are trying to deploy an applications on Kubernetes. This example we will first deploy on minikube. Minikube provides local Kubernetes environment. Your next question is what is Kubernetes and why we need it? Can't we just Docker-compose? The answer is in production environment we use Kubernetes. There are a number of benefits of Kubernetes such as you can auto scale your application in the config, You can add secrets into your application where nobody can look at the secrets only can remove and recreate. You can also setup load balancer within Kubernetes. This makes you learn once and port your applications to any server that support Kubernetes which is all major cloud providers.

We will learn concept of containers and pods

## Prerequisite

### Docker
You can download and install Docker from their official website.
[https://docs.docker.com/install/](https://docs.docker.com/install/)

### Kubectl
Kubectl is an command line interface for kubernetes.
[https://kubernetes.io/docs/tasks/tools/install-kubectl/](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Minikube
Minikube let you run kubernetes locally
[https://kubernetes.io/docs/tasks/tools/install-minikube/](https://kubernetes.io/docs/tasks/tools/install-minikube/)


## Instruction
1 This folder contains simple Node JS API that prints "Hello Kubernetes"
2 Please make sure `kubectl` and `minikube` works
3 Please make sure current Kubernetes environment is using minikube environment by
``` sh
$ kubectl config use-context minikube
```
Output
``` sh
Switched to context "minikube".
```
4 Start Minikube
``` sh
$ minikube start
```
Output
``` sh
There is a newer version of minikube available (v1.2.0).  Download it here:
https://github.com/kubernetes/minikube/releases/tag/v1.2.0

To disable this notification, run the following:
minikube config set WantUpdateNotification false
😄  minikube v1.0.0 on darwin (amd64)
🤹  Downloading Kubernetes v1.14.0 images in the background ...
💡  Tip: Use 'minikube start -p <name>' to create a new cluster, or 'minikube delete' to delete this one.
🔄  Restarting existing virtualbox VM for "minikube" ...
⌛  Waiting for SSH access ...
📶  "minikube" IP address is 192.168.99.100
🐳  Configuring Docker as the container runtime ...
🐳  Version of container runtime is 18.06.2-ce
⌛  Waiting for image downloads to complete ...
✨  Preparing Kubernetes environment ...
🚜  Pulling images required by Kubernetes v1.14.0 ...
🔄  Relaunching Kubernetes v1.14.0 using kubeadm ...
⌛  Waiting for pods: apiserver proxy etcd scheduler controller dns
📯  Updating kube-proxy configuration ...
🤔  Verifying component health ......
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!
```

5 Set docker environment to use minikube

Please note that when you type
``` sh
$ docker images
```
you will see a number of your docker images from your machine

Then we will change to use minikube
``` sh
$ eval $(minikube docker-env)
```
 then type
 ``` sh
 $ docker images
 ```
 again and see the list changes

 Please note that if you close and open terminal again or go to new tab this will revert back. and you need to eval again

6 Create Dockerfile
``` Dockerfile
FROM node:11.6.0

RUN apt-get -y update
RUN apt-get -y install git wget sudo
RUN npm -g config set user root

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
```

7 Build Docker Images
-t is tagging docker container with name
```sh
$ docker build -t my-node-app:v0.1 .
```
Please note that . corresponds to Dockerfile
you can check that new container is build from

``` sh
$ docker images
```

8 Create yaml file with any name. In my case I will name it `deployment.yaml`
``` yaml
apiVersion: "extensions/v1beta1"
kind: "Deployment"
metadata:
  name: "my-app"
  namespace: "default"
  labels:
    app: "my-app"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: "my-app"
  template:
    metadata:
      labels:
        app: "my-app"
    spec:
      containers:
      - name: "my-node-app"
        image: "my-node-app:v0.1"
        imagePullPolicy: Never
        command:
        - npm
        - start    
```

9 Apply deployment yaml
Note -f for FILENAME or you can do -k for DIRECTORY
``` sh
$ kubectl apply -f deployment.yaml
```

10 Go to dashboard
``` sh
$ minikube dashboard
```
Please note that this terminal will kept running if you switch to new tabs and you want to build images, you need to eval again.

Website will open
Go to `Workloads > Pods` to see your deployment status.

You can also see by pods by type following commands
```sh
$ kubectl get pods
```
11 SSH inside
``` sh
$ kubectl exec -it <your-pods-name> -c <your-container-name> bash
```
your-pods-name you get via `kubectl get pods`
-c is container in this case we only have one container which is `my-node-app` which can be seen in deployment.yaml

test your website is working
```sh
$ curl 0.0.0.0:3000
```

Extra
If you want to stop minikube
``` sh
$ minikube stop
```

If you want to delete all containers and vm
``` sh
$ minikube delete
```
