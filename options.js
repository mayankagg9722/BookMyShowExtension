// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);


// console.log("working")


console.log("working")
window.onload = function() {
  
  console.log(document.body)
  
  navigator.geolocation.getCurrentPosition(function(position){
    console.log("Latitude: " + position.coords.latitude , 
    "<br>Longitude: " + position.coords.longitude)
  });

  console.log(httpGet("https://in.bookmyshow.com/buytickets/carnival-sangam-andheri/cinema-mumbai-BISM-MT/20190709"))
  
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


