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

you may use `npm` instead of `yarn`, commands will be different, read npm manual.

## Prepare

make a copy of the .env.sample file with the name .env and edit within - or
just provide environment variables.

- `PORT` app listens on this port. For standard HTTP use 80
- `HOST` holds the hostname of the server running this app. Use `localhost` for a local only installation, use `0.0.0.0` when using docker
- `DATABASE_URL` points to the mongoDB connection. m`ongodb://localhost` may work fine for a local enviornment. If you use MongoDB Atlas, you can copy the provided connection string here, don't forget to put your real password in
- `DB_NAME` is the name of the database within your server instance
