# beetswars-backend

Backend and API for beetswars

## Tech-stack

- Node.js
- Express
- Typescript
- DynamoDB
- Zod

## Startup

- `yarn dev` starts in developer mode with auto-restart on changed files
- `yarn build` compiles typescript to javascript into the `/dist` folder
- `yarn start` runs the server using node.js from the `/dist` folder

you may use `npm` instead of `yarn`, commands will be different, please refer to the npm manual.

## Prepare

make a copy of the .env.sample file with the name .env and edit within - or
just provide environment variables.

- `PORT` app listens on this port. For standard HTTP use 80
- `HOST` holds the hostname of the server running this app. Use `localhost` for a local only installation, use `0.0.0.0` when using docker
- `DB_TABLE` is the name of the database table within the server instance

to get access to your instance of AWS DynamoDB, you need to add these keys to the .env file, unless they are automatically set by your hoster. Must be set for a local installation.

- `AWS_REGION` geographical region of your datacenter
- `AWS_ACCESS_KEY_ID` name of the AWS access key
- `AWS_SECRET_ACCESS_KEY` secret password of your AWS access key
- `AWS_SESSION_TOKEN` access token as given by your AWS instance

## Hosting

the app is currently hosted on app.cyclic.sh and using their offered AWS DynamoDB database. The four AWS entries will be automatically added by the provider. PORT and HOST are optional, as the app will be redirected by the hoster.

Important: Currently you need to set the DB_TABLE value in the "Variable" section of your app. The value is shown in "Data/Storage" section, where it is called "Table Name:".
