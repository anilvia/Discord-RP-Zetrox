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

fs.writeFileSync("INFO/KD/K", '0')
fs.writeFileSync("INFO/KD/D", '0')
fs.writeFileSync("INFO/KD/list", 'startup')



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
let Polk = '[SGht]'

let history_json_v1 = {
  list: []
};
var kills = 0;
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
    
    var deaths = 0;
    var j_n = 0;
    var K_LLS = 0;
    var D_LLS = 0;
    var time_history = 0;
    
    for (let i = 0; i <= len; i++){
      var pivo = json.damage[i];
                                  
      var pivo_v1 = JSON.stringify(pivo);
      if (pivo_v1 != undefined){

        if (pivo_v1.includes(Nick) == true && pivo_v1.includes("уничтожил") || pivo_v1.includes("сбил") == true ){var msg = pivo.msg;histr=msg;
        let history_json = fs.readFileSync("INFO/KD/list", "utf8");
        if (history_json == 'startup'){history_json = history_json_v1;}
        history_json = JSON.stringify(history_json);
        last_reg = regex_k.exec(msg); if (last_reg != null && history_json.includes(pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', time: pivo.time, string: last_reg.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);/*console.log(history_json.toString().includes(pivo.id),history_json)*/}
        last_reg = regex_d.exec(msg); if (last_reg != null && history_json.includes(pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death',time: pivo.time, string: last_reg.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);/*console.log(history_json.toString().includes(pivo.id),history_json)*/}
                                                                                                                      }
        if (pivo_v1.includes("АналВиа") == true && pivo_v1.includes("поджёг") == true){var msg = pivo.msg;histr=msg;var time = '';time  = pivo.time.toString()}
        
        
                                  }
       if (pivo_v1 == undefined && i == 0){histr = '';fs.writeFileSync("INFO/BATTLE/LAST_K", histr);var time = '';fs.writeFileSync("INFO/BATTLE/LAST_KT", time)}
       
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
let grid_m = 'false';
let M = 0;
function Update_v1(){
var request =  http.request(options_bmap, function(res) {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data = data + chunk;
      json_bmap = JSON.parse(chunk)

      if(json_bmap.valid != grid_m){
        if(json_bmap.valid == false){grid_m = json_bmap.valid;console.log('change map');fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
          else{M += 1;grid_m = json_bmap.valid;console.log('change map');fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
      }
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
 
   
var TT_AG;
  Update_v1();
 //if(hud_m == undefined){TT_AG = ':('}
  let K = 0;
  let D = 0;
  let KD_info = fs.readFileSync("INFO/KD/list", "utf8");
  let Matches = fs.readFileSync("INFO/BATTLE/map_number", "utf8");
  if(KD_info.includes('startup') != true){KD_info = JSON.parse(KD_info)
  for(let i = 0; i < KD_info.list.length; i++){
  if(KD_info.list[i].type == 'kill')    {K += 1;     }
  if(KD_info.list[i].type == 'death')   {D += 1;     }
  if(i+1 == KD_info.list.length){fs.writeFileSync("INFO/BATTLE/LAST_K",KD_info.list[i].string);fs.writeFileSync("INFO/BATTLE/LAST_KT",KD_info.list[i].time.toString())}
  }
  fs.writeFileSync("INFO/KD/K", K.toString())
  fs.writeFileSync("INFO/KD/D", D.toString())
  
  
}
  let LAST_KILL_AR = fs.readFileSync("INFO/BATTLE/LAST_K", "utf8");msg_b = LAST_KILL_AR.split(Polk)[1];
  let time = fs.readFileSync("INFO/BATTLE/LAST_KT", "utf8");
  var hours = Math.floor(time / 60 / 60);
  var minutes = Math.floor(time / 60) - (hours * 60);
  var seconds = time % 60;
  if(seconds<10){seconds ='0' +  seconds }
  var battle_time = minutes+':'+seconds;
  if (msg_b != undefined){
    var hud_m = msg_b.replace(/сбил/i, "💥");
      }

  if(Binfo == 'Ожидание подключения...'){TT_AG = 'Зетрох заходит в игру, беги ната'}
  if (Bfile == 'Null'){Startup = 0;Binfo = 'Ожидание подключения...' }
  if(LAST_KILL_AR != ''){TT_AG=battle_time+' '+hud_m}
  if(Binfo.includes('В бою') == true && LAST_KILL_AR == ''){TT_AG = 'Ожидание первого убийства...'}
  if(Binfo == 'В ангаре'){TT_AG = 'Зетрох в игре, бойтесь наты'}
  if(Binfo.includes('В бою') == true && TT_AG == 'Зетрох в игре, бойтесь наты'){return}
  rpc.on("ready", () => {
    rpc.setActivity({
        details: Binfo,
        state: TT_AG,
        startTimestamp: Startup,
        largeImageText: "cover",
        largeImageKey: "3dsk",
        large_text : "lick",
        
        buttons: [
            { label: "K:D M | "+K+":"+D+" "+Matches, url: "https://" , }
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
  let M = fs.readFileSync("INFO/BATTLE/map_number", "utf8");
  res.send(K+":"+D+" "+M)
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