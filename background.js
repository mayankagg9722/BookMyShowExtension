// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "mydestinaitonresposnse"){
      var api_key = "&key=AIzaSyCczSkhnEBtPw3A9VJ-gRSNARuSyjQxXvo";
      var distanceCalculationURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+request.myAddress+"&destinations="+request.destinationConcatenation+api_key
      distanceCalculationURL = distanceCalculationURL.replace(/,/g, '')
      distanceCalculationURL = distanceCalculationURL.replace(/\s/g, '+')
      httpGetAsync(distanceCalculationURL,function(distanceResponse){
        console.log(distanceResponse)
        sendResponse({message: distanceResponse});
        sendCopyToContentScript(distanceResponse)
      })
    }
  });

// chrome.browserAction.onClicked.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs)
//   });
// });

function httpGetAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); 
  xmlHttp.send(null);
}

function sendCopyToContentScript(toBeCopied){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {message: toBeCopied});
   });
}

