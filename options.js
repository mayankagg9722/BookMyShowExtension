// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


window.onload = function() {
  // getMylocation();
  // getTheatres();
}

function getMylocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    // console.log("Latitude: " + position.coords.latitude , 
    // "Longitude: " + position.coords.longitude)
    getMyaddress(position.coords.latitude,position.coords.longitude)
  })
}

function getMyaddress(lat,lng){
  var newURL = "https://us1.locationiq.com/v1/reverse.php?key=f178a1530c6123&lat="+lat+"&lon="+lng+"&format=json"
  httpGetAsync(newURL,function(responeText){
    var myAddress = JSON.parse(responeText).display_name
    console.log(myAddress)
  })
}
function getTheatres(){
  var theatres = document.getElementsByClassName("__venue-name")
  for(var i=0;i<theatres.length;i++){
    var href = document.getElementsByClassName("__venue-name")[i].href
    var theatreAddress = httpGetTheatres(href)
    console.log(theatreAddress)
  }
}

function httpGetTheatres(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    var content = document.createElement("div");
    content.innerHTML = xmlHttp.responseText
    return content.getElementsByTagName("address")[0].children[1].innerText;
}



function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.withCredentials = true
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*")
    xmlHttp.setRequestHeader("Content-Type", "application/json") 
    xmlHttp.send(null);
}

function calculateDistance(lat1, long1, lat2, long2)
{    

      //radians
      lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;      
      long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;    
      lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;   
      long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;       


      // use to different earth axis length    
      var a = 6378137.0;        // Earth Major Axis (WGS84)    
      var b = 6356752.3142;     // Minor Axis    
      var f = (a-b) / a;        // "Flattening"    
      var e = 2.0*f - f*f;      // "Eccentricity"      

      var beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));    
      var cos = Math.cos( lat1 );    
      var x = beta * cos * Math.cos( long1 );    
      var y = beta * cos * Math.sin( long1 );    
      var z = beta * ( 1 - e ) * Math.sin( lat1 );      

      beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));    
      cos = Math.cos( lat2 );   
      x -= (beta * cos * Math.cos( long2 ));    
      y -= (beta * cos * Math.sin( long2 ));    
      z -= (beta * (1 - e) * Math.sin( lat2 ));       

      return (Math.sqrt( (x*x) + (y*y) + (z*z) )/1000);  
}


