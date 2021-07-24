/*
 * forgerock-sample-web-react
 *
 * terms-conditions.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function TermsConditions - React component used for displaying terms and conditions
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React JSX view
 */
export default function TermsConditions({ callback }) {
  const terms = callback.getTerms();
  const termsStart = terms.substring(0, 35) + ' ...';

  function setValue(e) {
    callback.setAccepted(e.target.checked);
  }

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        defaultChecked={false}
        id={callback.payload.input[0].name}
        onChange={setValue}
        type="checkbox"
      />
      <label
        htmlFor={callback.payload.input[0].name}
        className="form-check-label"
      >
        Please accept our below Terms and Conditions
        <details>
          <summary className="fw-bold ps-1">{termsStart}</summary>
          {terms}
        </details>
      </label>
    </div>
  );
}
