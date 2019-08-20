/*
 var date = new Date(Date.now());
 var dateFormatted = date.getFullYear().toString() + date.getMonth().toString()
 + date.getDate().toString() + "-" + date.getHours() + ":" 
 + date.getMinutes() + ":" + date.getSeconds();
console.log(dateFormatted);
*/
var sensorlib = require('../tempsensor');

console.log('listSensors output:');
var sensorList = sensorlib.listSensors();
console.log(sensorList);

console.log('readTemps output:');
console.log(sensorlib.readTemps());
