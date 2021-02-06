# SEG-Major




# Environment variables

Add two files in the config folder named ``dev.env`` and ``test.env``, each file should have:

```.env 

PORT=3000

MONGO_URI="your database url"+"for test.env add -test to the end of your url"
```



# How to use:

## first time cloning:

```node 
yarn install 
```

#### to run the server in development mode

```node
yarn dev 
```

#### to run tests 

```node
yarn test
```

