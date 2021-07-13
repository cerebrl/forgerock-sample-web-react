/*
 * forgerock-sample-web-react
 *
 * index.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { env } from 'process';

// import { key, cert } from './certs.mjs';
import routes from './routes.mjs';

/**
 * Create and configure Express
 */
const app = express();
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      return callback(null, true);
    },
  })
);

/**
 * Log all server interactions
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * Initialize routes
 */
routes(app);

/**
 * Ignore self-signed cert warning
 */
env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

/**
 * Attach application to port and listen for requests
 */
createServer(/* { key, cert }, */ app).listen(
  `${process.env.PORT}`
);
console.log(
  `Listening to HTTPS on secure port: ${process.env.PORT}`
);
