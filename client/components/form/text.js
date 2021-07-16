/*
 * forgerock-sample-web-react
 *
 * text.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Text- React component used for displaying username callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React JSX view
 */
export default function Text({ callback }) {
  const existingValue = callback.getInputValue();
  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const policies = callback.getPolicies && callback.getPolicies();
  const textInputLabel = callback.getPrompt();

  let isRequired;
  let Validation = () => null;
  let validationClass = '';

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event) {
    callback.setInputValue(event.target.value);
  }

  if (failedPolicies && failedPolicies.length) {
    const validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr);
      } catch (err) {
        console.log(`Parsing failure for ${textInputLabel}`);
      }
      switch (failureObj.policyRequirement) {
        case 'VALID_USERNAME':
          prev = `${prev}Please choose a different username. `;
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          prev = `${prev}Please use a valid email address. `;
          break;
        default:
          prev = `${prev}Please check this value for correctness.`
      }
      return prev;
    }, '');
    validationClass = 'is-invalid';
    Validation = () => (<div className="invalid-feedback">{ validationFailure}</div>);
  }

  if (policies && policies.policyRequirements) {
    isRequired = policies.policyRequirements.includes('REQUIRED');
  } else if (callback.isRequired) {
    isRequired = callback.isRequired();
  }

   return (
    <div className="form-floating mb-3">
      <input
        onBlur={setValue}
        type="text"
        name={callback.payload.input[0].name}
        className={`form-control ${validationClass}`}
        id={callback.payload.input[0].name}
        required={isRequired ? "required" : ""}
        placeholder={textInputLabel}
        defaultValue={existingValue}
      />
      <label htmlFor={callback.payload.input[0].name}>{textInputLabel}</label>
      <Validation />
    </div>
  );
}
