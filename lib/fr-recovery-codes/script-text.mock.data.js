/* eslint-disable no-useless-escape */
/*
 * @forgerock/javascript-sdk
 *
 * script-text.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/* eslint-disable max-len */
var displayRecoveryCodes = "/*\n* Copyright 2018 ForgeRock AS. All Rights Reserved\n*\n* Use of this code requires a commercial software license with ForgeRock AS.\n* or with one of its affiliates. All use shall be exclusively subject\n* to such license between the licensee and ForgeRock AS.\n*/\n\nvar newLocation = document.getElementById(\"wrapper\");\nvar oldHtml = newLocation.getElementsByTagName(\"fieldset\")[0].innerHTML;\nnewLocation.getElementsByTagName(\"fieldset\")[0].innerHTML = \"<div class=\\\"panel panel-default\\\">\\n\" +\n   \"    <div class=\\\"panel-body text-center\\\">\\n\" +\n   \"        <h3>Your Recovery Codes</h3>\\n\" +\n   \"        <h4>You must make a copy of these WebAuthn authenticator recovery codes. They cannot be displayed again.</h4>\\n\" +\n   \"    </div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"iZmEtxvQ00\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"Eqw3GFVamY\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"nNPqIEtIpS\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"vGhNQpDjP8\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"ItA4W3iBaA\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"JmLQP6XyIo\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"G2e6foNKke\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"h2SqAqvT21\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"q6VX1ojNbI\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"text-center\\\">\\n\" +\n   \"IZKIQXAfY2\\n\" +\n   \"</div>\\n\" +\n   \"<div class=\\\"panel-body text-center\\\">\\n\" +\n   \"        <p>Use one of these codes to authenticate if you lose your device, which has been named: <em>New Security Key</em></p>\\n\" +\n   \"</div>\\n\" +\n   \"</div>\" + oldHtml;\ndocument.body.appendChild(newLocation);\n\n\n\n";
var displayRecoveryCodesResponse = {
    authId: 'foo',
    callbacks: [
        {
            type: 'TextOutputCallback',
            output: [
                {
                    name: 'message',
                    value: '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nvar newLocation = document.getElementById("wrapper");\nvar oldHtml = newLocation.getElementsByTagName("fieldset")[0].innerHTML;\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML = "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "        <h3>Your Recovery Codes</h3>\\n" +\n    "        <h4>You must make a copy of these WebAuthn authenticator recovery codes. They cannot be displayed again.</h4>\\n" +\n    "    </div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "iZmEtxvQ00\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "Eqw3GFVamY\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "nNPqIEtIpS\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "vGhNQpDjP8\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "ItA4W3iBaA\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "JmLQP6XyIo\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "G2e6foNKke\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "h2SqAqvT21\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "q6VX1ojNbI\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "IZKIQXAfY2\\n" +\n    "</div>\\n" +\n    "<div class=\\"panel-body text-center\\">\\n" +\n    "        <p>Use one of these codes to authenticate if you lose your device, which has been named: <em>New Security Key</em></p>\\n" +\n    "</div>\\n" +\n    "</div>" + oldHtml;\ndocument.body.appendChild(newLocation);\n\n\n',
                },
                { name: 'messageType', value: '4' },
            ],
        },
    ],
};
var expectedRecoveryCodes = [
    'iZmEtxvQ00',
    'Eqw3GFVamY',
    'nNPqIEtIpS',
    'vGhNQpDjP8',
    'ItA4W3iBaA',
    'JmLQP6XyIo',
    'G2e6foNKke',
    'h2SqAqvT21',
    'q6VX1ojNbI',
    'IZKIQXAfY2',
];
var otherResponse = {
    authId: 'foo',
    callbacks: [
        {
            type: 'TextOutputCallback',
            output: [
                {
                    name: 'message',
                    value: '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nvar new Location = foo;',
                },
                { name: 'messageType', value: '4' },
            ],
        },
    ],
};
export { displayRecoveryCodes, displayRecoveryCodesResponse, expectedRecoveryCodes, otherResponse };
//# sourceMappingURL=script-text.mock.data.js.map