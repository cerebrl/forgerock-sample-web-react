/*
 * forgerock-sample-web-react
 *
 * choice.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment } from 'react';

/**
 * @function Choice - React component used for displaying choices
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function Choice({ callback }) {
  const prompt = callback.getPrompt();
  const choiceOptions = callback.getChoices();

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event) {
    callback.setChoiceIndex(event.target.value);
  }

  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="prompt">{ prompt }</label>
        <select
          onBlur={ setValue }
          name="selected"
          className="form-control">
          {
            choiceOptions.map(function (option, idx) {
              return (
                <option key={idx} value={idx}>{ option }</option>
              )
            })
          }
        </select>
      </div>
    </Fragment>
  );
}
