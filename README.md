# End of Ages #
End of Ages front end app and API

## Installation ##
** Make sure Mongo is running before running initial setup. For example, run `mongod` **

To run the initial setup, run:

    `make initial-setup`

*Explanation*: This will run the following commands to set everything up:

* Install dependencies *(use -d for info)* *(NOTE: use --production to not install dev dependencies)*

        npm install -d

* Copy `conf/secrets.example.json` to `conf/secrets.json`, replacing its secrets with your own:
    
        cp conf/secrets.example.json conf/secrets.json

* Run `make setup-hook`. Sets up the pre-commit hook, which will run tests and validate code with JSHint. *Note: Make sure server is running so tests can validate*

        make setup-hook

* Seed data. Some initial data must exist both for the API itself and to run tests. To seed data, run:
    
        make seed

### Dependencies ##

#### NodeJS ####
At least version v0.10

#### MongoDB ####
Used as the API's data store. [MongoDB](http://www.mongodb.org/) can be installed from source or OSX with brew (`brew install mongodb`) or on Ubuntu with [these instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/) 

#### Redis ####
Used for sessions and caching. [Redis](http://redis.io/) can be installed on OSX with brew (`brew install redis`) or on Ubuntu `sudo apt-get install redis-server`


## Running servers ##
There are three servers which must be running - the API server (server.js), redis, and mongo. You can run them in three separate processes:

1. `mongod`
2. `redis-server`
3. `npm start` (or, alternatively, `node-dev server.js` which will reload on any code changes)

OR, you can use [foreman](https://github.com/ddollar/foreman) by running the command:
`foreman start`
which will run all three at once (using the `Procfile`)

# Scripts #
All useful utility scripts can be found in the Makefile. 

