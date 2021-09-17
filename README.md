# NodeMongo
In this, we will create a NodeJS application, using Express,Mongoose and cors, that creates a MongoDB database and then you can retrieve data from the collection.
With MongoDB and Nodejs, we can develop many different types of database applications quickly. 

Here we will perform CRUD operations by inserting data what you want to insert.

# Helm installation

For Helm installation please refer https://github.com/redhat-developer/redhat-helm-charts/tree/master/stable/ibm-mongodb-enterprise-helm

After completion of helm installation, validate if chart got installed successfully:

```
[root@p1213-bastion cecuser]# helm ls
WARNING: Kubernetes configuration file is group-readable. This is insecure. Location: /root/.kube/config
NAME                                    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                                APP VERSION
test                                    jas             1               2021-05-18 00:59:07.383811905 -0400 EDT deployed        ibm-mongodb-enterprise-helm-0.1.0    4.4.0
[root@p1213-bastion cecuser]# oc get po
NAME                                                          READY   STATUS    RESTARTS   AGE
test-ibm-mongodb-enterprise-helm-deployment-d6c8b784c-zlxkh   1/1     Running   0          111m
[root@p1213-bastion cecuser]#

```

Expose a node port for the application
```
[root@p1213-bastion templates]# oc expose deployment test-ibm-mongodb-enterprise-helm-deployment --type=NodePort --name=test-ibm
service/test-ibm exposed
[root@p1213-bastion templates]# oc get nodes
NAME                                STATUS   ROLES           AGE   VERSION
p1213-master.p1213.cecc.ihost.com   Ready    master,worker   13d   v1.19.0+a5a0987
[root@p1213-bastion templates]# oc get svc
NAME                                       TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                                                                                                     AGE
test-ibm                                   NodePort       172.30.22.77     <none>        27017:31466/TCP                                                                                             14s
test-ibm-mongodb-enterprise-helm-service   ClusterIP      172.30.78.82     <none>        27017/TCP                                                                                                   85m
```


## Deploy your Application to RedHAt Openshift

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

Now let's perform CRUD operation by creating a sample data of random 100 business reviews and giving ratings randomly.
To establish a connection to a database, we need to create a MongoClient instance and then we create a database and collections and then feed a data into it by running python script `create.py` which will create a sample data

To validate, login to the container
```
[cecuser@p1262-bastion ~]$ oc get po
NAME                                                           READY   STATUS     RESTARTS   AGE
test-ibm-mongodb-enterprise-helm-deployment-7c694b99f8-qtlsl   1/1     Running    0          3d19h
[cecuser@p1262-bastion ~]$ oc rsh test-ibm-mongodb-enterprise-helm-deployment-7c694b99f8-qtlsl
sh-4.4$ mongo -u myUserAdmin -p password
MongoDB shell version v4.4.4
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("39a3eac1-cfc4-4a1d-a7f9-94989bc4ef69") }
MongoDB server version: 4.4.4
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
        https://community.mongodb.com
---
The server generated these startup warnings when booting:
        2021-09-13T13:27:06.073+00:00: Soft rlimits too low
        2021-09-13T13:27:06.073+00:00:         lockedMemoryBytes: 65536
        2021-09-13T13:27:06.073+00:00:         minLockedMemoryBytes: 1048576
---
MongoDB Enterprise > show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
newdb   0.000GB
test    0.000GB
MongoDB Enterprise > use test
switched to db test
MongoDB Enterprise > show collections
quotes
MongoDB Enterprise > db.quotes.find().count()
0
MongoDB Enterprise >
```

To Insert the data to collection 
```
[cecuser@p1262-bastion ~]$ curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"1\", \"quote\": \"value1\" }" http://localhost:3000/quote
{"_id":"6144584d2919d822bff3c18d","id":"1","quote":"value1","__v":0}

```
```
[cecuser@p1262-bastion ~]$ curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"2\", \"quote\": \"Here we go\" }" http://localhost:3000/quote
{"_id":"614458a42919d822bff3c18f","id":"2","quote":"Here we go","__v":0}[

```

To read the data from collection

```
[cecuser@p1262-bastion ~]$ curl -X GET http://localhost:3000/quote
[{"_id":"6144584d2919d822bff3c18d","id":"1","quote":"value1","__v":0},{"_id":"614458a42919d822bff3c18f","id":"2","quote":"Here we go","__v":0}]

```
To Update the data from collection using id
```
[cecuser@p1262-bastion ~]$ curl -X PUT -H "Content-Type: application/json" -d "{\"id\":\"1\", \"quote\": \"changed the quote\" }" http://localhost:3000/quote
{"_id":"614448b90939c41cb57d723b","id":"1","quote":"changed the quote","__v":0}
``
To delete the data from collection using id
```
[cecuser@p1262-bastion ~]$ curl -X DELETE -H "Content-Type: application/json" -d "{ \"id\": \"1\" }" http://localhost:3000/quote
{"ok":"true"}

```



