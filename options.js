// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.onload = function() {
  getMylocation();
  getTheatres();
}

function getMylocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    console.log("Latitude: " + position.coords.latitude , 
    "Longitude: " + position.coords.longitude)
  })
}

function getTheatres(){
  var theatres = document.getElementsByClassName("__venue-name")
  for(var i=0;i<theatres.length;i++){
    var href = document.getElementsByClassName("__venue-name")[i].href
    var address = httpGet(href)
    console.log(address)
  }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    var content = document.createElement("div");
    content.innerHTML = xmlHttp.responseText
    return content.getElementsByTagName("address")[0].children[1].innerText;
}


