# ForgeRock Sample React (Web) App

A ForgeRock protected, sample todo web app written with the React view library with a supporting API resource server. A live version can be found here: https://fr-react-todos.crbrl.io.

## Requirements

1. An instance of ForgeRock's Access Manager (AM), either within a ForgeRock's Identity Cloud tenant, your own private installation or locally installed on your computer
2. Node >= 14.2.0 (recommended: install via [official package installer](https://nodejs.org/en/))
3. Knowledge of using the Terminal/Command Line
4. Ability to generate security certs (recommended: mkcert ([installation instructions here](https://github.com/FiloSottile/mkcert#installation))
5. This project "cloned" to your computer

## Installation

Once you have the 5 requirements above met, let's get to building the project.

### Security Certificates

This project requires HTTPS (secure protocol) which means security (SSL/TLS) certificates are necessary. For local development, it's common to generate your own self-signed certificates. You're free to use any method to do this, but if you need assistance in generating your own certs, the following can be helpful:

- Using [this utility (`mkcert`) can help simplify the process of creating trusted certs](https://github.com/FiloSottile/mkcert)
- After following `mkcert`'s installation guide and simple example of creating certs, you should have two files: `example.com+5.pem` & `example.com+5-key.pem`

  (Ensure these two files are at the root of this project; you can name them whatever you want since you configure them in your `.env` file)

> **WARNING: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production.**

### Setup Your AM Instance

#### Configure CORS

1. Allowed origins: `https://react.example.com:8443`
2. Allowed methods: `GET` `POST`
3. Allowed headers: `Content-Type` `X-Requested-With` `Accept-API-Version` `Authorization`

#### Create Your OAuth Clients

1. Create a public OAuth client for the web app
2. Create a confidential OAuth client for the API server

#### Create your Authentication Journeys/Trees

1. Login
2. Register

Note: The sample app currently supports the following callbacks only:

- NameCallback
- PasswordCallback
- ChoiceCallback
- ValidatedCreateUsernameCallback
- ValidatedCreatePasswordCallback
- StringAttributeInputCallback
- BooleanAttributeInputCallback
- KbaCreateCallback
- TermsAndConditionsCallback

### Configure Your `.env` File

Change the name of `template.env` to `.env` and replace the bracketed values (e.g. `<<<helper-text>>>`) with your values.

### Installing Dependencies and Run Build

```sh
# Install the project dependencies
npm run install

# Build the client project
npm run build
```

### Update Your `/etc/hosts` File

Now you'll need to update your `hosts` (`/etc/hosts` if on a Mac) to allow for domain aliases:

```sh
# hosts file aliases
127.0.0.1 react.example.com api.example.com
```

### Run the Servers

Now, run the dev command to start the processes needed for both client and API server

```sh
# In one terminal window, run the following watch command
# This "watches" the client source files for changes and rebuilds when needed
npm run watch

# In another terminal window, run the dev servers for both client and server
npm run servers
```

Now, you should be able to visit `https://react.example.com:8443`, which is your web app or client (the Relying Party in OAuth terms). This client will make requests to your AM instance, (the Authorization Server in OAuth terms), which will be running on whatever domain you set, and `https://api.example.com:9443` as the REST API for your todos (the Resource Server). Enjoy!

## Learn About Integration Touchpoints

This project has a debugging statements that can be activated which causes the app to pause execution at each SDK integration point. It will have a comment above the `debugger` statement explaining the purpose of the integration.

If you'd like to use this feature as a learning tool, [open the live app](https://fr-react-todos.crbrl.io/) and then open the developer tools of your browser. Rerun the app with the developer tools open, and it will automatically pause at these points of integration.

For local development, if you want to turn these debuggers off, you can set the environment variable of `DEBUGGER_OFF` to true.

## Modifying This Project

To modify the client portion of this project, you'll need to be familiar with the following React patterns:

1. Functional components
2. Hooks (including custom hooks)
3. Context API
4. React Router

You'll also want a basic understanding of Webpack and the following:

1. Babel transformation for React
2. Plugins for Sass-to-CSS processing.

To modify the API server, you'll need a basic understanding of Node as well as the following things:

1. Express
2. PouchDB
3. Superagent
