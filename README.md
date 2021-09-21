# NodeMongo
In this, we will create a NodeJS application, using Express,Mongoose and cors, that creates a MongoDB database and then you can retrieve data from the collection.
With MongoDB and Nodejs, we can develop many different types of database applications quickly. 

Here we will perform CRUD operations by inserting data what you want to insert.

# Helm installation

For Helm installation please refer https://github.com/redhat-developer/redhat-helm-charts/tree/master/stable/ibm-mongodb-enterprise-helm

After completion of helm installation, validate if chart got installed successfully:

```
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$ helm ls
WARNING: Kubernetes configuration file is group-readable. This is insecure. Location: /home/cecuser/.kube/config
WARNING: Kubernetes configuration file is world-readable. This is insecure. Location: /home/cecuser/.kube/config
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                                   APP VERSION
test    ibm             1               2021-09-20 23:35:33.159193616 -0400 EDT deployed        ibm-mongodb-enterprise-helm-0.2.0       4.4.0
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$ oc get po
NAME                                                           READY   STATUS    RESTARTS   AGE
test-ibm-mongodb-enterprise-helm-deployment-7c694b99f8-fcbms   1/1     Running   0          18m


```

Expose a node port for the application
```
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$ oc expose deployment test-ibm-mongodb-enterprise-helm-deployment --type=NodePort --name=test-ibm        service/test-ibm exposed
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$ oc get nodes
NAME                                STATUS   ROLES           AGE   VERSION
p1323-master.p1323.cecc.ihost.com   Ready    master,worker   9h    v1.21.1+9807387
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$ oc get svc
NAME                                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)           AGE
test-ibm                                   NodePort    172.30.4.90      <none>        27017:31060/TCP   27s
test-ibm-mongodb-enterprise-helm-service   ClusterIP   172.30.248.104   <none>        27017/TCP         22m
[cecuser@p1323-bastion ibm-mongodb-enterprise-helm]$


```


## Deploy your Application to RedHAt Openshift

To start using Nodejs, first we need to install Node in OCP.
Git clone this repository on your server 

```
cd $HOME/
git clone https://github.com/deepak07031999/NodeMongo
cd NodeMongo
```
After cloning the repository to your system, Update username, password, hostname and port number for index.js which is inside src folder

Install npm libraries

```
npm install
```

Then start the Application

```
npm run start
```

## Performing CRUD operations : Working With Databases, Collections, and Documents

Now let's perform CRUD operation by Inserting a sample data of.
```
[cecuser@p1323-bastion ~]$ curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"1\", \"quote\": \"value1\" }" http://localhost:3000/quote

```
output:
```
{"_id":"6144584d2919d822bff3c18d","id":"1","quote":"value1","__v":0}
```

To validate, login to the container
```
[cecuser@p1323-bastion ~]$ oc get po
NAME                                                           READY   STATUS    RESTARTS   AGE
test-ibm-mongodb-enterprise-helm-deployment-7c694b99f8-fcbms   1/1     Running   0          54m
[cecuser@p1323-bastion ~]$ oc rsh test-ibm-mongodb-enterprise-helm-deployment-7c694b99f8-fcbms
sh-4.4$ mongo -u myUserAdmin -p password
MongoDB shell version v4.4.4
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("954f099b-1217-4047-9ca3-20deb4b65986") }
MongoDB server version: 4.4.4
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
        https://community.mongodb.com
---
The server generated these startup warnings when booting:
        2021-09-21T03:36:14.918+00:00: You are running on a NUMA machine. We suggest launching mongod like this to avoid performance problems: numactl --interleave=all mongod [other options]
        2021-09-21T03:36:14.918+00:00: Soft rlimits too low
        2021-09-21T03:36:14.918+00:00:         lockedMemoryBytes: 65536
        2021-09-21T03:36:14.918+00:00:         minLockedMemoryBytes: 1048576
---
MongoDB Enterprise > show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
MongoDB Enterprise > use test
switched to db test
MongoDB Enterprise > show collections
quotes
MongoDB Enterprise > db.quotes.find().count()
1
MongoDB Enterprise >

```

To Insert the data to collection 

```
[cecuser@p1323-bastion ~]$ curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"2\", \"quote\": \"Here we go\" }" http://localhost:3000/quote
```
output :
```
{"_id":"61496163a548df1ceb253365","id":"2","quote":"Here we go","__v":0}

```

To read the data from collection

```
[cecuser@p1323-bastion ~]$ curl -X GET http://localhost:3000/quote

```
output:
```
[{"_id":"61495f05a548df1ceb253363","id":"1","quote":"value1","__v":0},{"_id":"61496163a548df1ceb253365","id":"2","quote":"Here we go","__v":0}][cecuser@p1323-bastion ~]

```
To Update the data from collection using id
```
[cecuser@p1323-bastion ~]$ curl -X PUT -H "Content-Type: application/json" -d "{\"id\":\"1\", \"quote\": \"changed the quote\" }" http://localhost:3000/quote
```
output
```
{"_id":"61495f05a548df1ceb253363","id":"1","quote":"changed the quote","__v":0}
```

To delete the data from collection using id
```
[cecuser@p1323-bastion ~]$ curl -X DELETE -H "Content-Type: application/json" -d "{ \"id\": \"1\" }" http://localhost:3000/quote
```
output
```
{"ok":"true"}

```



