/*
 * forgerock-sample-web-react
 *
 * routes.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRUser } from '@forgerock/javascript-sdk';
import page from 'page';

import { checkAccessToken } from './middleware.js';

/**
 * @function initRoutes – initializes routes and route handlers
 * @param {function} setAuthentication - sets boolean on global state for user authentication
 * @param {function} setPage - sets requested page on global state
 * @return {void}
 *
 * Other than the first * route, all routes just set the requested page value.
 * The global state management handles the event and rerenders the views.
 */
export default function initRoutes(setAuthentication, setEmail, setPage, setUser) {
  /**
   * A route handler that catches all routes. It's used to add
   * state hooks to all route contexts, and then calls next pass
   * event to the next matching route.
   */
  page('*', function addStateHooks(ctx, next) {
    ctx.setAuthentication = setAuthentication;
    ctx.setEmail = setEmail;
    ctx.setPage = setPage;
    ctx.setUser = setUser;
    next();
  });

  /**
   * Handles index (aka "root") route
   */
  page('/', function initialDisplay(ctx) {
    ctx.setPage('home');
  });

  /**
   * Protected todos route (via the checkSession middleware)
   */
  page('/todos', checkAccessToken, async function todos(ctx) {
    ctx.setPage('todos');
  });

  /**
   * Handles the login route
   */
  page('/login', function login(ctx) {
    ctx.setPage('login');
  });

  /**
   * Handles logout route. This route doesn't have an associated
   * view that renders to screen.
   */
  page('/logout', async function logout(ctx) {

    try {
      await FRUser.logout();

      ctx.setAuthentication(false);
      ctx.page.redirect('/?action=logout');
    } catch (error) {
      console.error(error);
    }
  });

  /**
   * Configure Page.js options
   * The "dispatch" option handles initializing within a route, but causes
   * unnecessary rerenders in certain circumstances.
   *
   * The "hashbang" option uses the old school, example.com/#!/home style routes.
   * This works well enough for POCs when you don't have a "real" server.
   */
  page({
    dispatch: true,
    hashbang: false,
  });
}
