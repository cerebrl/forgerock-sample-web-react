# ForgeRock Sample React (Web) App

A sample todo app (client and server) written in the React view library.

## Requirements

1. Node > 14.2.0 (recommended: install via [official package installer](https://nodejs.org/en/))
2. mkcert ([installation instructions found here](https://github.com/FiloSottile/mkcert#installation))
3. This project "cloned" to your computer

## Installation

Once you have the 2 requirements above met, you will need to run the following commands within the project directory:

```sh
# Install the certificate authority
mkcert install

# Generate the secure certificates
mkcert example.com "*.example.com" example.com localhost 127.0.0.1 ::1

# Install the project dependencies
npm run install

# Build the client project
npm run build
```

Now you'll need to update your `hosts` (`/etc/hosts` if on a Mac) file for the domain aliases we will be using:

```sh
# hosts file aliases
127.0.0.1 react.example.com api.example.com
```

Now, run the two web servers for the client and server

```sh
# Run the two web servers for client and server
npm run start:client
npm run start:server
```

Now you should be able to visit `https://react.example.com:8443`. Enjoy!
