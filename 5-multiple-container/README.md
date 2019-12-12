# Tutorial

## Objectives
Kubernetes has special way of handling environment file. We have 2 types of environment file. `Config` and `Secrets`. The difference between the 2 is secret you cannot update it, you can only delete and re upload. while config should be quite easy to update

## Instruction
1 Add Node env to your index.js

``` js
const myConfigText = process.env.MY_CONFIG_TEXT
const mySecretText = process.env.MY_SECRET_TEXT
```
