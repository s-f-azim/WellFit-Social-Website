# SEG-Major




# Environment variables

Add two files in the config folder named ``dev.env`` and ``test.env``, each file should have:

```.env 
#mode
NODE_ENV=DEVELOPMENT (TEST for test.env)

# frontend url
CLIENT_URL=http://localhost:8000

#port
PORT=4000

#db url (for test.env add -test to the end of your url)
MONGO_URI=your database url 
```



# How to use:

## first time cloning:

`in both folders run the command`:

```node 
yarn install 
```

## to run the server in development mode

`while in the backend folder run:`
```node
yarn dev 
```

## to run tests 

```node
yarn test
```

