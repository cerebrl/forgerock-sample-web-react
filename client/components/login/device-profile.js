/*
 * forgerock-sample-web-react
 *
 * choice.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect, useState } from 'react';
import { FRDevice } from '@forgerock/javascript-sdk';

/**
 * @function DeviceProfile - React component used for retrieving the device profile
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function DeviceProfile(props) {
  const deviceCollectorCb =  props.step.getCallbackOfType('DeviceProfileCallback');
  const isLocationRequired = deviceCollectorCb.isLocationRequired();
  const isMetadataRequired = deviceCollectorCb.isMetadataRequired();
  const message = deviceCollectorCb.getMessage();

  /**
   * Create state for this component in order to update the view upon change
   * `deviceProfile` is the actual JSON intended for sending to AM
   * `deviceProfileString` is intended only for rendering within the view
   */
  const [ deviceProfile, updateDeviceProfile ] = useState(null);
  const [ deviceProfileString, updateDeviceProfileString ] = useState('Collecting profile ...');

  /**
   * Implement a `useEffect` here since we are interacting with the browser's
   * asynchronous location API. When the API returns the value, we will update
   * the state and this component will rerender.
   */
  useEffect(function () {
    /**
      * @function getDeviceProfile - create the FRDevice Object and collect profile
      */
     async function getDeviceProfile() {
      const device = new FRDevice();
      const profile = await device.getProfile({
        location: isLocationRequired,
        metadata: isMetadataRequired,
      });

      // Update the respective states
      updateDeviceProfile(profile);
      updateDeviceProfileString(JSON.stringify(profile, false, 2));

      // Sets value on callback
      deviceCollectorCb.setProfile(profile);
    }
    // Only call if there is no profile
    if (!deviceProfile) {
      getDeviceProfile();
    }
  });

  return (
    <div id="page_body">
      <p htmlFor="prompt">{ message }</p>
      <pre>{ deviceProfileString }</pre>
    </div>
  );
}
