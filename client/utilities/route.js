/*
 * forgerock-sample-web-react
 *
 * route.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { UserManager } from '@forgerock/javascript-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from '../components/utilities/loading';
import { AppContext } from '../state';

/**
 * @function useAuthValidation - Custom hook for validating user authentication
 * @param {boolean} auth - client state on whether user is authenticated
 * @param {function} setAuth - global state method for setting user authentication status
 * @returns {Array}
 */
function useAuthValidation(auth, setAuth) {
  /**
   * isValidated is a boolean that represents if the access token
   * has been validated, NOT whether it is actually valid
   */
  const [isValid, setValid] = useState('unknown');

  useEffect(() => {
    async function validateAccessToken() {
      /**
       * First, check to see if the user has recently been authenticated
       */
      if (auth) {
        /**
         * If we they have been authenticated, validate that assumption
         */
        try {
          await UserManager.getCurrentUser();
          setValid('valid');
        } catch (err) {
          setAuth(false);
          setValid('invalid');
        }
      } else {
        /**
         * If we have no record of their authenticated, no need to call the server
         */
        setValid('invalid');
      }
    }

    validateAccessToken();
  }, [auth, setAuth]);

  return [
    {
      isValid,
    },
  ];
}

/**
 *
 * @param {Object} props - React props
 * @param {Object} props.children - React components passed as children
 * @param {Object} ...rest - The rest of the props passed
 * @returns {Object} - Wrapped React Router component
 */
export function ProtectedRoute({ children, ...rest }) {
  const [{ isAuthenticated }, { setAuthentication }] = useContext(AppContext);
  const [{ isValid }] = useAuthValidation(isAuthenticated, setAuthentication);

  return (
    <Route
      {...rest}
      render={() => {
        switch (isValid) {
          case 'valid':
            // Access token has been confirmed to be valid
            return children;
          case 'invalid':
            // Access token has been confirmed to be invalid
            return <Redirect to="/login" />;
          default:
            // Waiting on token validation
            return <Loading classes="pt-5" message="Validating session ... " />;
        }
      }}
    ></Route>
  );
}
