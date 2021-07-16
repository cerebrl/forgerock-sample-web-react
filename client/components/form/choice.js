/*
 * forgerock-sample-web-react
 *
 * choice.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Choice - React component used for displaying choices
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
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
    <div className="form-floating mb-3">
      <select
        onChange={ setValue }
        name="selected"
        className="form-select">
        {
          choiceOptions.map(function (option, idx) {
            return (
              <option key={idx} value={idx}>{ option }</option>
            )
          })
        }
      </select>
      <label htmlFor="prompt">{ prompt }</label>
    </div>
  );
}
