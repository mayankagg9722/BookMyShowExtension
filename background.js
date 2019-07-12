// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var api_key = "&key=AIzaSyCczSkhnEBtPw3A9VJ-gRSNARuSyjQxXvo";
var destinations = [];
var destinationConcatenation = ""
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type == "mydestinaitonresposnse"){
      var distanceCalculationURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+request.myAddress+"&destinations="+request.destinationConcatenation+api_key
      distanceCalculationURL = distanceCalculationURL.replace(/,/g, '')
      distanceCalculationURL = distanceCalculationURL.replace(/\s/g, '+')
      httpGetAsync(distanceCalculationURL,function(distanceResponse){
        sendCopyToContentScript(distanceResponse,request.type,null)
      })
    }else if(request.type == "myAddress"){
      var reverseGeocodingURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+request.lat+","+request.lng+api_key
      httpGetAsync(reverseGeocodingURL,function(responseText){
        var myAddress = JSON.parse(responseText).results[0].formatted_address
        sendCopyToContentScript(myAddress,request.type,request.destinationConcatenation)
      })
    }else if(request.type == "theatres"){
      if(request.theatresIndex==1){
        destinations=[]
      }
      httpGetAsync(request.theatres,function(res){
        var content = document.createElement("div");
        content.innerHTML = res
        var theatreAddress = content.getElementsByTagName("address")[0].children[1].innerText;
        destinations.push(theatreAddress)
        if(request.theatresLength==request.theatresIndex){
          var destinationConcatenation = destinations.join("|")
          sendCopyToContentScript(destinationConcatenation,request.type)
        }
      })
    }
  });

function httpGetAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true); 
  xmlHttp.send(null);
}

function sendCopyToContentScript(message,typeofcall,destinationConcatenation){
  if(typeofcall=="myAddress"){
    var myjson = {myAddress: message,type:typeofcall,destinationConcatenation:destinationConcatenation}
    sendMessageToContentScript(myjson)
  }else if(typeofcall=="mydestinaitonresposnse"){
    var myjson = {distanceResponse: message,type:typeofcall}
    sendMessageToContentScript(myjson)
  }else if(typeofcall== "theatres"){
    var myjson = {destinationConcatenation: message,type:typeofcall}
    sendMessageToContentScript(myjson)
  }
}

function sendMessageToContentScript(message){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, message);
   });
}

// chrome.browserAction.onClicked.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs)
//   });
// });