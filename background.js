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
      // logging(distanceCalculationURL)
      httpGetAsync(distanceCalculationURL,function(distanceResponse){
        // logging(distanceResponse)
        sendResponse({message: distanceResponse});
        sendCopyToContentScript(distanceResponse)
      })
      // var myurl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626"+api_key      
      // httpGetAsync(myurl,function(res){
      //   // console.log(res)
      //   sendResponse({message: res});
      //   sendCopyToContentScript(res)
      // })
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
    var joinedMessage = toBeCopied; 
    chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
   });
}

function logging(logg){
  console.log(logg);
}
