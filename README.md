# Reaktor bad-api-assignment

Assignment for Reaktor junior dev positions 2021

# Cloning & Installation

Here are the instructions to get the local development environment up and running. The instructions are for Windows but the steps for other environments should be similar.

This project consists of a proxy server and a front-end client that gets data from two legacy APIs via the proxy.

1. Ensure [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/) are installed.
2. Open Git Bash in the directory where you want the project to be saved.
3. Clone this repository with `git clone` using either HTTPS or SSH
4. Move to the created folder by typing `cd bad-api-assignment`.
5. Open another terminal window
6. On one terminal, type `cd proxy` and run `npm install`
7. On the other, type `cd client` and repeat `npm install`

## To start the project
1. Open two terminal windows in /client and in /proxy
2. Start proxy with `npm start`
3. Start client with `npm start`

## Available scripts

### Client

- `npm start` - A local server should start up and you should be able to access the application with the address `http://localhost:3000/`. Any changes made to the code should be visible instantly on your browser.

- `npm test` - Runs the tests.

### Proxy

- `npm run dev` - Starts proxy server with nodemon watching for changes in the code.
- `npm start` - Starts server without watch mode