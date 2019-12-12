# Tutorial

## Objectives
Kubernetes has special way of handling environment file. We have 2 types of environment file. `Config` and `Secrets`. The difference between the 2 is secret you cannot update it, you can only delete and re upload. while config should be quite easy to update

## Instruction
1 Add Node env to your index.js

``` js
const myConfigText = process.env.MY_CONFIG_TEXT;
const mySecretText = process.env.MY_SECRET_TEXT;
```

``` js
app.get('/', function (req, res) {
  res.send(`Hello Kubenetes. config: ${myConfigText} secret: ${mySecretText}`)
})
```

2 Create an env file for config and secret with any name

config.env
``` .env
MY_CONFIG_TEXT=config
```

secret.env
``` .env
MY_SECRET_TEXT=secret
```

Please don't forget to gitignore secret.env

3 Create config
``` sh
$ kubectl create configmap my-app-config --from-env-file=config.env
```

4 Create Secret
``` sh
$ kubectl create secret generic my-app-secret --from-env-file=secret.env
```

5 update deployment.yaml file
``` yaml
containers
...
  env:
  - name: MY_CONFIG_TEXT
    valueFrom:
      configMapKeyRef:
        key: MY_CONFIG_TEXT
        name: my-app-config
  - name: MY_SECRET_TEXT
    valueFrom:
      secretKeyRef:
        key: MY_SECRET_TEXT
        name: my-app-secret
```

Please make sure `my-app-config` and `my-app-secret` name matches step 3 and 4

6 apply changes
``` sh
$ kubectl apply -f deployment.yaml
```

Please note that you can see config and secrets on minikube dashboard menu on the left
