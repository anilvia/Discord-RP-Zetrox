const RPC = require("discord-rpc");
const rpc = new RPC.Client({transport: "ipc"})
const client = require('discord-rich-presence')('1145971268873625650');
const http = require('http');
const fetch = require('node-fetch');
const fs = require("fs");
const axios = require('axios')

var buffer = {};
var kills,dies,matches;
var msg;

process.setMaxListeners(1);

fs.writeFileSync("INFO/KD/K", '')
fs.writeFileSync("INFO/KD/D", '')

var options_hudmsg = {
  host: '127.0.0.1',
  port: 8111,
  path: '/hudmsg?lastEvt=0&lastDmg=0',
  method: 'GET'
};
var options_bmap = {
  host: '127.0.0.1',
  port: 8111,
  path: '/map_info.json',
  method: 'GET'
};
var options_type = {
  host: '127.0.0.1',
  port: 8111,
  path: '/indicators',
  method: 'GET'
};
let Nick = 'АналВиа'
function Update_v2(){
var request = http.request(options_hudmsg, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var json = JSON.parse(chunk);
    var len  = json.damage.length;
    var num_k;
    var time= ' ';
    var histr = ' ';
    var regex_k = new RegExp(Nick+"\(.*\) сбил");
    var regex_d = new RegExp("\(.*\) сбил .* "+Nick);
    var last_reg;
    Update_v3()
    var kills = 0;
    var deaths = 0;
    for (let i = 0; i <= len; i++){
      var pivo = json.damage[i];
      var pivo_v1 = JSON.stringify(pivo);
      if (pivo_v1 != undefined){

        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("уничтожил") || pivo_v1.includes("сбил") == true ){var msg = pivo.msg;histr=msg;
        last_reg = regex_k.exec(msg); if (last_reg != null){kills += 1; console.log ("k++",kills)  ;fs.writeFileSync("INFO/BATTLE/LAST_K", last_reg.input );var time = '';time  = pivo.time.toString();}
        last_reg = regex_d.exec(msg); if (last_reg != null){deaths += 1;console.log ("d++",deaths) ;fs.writeFileSync("INFO/BATTLE/LAST_K", last_reg.input );var time = '';time  = pivo.time.toString();}
                                                                                                                      }
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("поджёг") == true){var msg = pivo.msg;histr=msg;var time = '';time  = pivo.time.toString()}
        
        
                                  }
       if (pivo_v1 == undefined && i == 0){histr = '';fs.writeFileSync("INFO/BATTLE/LAST_K", histr);var time = '';fs.writeFileSync("INFO/BATTLE/LAST_KT", time)}
       
      }
      fs.writeFileSync("INFO/KD/K", kills.toString())
      fs.writeFileSync("INFO/KD/D", deaths.toString())
      fs.writeFileSync("INFO/BATTLE/LAST_KT", time)
      
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
//const response_map = await fetch('http://127.0.0.1:8111/map_info.json')
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
 if (Binfo == 'В бою' && plane != '' && plane != 'dummy_plane'){Binfo = Binfo+' на '+plane}
 if (Binfo == 'В бою' && plane != '' && plane == 'dummy_plane'){Binfo = Binfo+' выбирает самолёт '}
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
  
  if(Binfo == 'В ангаре'){TT_AG = 'Зетрох в игре, бойтесь наты'}
  if(Binfo == 'В бою' && msg == ''){TT_AG = 'Ожидание первого убийства...'}
  Update_v1();
 //if(hud_m == undefined){TT_AG = ':('}
  let K = fs.readFileSync("INFO/KD/K", "utf8");
  let D = fs.readFileSync("INFO/KD/D", "utf8");
  if(Binfo == 'Ожидание подключения...'){TT_AG = 'Зетрох заходит в игру, беги ната'}
  rpc.on("ready", () => {
    rpc.setActivity({
        details: Binfo,
        state: TT_AG,
        startTimestamp: Startup,
        largeImageText: "cover",
        largeImageKey: "3dsk",
        large_text : "lick",
        
        buttons: [
            { label: "K:D M | "+K+":"+D+" M", url: "https://" , }
        ]
     })
    
})
  rpc.login({clientId: "1145971268873625650"})
 }, 5000);

 //HOST
  
 var cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

app.use(cors())

app.get('/KD', (req, res) => {
  let K = fs.readFileSync("INFO/KD/K", "utf8");
  let D = fs.readFileSync("INFO/KD/D", "utf8");
  res.send(K+":"+D+" M")
})
app.get('/Last_Event', (req, res) => {
  let msg = fs.readFileSync("INFO/BATTLE/LAST_K", "utf8");
    if (msg != ''){var hud_m = msg.replace(/уничтожил/i, "💥");
    res.send(hud_m)}
    else{res.send("")}
})

app.get('/obs', (req, res) => {
  res.send("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'></head><body><div class='update' style='position: absolute;width: 700px;height: 100px;background-color: lime;/* max-width: 300px; */display: flex;flex-direction: column;flex-wrap: nowrap;align-items: flex-start;justify-content: center;font-family: monospace;color: white;font-weight: 100;font-size: 40px;transition: 1s linear;'> <div class='KD' id='1_KD' style='transition: 1s linear;'>0:0 M</div> <div class='lastEv' id='1_lastEv' style='font-size: large;transition: 1s linear;/* max-height: 37px; */'>Ожидание подключения...</div> </div> <script> async function Get_info(){ let response_v1 = await fetch('http://localhost:3000/KD'); if (response_v1.ok) { let info = await response_v1.text(); console.log(info); document.getElementById('1_KD').innerHTML = info; } else { alert('Ошибка HTTP: ' + response.status); } let response_v2 = await fetch('http://localhost:3000/Last_Event'); if (response_v2.ok) { let info = await response_v2.text(); console.log(info); document.getElementById('1_lastEv').innerHTML = info; } else { alert('Ошибка HTTP: ' + response.status); } } const interval = setInterval(function() { Get_info() }, 5000); </script> </body></html>")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})