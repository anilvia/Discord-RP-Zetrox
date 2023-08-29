const client = require('discord-rich-presence')('1145971268873625650');
const http = require('http');

var kills,dies,matches;
var msg;

var options_hudmsg = {
  host: 'localhost',
  port: 8111,
  path: '/hudmsg?lastEvt=0&lastDmg=0',
  method: 'GET'
};
var options_map_info = {
  host: 'localhost',
  port: 8111,
  path: '/map_info.json',
  method: 'GET'
};
http.request(options_hudmsg, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    var len  = json.damage.length;
    console.log(len);
  
    for (let i = 0; i <= len; i++){
      var pivo = json.damage[i];
      var pivo_v1 = JSON.stringify(pivo);
      if (pivo_v1 != undefined){
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("уничтожил") == true ){console.log(pivo.msg);var msg = pivo.msg;histr=msg}
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("поджёг") == true){console.log(pivo.msg);var msg = pivo.msg;histr=msg}
      }
      
      
      }
      
  });
}).end();
client.updatePresence({
  state: msg,
  details: 'В ангаре',
  startTimestamp: Date.now(),
  
  largeImageKey: '3dsk',

  instance: true,
});





