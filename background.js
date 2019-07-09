// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// function getBgColors (tab) {
//   console.log(document.body)
// }

// chrome.browserAction.onClicked.addListener(getBgColors);

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs)
  });
});