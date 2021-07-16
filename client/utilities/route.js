import { UserManager } from '@forgerock/javascript-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from '../components/loading.js';
import { AppContext } from '../state.js';

export function ProtectedRoute({ children, ...rest }) {
  const [state, methods] = useContext(AppContext);
  const [isValidated, setValidation] = useState(false);

  useEffect(async () => {
    /**
     * First, check to see if the user has recently been authenticated
     */
    if (state.isAuthenticated) {
      /**
       * If we they have been authenticated, validate that assumption
       */
      try {
        await UserManager.getCurrentUser();
        setValidation(true);
      } catch (err) {
        methods.setAuthentication(false);
        setValidation(true);
      }
    } else {
      /**
       * If we have no record of their authenticated, no need to call the server
       */
      setValidation(true);
    }
  }, [isValidated]);

  return (
    <Route
      {...rest}
      render={() => {
        if (isValidated && state.isAuthenticated) {
          /**
           * Access token has been confirmed to be valid
           */
          return children;
        } else if (isValidated && !state.isAuthenticated) {
          /**
           * Access token has been confirmed to be invalid
           */
          return <Redirect to="/login" />
        } else {
          /**
           * Waiting on token validation
           */
          return <Loading message="Validating session ... " />
        }
      }}
    ></Route>
  );
}
