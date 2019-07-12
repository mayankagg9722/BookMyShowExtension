// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var theatres = null

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if(request.type == "mydestinaitonresposnse"){
      var jsonRes = JSON.parse(request.distanceResponse)
      var destinationDistance = jsonRes.rows[0].elements
      for(var i=0;i<theatres.length;i++){
        var parentDiv = document.getElementsByClassName("__venue-name")[i].parentElement
        var ele = document.createElement("span")
        ele.className = "__mydistance"
        ele.innerText = destinationDistance[i].distance.text+" | "+ destinationDistance[i].duration.text
        ele.prepend(document.createElement("br"))
        parentDiv.append(ele)
      }
    }else if(request.type == "myAddress"){
      chrome.runtime.sendMessage({type: "mydestinaitonresposnse",myAddress:request.myAddress,destinationConcatenation:request.destinationConcatenation});
    }else if(request.type == "theatres"){
      getMylocation(request.destinationConcatenation);
    }
});

function getMylocation(destinationConcatenation){
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    chrome.runtime.sendMessage({type: "myAddress",lat:lat,lng:lng,destinationConcatenation:destinationConcatenation});
  },function(error){
    console.log(error)
  })
}

window.onload = function() {
  theatres = document.getElementsByClassName("__venue-name")
  for(var i=0;i<theatres.length;i++){
    var hrefs = document.getElementsByClassName("__venue-name")[i].href
    chrome.runtime.sendMessage({type: "theatres",theatres:hrefs,theatresLength:theatres.length,theatresIndex:i+1});
  }
}