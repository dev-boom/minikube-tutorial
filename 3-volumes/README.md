# Tutorial

## Objectives
As we develop it is obvious that we would not build container every time we deploy so we should mount the volumes so that as files changes, our website updates.

## Instruction

1 Mount folder
Open a separate terminal mount folder using following commands.
```sh
$ minikube mount $(PWD)/:/mnt1/out/
```
Not you must cd into current directory please note `$(PWD)` is your current directory and `/mnt1/out` we will use it in kubernetes

2 update yaml deployment file to following. Please be careful of hierarchy
``` yaml
containers:
      - name: my-node-app
        ...
        volumeMounts:
        - mountPath: /usr/src/app/index.js
            name: my-node-app-volume
            subPath: index.js
volumes:
        - hostPath:
            path: /mnt1/out
          name: my-node-app-code
```

3 apply yaml file changes
``` sh
$ kubectl apply -f deployment.yaml
```

Please note `mountPath` and `subPath`. If subPath is not specified all folder will be replaced.

If you SSH inside container and edit files on your editor you can see files inside container will changes.

Now if you refresh your website you would not see it changes in real time since we need to kill pods and new one will be created
``` sh
$ kubectl delete <pod-where-your-app-is-running>
```
or we could update any files in deployment.yaml. For this example we update annotations with current date.
``` sh
export PATCH='{"spec":{"template":{"metadata":{"annotations":{"timestamp":"'$(date)'"}}}}}'
kubectl patch deployment my-app -p "$PATCH"
```

We could create watcher and call those functions.

There's other libraries to help with faster local development like https://www.telepresence.io/
