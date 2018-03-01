


![](icon.png)

**A dApp for self-executing rental agreements paid in Ethereum.**



Used by Co-working spaces.  
(live trials beginning 2018 Q3)


## Development

#### Install

```
$ npm install
```



#### Build and Deploy

First start up a chain running on port *8545*, Ganache is recommended, a la:

```
$ ganache-cli -p 8545 -m oil snack powder kiwi exhibit clay rate table famous behind final river
```

```
$ truffle compile
```

#### Run

Note that a web3 enabled browser (such as Chrome with Metamask) is required to run the dApp

```
$ npm start  
```

#### Unit tests

```
$ truffle test
```



## Live Instance


#### [http://45.79.83.93:8080/](http://45.79.83.93:8080/)

The live instance is hosted on *45.79.83.93* (in */projects/mona-lease*).

Pushing to the `live-instance-codecave` branch results in a redeploy.  

This is implemented by setting up the Webhook (under Settings (only repo owner can do this)) to call an action on the server (http://45.79.83.93:4552/).  

So there are two **pm2** processes running on the server, one for the webhook, and one that is the webserver, these are both in the `/deploy` folder, and are created by running :

```
# ./deploy/run-once-create-pm2.sh 
```


#### Code Cave Maleny 

**TODO** add link to the code cave Maleny live demo (running on Ropsten initially ..?)


