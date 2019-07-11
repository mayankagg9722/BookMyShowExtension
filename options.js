// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var api_key = "&key=AIzaSyCczSkhnEBtPw3A9VJ-gRSNARuSyjQxXvo";

window.onload = function() {
  
  chrome.runtime.onMessage.addListener(
    function(request, sender) {
      console.log(request)
    });

  getTheatres(function(destinations,totalTheatres){
    if(totalTheatres==destinations.length){
      var destinationConcatenation = destinations.join("|")
      getMylocation(destinationConcatenation);
    }
  });

}

function getMylocation(destinationConcatenation){
  navigator.geolocation.getCurrentPosition(function(position){
    getMyaddress(position.coords.latitude,position.coords.longitude,function(myAddress){
      chrome.runtime.sendMessage({message: "mydestinaitonresposnse",myAddress:myAddress,destinationConcatenation:destinationConcatenation}, (response) => {
        console.log(response);
      });
    })
  },function(error){
    logging(error)
  })
}

function getMyaddress(lat,lng,callback){
  var reverseGeocodingURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+api_key
  httpGetAsync(reverseGeocodingURL,function(responeText){
    var myAddress = JSON.parse(responeText).results[0].formatted_address
    callback(myAddress)
  })
}

function getTheatres(callback){
  var theatres = document.getElementsByClassName("__venue-name")
  var destinations = [];
  for(var i=0;i<theatres.length;i++){
    var href = document.getElementsByClassName("__venue-name")[i].href
    httpGetAsync(href,function(theatreAddressResponse){
    var content = document.createElement("div");
    content.innerHTML = theatreAddressResponse
    var theatreAddress = content.getElementsByTagName("address")[0].children[1].innerText;
    destinations.push(theatreAddress)
    callback(destinations,theatres.length)
    })
  }
}

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

function logging(logg){
  console.log(logg);
}