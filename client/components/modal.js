/*
 * forgerock-sample-web-react
 *
 * modal.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Todo - Used for display a single todo and its details
 * @param {Object} props - The object representing React's props
 * @returns {Object} - React JSX view
 */
export default function Modal({ deleteTodo }) {
  return (
    <div
      className="modal fade"
      id="todoModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Delete Todo</h4>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this todo?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#todoModal"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#todoModal"
              className="btn btn-danger"
              onClick={deleteTodo}
            >
              Delete Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
