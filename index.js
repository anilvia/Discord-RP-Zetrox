const client = require('discord-rich-presence')('1145971268873625650');
const http = require('http');
const fetch = require('node-fetch');
const fs = require("fs");


var buffer = {};
var kills,dies,matches;
var msg;


var options_hudmsg = {
  host: 'localhost',
  port: 8111,
  path: '/hudmsg?lastEvt=0&lastDmg=0',
  method: 'GET'
};
var options_bmap = {
  host: 'localhost',
  port: 8111,
  path: '/map_info.json',
  method: 'GET'
};
var options_type = {
  host: 'localhost',
  port: 8111,
  path: '/indicators',
  method: 'GET'
};
function Update_v2(){
var request = http.request(options_hudmsg, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    var len  = json.damage.length;
    var d,num_k;
    var k = 0;
    var time;
    var histr = ' '
    for (let i = 0; i <= len; i++){
      var pivo = json.damage[i];
      var pivo_v1 = JSON.stringify(pivo);
      if (pivo_v1 != undefined){
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("уничтожил") || pivo_v1.includes("сбил") == true ){var msg = pivo.msg;histr=msg;var time = '';time  = pivo.time.toString();k++
        fs.writeFileSync("INFO/BATTLE/LAST_K", histr)
        fs.writeFileSync("INFO/BATTLE/LAST_KT", time)
        }
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("поджёг") == true){var msg = pivo.msg;histr=msg;var time = '';time  = pivo.time.toString()}
        
        
      }
       if (pivo_v1 == undefined && i == 0){histr = '';fs.writeFileSync("INFO/BATTLE/LAST_K", histr)}
       fs.writeFileSync("INFO/KD/K", k.toString())
      }


      
  });
}

)
request.on('error', function(err) {
  histr='Зетрох заходит в игру беги ната '
  fs.writeFileSync("INFO/BATTLE/LAST_K", histr)
});
request.end();
}
function Update_v1(){
var request =  http.request(options_bmap, function(res) {
    let data = '';
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data = data + chunk;
      json_bmap = JSON.parse(chunk)
      if(json_bmap.valid == true){	
        fs.writeFileSync("INFO/BATTLE/battle_info", "True")}
      if(json_bmap.valid == false){	
        fs.writeFileSync("INFO/BATTLE/battle_info", "False")}
    });
    })
    request.on('error', function(err) {
      fs.writeFileSync("INFO/BATTLE/battle_info", "Null")
  });
    request.end();
}
function Update_v3(){
  var request =  http.request(options_type, function(res) {
      let data = '';
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data = data + chunk;
        json_bmap = JSON.parse(chunk)
        if(json_bmap.valid == true){	
          fs.writeFileSync("INFO/BATTLE/PL", json_bmap.type)}
          if(json_bmap.valid == false){	
            fs.writeFileSync("INFO/BATTLE/PL", '')}
      });
      })
      request.on('error', function(err) {
        fs.writeFileSync("INFO/BATTLE/PL", "Null")
    });
      request.end();
  }
//async function Update_v2(){
//const response_map = await fetch('http://localhost:8111/map_info.json')
//const data_map = await response_map.json()
//}
//const interval = setInterval(function() {
 // console.log(Update_v1())
 // console.log(Update_v2())
//}, 5000);

Startup = Date.now();
var Binfo; 
const interval = setInterval(function() {
  Update_v2();
  Update_v3();
  let msg = fs.readFileSync("INFO/BATTLE/LAST_K", "utf8");
  let time = fs.readFileSync("INFO/BATTLE/LAST_KT", "utf8");
  let Bfile = fs.readFileSync("INFO/BATTLE/battle_info", "utf8");
  let BBUFF = fs.readFileSync("INFO/BATTLE/BUFF", "utf8");
  let plane = fs.readFileSync("INFO/BATTLE/PL", "utf8");
  if(Bfile == BBUFF){console.log('Connection stable')}else{Startup = Date.now();}
  fs.writeFileSync("INFO/BATTLE/BUFF", Bfile)
  
  if (Bfile == 'False'){
    Binfo = 'В ангаре';
    
  }else{

    Binfo ='В бою'
  }
 if (Binfo == 'В бою' && plane != ''){Binfo = Binfo+' на '+plane}
  msg_b = msg.split('[SGht] ')[1];

  if (msg_b != undefined){
  var hud_m = msg_b.replace(/уничтожил/i, "💥");
    }
    var hours = Math.floor(time / 60 / 60);
    var minutes = Math.floor(time / 60) - (hours * 60);
    var seconds = time % 60;
    if(seconds<10){seconds ='0' +  seconds }
    var battle_time = minutes+':'+seconds;
var TT_AG;
if(msg != ''){TT_AG=battle_time+' '+hud_m}


  if (Bfile == 'Null'){Startup = 0;Binfo = 'Ожидание подключения...' }
  if(Binfo == 'Ожидание подключения...'){TT_AG = 'Зетрох заходит в игру, беги ната'}
  if(Binfo == 'В ангаре'){TT_AG = 'Зетрох в игре, бойтесь наты'}
  if(Binfo == 'В бою' && msg == ''){TT_AG = 'Ожидание первого убийства...'}
  Update_v1();
  
  client.updatePresence({
    details: Binfo,
    state: TT_AG,

    startTimestamp: Startup,
    
    largeImageKey: '3dsk',
  
    instance: true,
  });
 }, 5000);