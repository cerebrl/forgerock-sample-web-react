/*
 * forgerock-sample-web-react
 *
 * card.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../../state';

export default function Card(props) {
  const [state] = useContext(AppContext);

  return (
    <div
      className={`card shadow-sm p-5 w-100 ${state.theme.cardBgClass} ${state.theme.textClass}`}
    >
      {props.children}
    </div>
  );
}
