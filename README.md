# Reaktor bad-api-assignment

Assignment for Reaktor junior dev positions 2021

[Live demo](https://intense-caverns-36765.herokuapp.com/)

# Local installation

Here are the instructions to get the local development environment up and running. The instructions are for Windows but the steps for other environments should be similar.

This project consists of a _proxy server_ and a _front-end client_ that gets data from two legacy APIs via the proxy. Front-end client is served statically from the proxy

## 1. Install redis
This project uses [redis](https://redis.io/) so to run it locally, you need to install redis on your machine.
- [Windows instructions](https://dev.to/divshekhar/how-to-install-redis-on-windows-10-3e99)
- [Mac instructions](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)
- [Linux instructions](https://redis.io/download#installation)

## 2. Clone the repository
1. Ensure [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/) are installed.
2. Open Git Bash in the directory where you want the project to be saved.
3. Clone this repository with `git clone` using either HTTPS or SSH
4. Move to the created folder by typing `cd bad-api-assignment`.
5. Open another terminal window
6. On one terminal, type `cd proxy` and run `npm install`
7. On the other, type `cd client` and repeat `npm install`

## To start the project in dev mode
1. Open two terminal windows in project root
2. Inside _proxy_ folder, run `npm run dev`
3. Inside _client_ folder, run `npm start`

## Running frontend production build locally
1. Inside _proxy_ folder, run `npm run build:ui && npm start`

## Available scripts

### Client
  Scripts runnable inside folder /client
- `npm start` - A local server should start up and you should be able to access the application with the address `http://localhost:3000/`. Any changes made to the code should be visible instantly on your browser.
- `npm test` - Runs the tests.
- `npm run lint` - Runs ESLint.

### Proxy
  Scripts runnable inside folder /proxy
- `npm run dev` - Starts proxy server with nodemon watching for changes in the code.
- `npm start` - Starts server without watch mode.
- `npm run build:ui` - Removes current front-end build and rebuilds it
