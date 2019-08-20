// ***************************************************************************
// * tempsensor node.js module
// * auth: adam lamer
// * desc: expose methods to communicate with ds18b20 temp sensors
// ***************************************************************************

var path = require('path');
var fs = require('fs');
var sensorW1WirePath = '/sys/bus/w1/devices/';

exports.listSensors = function(){return listSensors();};
exports.readTemps = function(sensorId){
  if (arguments.length === 0) {
    return readTemps();
  } else {
    return readTemps(sensorId);
  }
};

function listSensors() {
  var ret = [];
  var files = fs.readdirSync(sensorW1WirePath, {"withFileTypes":true});
//    if (err) {
//      console.log("Error scanning directory:\n" + err);
//      process.exit();
//    }
    files.forEach(function(file){
      if (file.isDirectory && file.name.startsWith("28-")) {
        ret.push(file.name);
      }
    });
    return ret;
};

function readTemps (sensorId) {
  var tempArray = [];
  if (arguments.length === 0) {
    var s = listSensors();
    for (var i = 0; i < s.length; ++i){
      var celsius = readSensorCTemp(s[i]);
      var farenheit = convertCToF(celsius);
      tempArray.push({"sensorId" : s[i], "celsius" : celsius, "fahrenheit" : farenheit});
    }
  } else {
    var sensorPath = path.join(sensorW1WirePath, sensorId, "w1_slave");
    var data = fs.readFileSync(sensorPath).toString();
    var celsius = Number(data.substring(data.indexOf('t=')+2))/1000;
    var farenheit = convertCToF(celsius);
    tempArray.push({"sensorId" : sensorId, "celsius" : celsius, "fahrenheit" : farenheit});
  }
  return tempArray;
}

function readSensorCTemp(sensorId) {
  if (arguments.length === 0) {
    console.error("Error [readSensorCTemp]: No sensorId specified.");
    return;
  } else {
    var sensorPath = path.join(sensorW1WirePath, sensorId, "w1_slave");
    var data = fs.readFileSync(sensorPath).toString();
    return Number(data.substring(data.indexOf('t=')+2))/1000;
  }
}

function readSensorFTemp(sensorId) {
  if (arguments.length === 0) {
    console.error("Error [readSensorCTemp]: No sensorId specified.");
    return;
  } else {
    return convertCToF(readSensorCTemp(sensorId));
  }
}

function convertCToF (celsius) {
  return (celsius * 1.8) + 32;
}

function convertFToC (fahrenheit) {
  return (fahrenheit - 32)/1.8;
}
