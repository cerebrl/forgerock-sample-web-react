/*
 * forgerock-sample-web-react
 *
 * boolean.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Boolean - React component used for displaying checkboxes
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React JSX view
 */
export default function Boolean({ callback }) {
  const prompt = callback.getPrompt();
  const value = callback.getInputValue();

  function setValue(e) {
    callback.setInputValue(e.target.checked);
  }
  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        defaultChecked={value}
        id={callback.payload.input[0].name}
        onChange={setValue}
        type="checkbox"
      />
      <label
        htmlFor={callback.payload.input[0].name}
        className="form-check-label"
      >
        {prompt}
      </label>
    </div>
  );
}
