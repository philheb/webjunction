# WebJunction

A social Media for Web Developers

## Demo

You can find a working DEMO on Heroku @ https://www.webjunction.dev

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Installing the dependencies

Server (Node)

```
npm install
```

Client (React)

```
npm run client-install
```

### Configuring the database (MongoDB)

Add keys_dev.js (DATABASE) inside

```
webjunction/config
```

### Adding the GitHub keys (GitHub API)

Add keys_devs.js (GITHUB) to

```
webjunction/client/src/keys
```

### Running

To run on your local host

This will concurrently start the React and the Node servers

```
npm run dev
```
