# Starkbank-challenge:

This is a nodejs project which its main challenge is to send randomly 8 to 12 invoices to random people every 3 hours during 24 hours. Moreover, it should transfer an amount to starkbank when receiving a webhook callback of the Invoice credit.

## Run locally:

- create a .env file and set the following environment variables:
  - ENVIRONMENT="sandbox"
  - PROJECT_ID: The ID of the project created
  - PRIVATE_KEY: your private key
  - PORT: optional, the port to run your application, by default is 8080
  - ACCOUNT_NUMBER: Starkbank account number
  - BRANCH_CODE: Starkbank branch code
  - BANK_CODE: Starkbank bank code
  - TAX_ID: Starkbank taxi id

- run:
```
npm start
```

After that your application will be running locally on port 8080

## Unit tests:

There are unit tests that can be tested with the command line:
```
npm run test
```

## Two endpoints:

There are two endpoints avaiable:

- `POST - /invoice/send`: endpoint to set a cron job to send invoices to random people, it can receives the schedule time and the time of the limit of the cron job.

- `POST - /invoice/receive`: process a webhook event of subscription invoice only

## Continuos Deployment:

There is only one branch (`main`) and when a commit is pushed to github it triggers the deployment of the application on google cloud platform.

## Structure of the code:

- `configs`: It is responsible to setup all the connections and integrations needed for the application.

- `controllers`: Responsible to receive the req and send the response of a request to any endpoint.

- `services`: Responsible to do all the logic of the endpoint.

- `repositories`: Responsible for all the connections with the database or the starkbank connection.

- `routes`: The routes for all the endpoints.

- `tests`: Contains all the tests.