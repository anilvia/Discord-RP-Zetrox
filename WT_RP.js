console.log('Вас приветвует ИИ "Балтика"\nНачинаю подключение модулей.')

const RPC = require("discord-rpc");
const rpc = new RPC.Client({transport: "ipc"})
const client = require('discord-rich-presence')('1145971268873625650');
const http = require('http');
const fetch = require('node-fetch');
const fs = require("fs");
const axios = require('axios');
var opn = require('opn');
const request = require('request');
const notifier = require('node-notifier');
console.log('Модули успешно подключены.')


var buffer = {};
var kills,dies,matches;
var msg;


const promisifiedRequest = function(options) {
  return new Promise((resolve,reject) => {
    request(options, (error, response, body) => {
      if (response) {
        return resolve(response);
      }
      if (error) {
        return reject(error);
      }
    });
  });
};

(async function() {
  const options = {
    url: 'https://anilvia.github.io/Discord-RP-Zetrox/INFO/OTHER/VERSION_M.txt',
    method: 'GET',
    gzip: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
  };

  let response_v = await promisifiedRequest(options);
  var pr_vers = fs.readFileSync("INFO/OTHER/VERSION_M.txt", "utf8");
  var sr_vers = response_v.body;

  

  if (sr_vers.includes(pr_vers) == true){console.log('Используется последняя версия')}
  if (sr_vers.includes(pr_vers) == false){
    
    var fileUrl = "https://github.com/anilvia/Discord-RP-Zetrox/archive/refs/heads/main.zip";
var output = "NEW_VERSION.zip";
request({url: fileUrl, encoding: null}, function(err, resp, body) {
  if(err) throw err;
  fs.writeFile(output, body, function(err) {
    console.log("file written!");
  });
});
notifier.notify({
  title: 'Балтика',
  message: 'Обнаружена и загружена в виде zip новая версия.\n Распакуйте архив с заменой файлов',
  icon: path.join(__dirname, 'icon.jpg'),
    sound: true,
    wait: true,
    timeout: 5
});
    console.log('Используется устаревшая версия ' + fs.readFileSync("INFO/OTHER/VERSION_M.txt", "utf8")+ ' доступна версия '+response_v.body)}

})();


fs.writeFileSync("INFO/KD/list_d", '0')
fs.writeFileSync("INFO/KD/K", '0')
fs.writeFileSync("INFO/KD/D", '0')
fs.writeFileSync("INFO/KD/list", 'startup')
fs.writeFileSync("INFO/OTHER/OverlayTRG", '0')
fs.writeFileSync("INFO/OTHER/StateTRG", '0')
//fs.writeFileSync("INFO/OTHER/DMGType", '4')

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
let N_conf = fs.readFileSync("INFO/USER/NICK", "utf8");
//let Nick = 'ZetRoX'
let P_conf = fs.readFileSync("INFO/USER/POLK", "utf8");
//let Polk = '-ZRoX-'
let TX_Cnf = fs.readFileSync("INFO/BATTLE/TX_Cnf", "utf8");
//let TX_Cnf = 'МиГ-29'
let Version = fs.readFileSync("INFO/OTHER/VERSION_M.txt", "utf8");


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

    var regex_kk = new RegExp(N_conf+" \\("+TX_Cnf+"\\) сбил"); var regex_ktk = new RegExp(N_conf+" \\("+TX_Cnf+"\\) уничтожил");
    var regex_dk = new RegExp("\(.*\) сбил .* "+N_conf+" \\("+TX_Cnf+"\\)");var regex_dtk = new RegExp("\\(.*\\) уничтожил .* "+N_conf+" \\("+TX_Cnf+"\\)");
    var regex_sk = new RegExp(N_conf+" \\("+TX_Cnf+"\\) разбился");var regex_stk = new RegExp(N_conf+" \\("+TX_Cnf+"\\) выведен из строя");

    var regex_k = new RegExp(N_conf+"\(.*\) сбил"); var regex_kt = new RegExp(N_conf+"\(.*\) уничтожил");
    var regex_d = new RegExp("\(.*\) сбил .* "+N_conf+'.\\(.*\\)');var regex_dt = new RegExp("\(.*\) уничтожил .* "+N_conf);
    var regex_s = new RegExp(N_conf+"\(.*\) разбился");var regex_st = new RegExp(N_conf+"\(.*\) выведен из строя");



    var last_reg_k;var last_reg_kt; var last_reg_kk;var last_reg_ktk;
    var last_reg_d;var last_reg_dt; var last_reg_dk;var last_reg_dtk;
    var last_reg_s;var last_reg_st; var last_reg_sk;var last_reg_stk;


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

        if (pivo_v1.includes(N_conf) == true && pivo_v1.includes("уничтожил") || pivo_v1.includes("сбил") == true || pivo_v1.includes("разбился") == true || pivo_v1.includes("выведен из строя") == true){var msg = pivo.msg;histr=msg;
        let history_json = fs.readFileSync("INFO/KD/list", "utf8");
        if (history_json == 'startup'){history_json = history_json_v1;}
        history_json = JSON.stringify(history_json);
        last_reg_kk = regex_kk.exec(msg);
        last_reg_dk = regex_dk.exec(msg);
        last_reg_sk = regex_sk.exec(msg);
        last_reg_ktk = regex_ktk.exec(msg);
        last_reg_dtk = regex_dtk.exec(msg);
        last_reg_stk = regex_stk.exec(msg);

          last_reg_k = regex_k.exec(msg);
          last_reg_d = regex_d.exec(msg);
          last_reg_s = regex_s.exec(msg);
          last_reg_kt = regex_kt.exec(msg);
          last_reg_dt = regex_dt.exec(msg);
          last_reg_st = regex_st.exec(msg);

  var DMG_type = "0";
    DMG_type = fs.readFileSync("INFO/OTHER/DMGType", "utf8");
    TX_Cnf = fs.readFileSync("INFO/BATTLE/TX_Cnf", "utf8");
    if(DMG_type == "4"){
      if (last_reg_kk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1;console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_kk.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
      else if (last_reg_dk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
      else if (last_reg_sk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_sk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                      }
    else if(DMG_type == "5"){
    TESTJS = JSON.parse(history_json)
        if (last_reg_ktk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_ktk.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                            
        else if (last_reg_dtk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dtk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                          
        else if (last_reg_stk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_stk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                                            }
    else if(DMG_type == "6"){
        if (last_reg_dtk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dtk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_dk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_stk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_stk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_sk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_sk.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_ktk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_ktk.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_kk != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_kk.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}           
                                          }
    else if(DMG_type == "1"){
        if (last_reg_k != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1;console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_k.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        if (last_reg_d != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_d.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_s != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_s.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                        }
if(DMG_type == "2"){
TESTJS = JSON.parse(history_json)
  if (last_reg_kt != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_kt.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++} 
  else if (last_reg_dt != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dt.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
  else if (last_reg_st != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_st.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
                    }
      if(DMG_type == "3"){
        if (last_reg_dt != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_dt.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_d != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("d++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_d.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_st != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_st.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_s != null && history_json.includes('event_id\\":'+pivo.id) != true )  {deaths += 1;console.log ("s++",deaths) ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, deaths_id:D_LLS, type:'death', string: last_reg_s.input});j_n += 1;D_LLS += 1;var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_kt != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_kt.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}
        else if (last_reg_k != null && history_json.includes('event_id\\":'+pivo.id) != true )  {kills += 1; console.log ("k++",kills)  ;var time = '';time  = pivo.time.toString();if (history_json_v2 == undefined){var history_json_v2 = JSON.parse(history_json)};console.log(history_json_v2.list);if(history_json_v2.list == undefined){history_json_v2 = JSON.parse(history_json_v2)} history_json_v2.list.push({id: j_n,event_id: pivo.id, kill_id:K_LLS,type:'kill', string: last_reg_k.input}); j_n += 1;K_LLS+= 1; var json_v2 = JSON.stringify(history_json_v2);fs.writeFileSync("INFO/KD/list", json_v2);pivo.id++}           
      }}
        if (pivo_v1.includes(N_conf) == true && pivo_v1.includes("поджёг") == true){var msg = pivo.msg;histr=msg;var time = '';time  = pivo.time.toString()}
        
        
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
function Update_v1(){
  let M = parseInt(fs.readFileSync("INFO/BATTLE/map_number", "utf8"));
var request =  http.request(options_bmap, function(res) {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data = data + chunk;
      json_bmap = JSON.parse(chunk)

      //if(json_bmap.valid != grid_m){
      //  if(json_bmap.valid == false){grid_m = json_bmap.valid;fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
      //    else{M += 1;grid_m = json_bmap.valid;console.log('change map');fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
      //}
      //if(json_bmap.valid == true){	
      //  fs.writeFileSync("INFO/BATTLE/battle_info", "True")}
      //if(json_bmap.valid == false){	
      //  fs.writeFileSync("INFO/BATTLE/battle_info", "False")}
    });
    })
    request.on('error', function(err) {
      fs.writeFileSync("INFO/BATTLE/battle_info", "Null")
  });
    request.end();
}


function Update_v3(){
  let M = parseInt(fs.readFileSync("INFO/BATTLE/map_number", "utf8"));
  var request =  http.request(options_type, function(res) {
      let data = '';
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data = data + chunk;  
        json_bmap = JSON.parse(chunk)
        if(json_bmap.valid != grid_m){
          if(json_bmap.valid == true){grid_m = json_bmap.valid;fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
          else if(json_bmap.valid == false){M += 1;grid_m = json_bmap.valid;console.log('change map');fs.writeFileSync("INFO/BATTLE/map_number", M.toString())}
        }
        else if(json_bmap.valid == true){	
          fs.writeFileSync("INFO/BATTLE/PL", json_bmap.type)
          fs.writeFileSync("INFO/BATTLE/battle_info", "True")}
        else if(json_bmap.valid == false){
            fs.writeFileSync("INFO/BATTLE/battle_info", "False")	
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
  if(Bfile == BBUFF){}else{Startup = Date.now();}
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
  let api_correction = '';
  let KD_info = fs.readFileSync("INFO/KD/list", "utf8");
  let Matches = fs.readFileSync("INFO/BATTLE/map_number", "utf8");
  if(KD_info.includes('startup') != true){KD_info = JSON.parse(KD_info)
  for(let i = 0; i < KD_info.list.length; i++){
  if(KD_info.list[i].type == 'kill')    {K += 1;     }
  if(KD_info.list[i].type == 'death')   {D += 1;     }
  if(i+1 == KD_info.list.length){fs.writeFileSync("INFO/BATTLE/LAST_K",KD_info.list[i].string);/*fs.writeFileSync("INFO/BATTLE/LAST_KT",KD_info.list[i].time.toString())*/}
  }
  api_correction = fs.readFileSync("INFO/KD/list_d", "utf8");
  if (api_correction == 0){fs.writeFileSync("INFO/KD/K", K.toString()); fs.writeFileSync("INFO/KD/D", D.toString())}
  else{
    api_correction = JSON.parse(api_correction)
    if(api_correction.k != ''){K += parseInt(api_correction.k);}
    if(api_correction.d != ''){D += parseInt(api_correction.d);}
    fs.writeFileSync("INFO/KD/K", K.toString())
    fs.writeFileSync("INFO/KD/D", D.toString())
  }
}
  let LAST_KILL_AR = fs.readFileSync("INFO/BATTLE/LAST_K", "utf8");
  let time = 'Disable'//fs.readFileSync("INFO/BATTLE/LAST_KT", "utf8");
  var hours = Math.floor(time / 60 / 60);
  var minutes = Math.floor(time / 60) - (hours * 60);
  var seconds = time % 60;
  if(seconds<10){seconds ='0' +  seconds }
  var battle_time = minutes+':'+seconds;
  msg_b = LAST_KILL_AR;
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
//rpc.login({clientId: "1145971268873625650"})

console.clear()
DMG_type_log = fs.readFileSync("INFO/OTHER/DMGType", "utf8");
if(DMG_type_log == '1'){DMG_type_log = 'Только Самолёты'};
if(DMG_type_log == '2'){DMG_type_log = 'Только Танки'};
if(DMG_type_log == '3'){DMG_type_log = 'Самолёты и Танки'};
if(DMG_type_log == '4'){DMG_type_log = 'Самолёт Выбранный'};
if(DMG_type_log == '5'){DMG_type_log = 'Танк Выбранный'};
if(DMG_type_log == '6'){DMG_type_log = 'СиТ Выбранный'};
console.log('Сайты запущены по адресам: \nhttp://localhost:3000/obs - Зеркало обработаных данных для OBS\nhttp://localhost:3000/controle - Панель управления, корректирования данных')
console.log('Тип отслеживаемой техники: '+DMG_type_log+'\nНик конфигурации: '+ N_conf)
console.log('Полк конфигурации: '+ P_conf)
console.log('WT_RP: ',Version)
console.log('Ручная замена конфигурационных данных производится по пути: INFO/\USER/(NICK|POLK) | OTHER/DMGType(1,2,3)\n')
 }, 5000);
 
 //HOST
  
 
const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
const app = express()
const path = require('path');
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/KD', (req, res) => {
  let K = fs.readFileSync("INFO/KD/K", "utf8");
  let D = fs.readFileSync("INFO/KD/D", "utf8");
  let M = fs.readFileSync("INFO/BATTLE/map_number", "utf8");
  res.send(K+":"+D+" "+M)
})
app.get('/KD/K', (req, res) => {
  let K = fs.readFileSync("INFO/KD/K", "utf8");
  res.send(K)
})
app.get('/KD/D', (req, res) => {
  let D = fs.readFileSync("INFO/KD/D", "utf8");
  res.send(D)
})
app.get('/KD/M', (req, res) => {
  let M = fs.readFileSync("INFO/BATTLE/map_number", "utf8");
  res.send(M)
})
app.get('/state', (req, res) => {
  let state = fs.readFileSync("INFO/OTHER/STATE.txt", "utf8");
  let TRG_S = fs.readFileSync("INFO/OTHER/StateTRG", "utf8");
  if(TRG_S == 0){res.send('')}
  else{res.send(state)}
  
})
app.get('/Last_Event', (req, res) => {
  let msg = fs.readFileSync("INFO/BATTLE/LAST_K", "utf8");
  let endPointS = fs.readFileSync("INFO/OTHER/OverlayTRG", "utf8");
  if(parseInt(endPointS) == 0){res.send("")}
  else{if (msg != ''){var hud_m = msg.replace(/уничтожил/i, "💥");
  res.send(hud_m)}
  else{res.send("")}}
    
})
app.get('/config_data', (req, res) => {
  N_conf = fs.readFileSync("INFO/USER/NICK", "utf8");
  P_conf = fs.readFileSync("INFO/USER/POLK", "utf8");
 let json_req = JSON.stringify({nick : N_conf,polk : P_conf})
    res.send(json_req)
    
})

app.get('/obs', (req, res) => {
  res.sendFile(path.join(__dirname, '/INFO/obs.html'));
})

app.get('/controle', (req, res) => {
  res.sendFile(path.join(__dirname, '/INFO/controle.html'));
})

app.post("/api/state", function (req, res) {
      
  if(!req.body) return res.sendStatus(400);
  var buff_s;
  fs.writeFileSync("INFO/OTHER/STATE.txt",req.body.title)
  res.send('Succes');
});
app.post("/api/KD", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_s;
  var post_k = req.body.k;
  var post_d = req.body.d;
 buff_s = JSON.stringify({k:post_k,d:post_d})
  fs.writeFileSync("INFO/KD/list_d",buff_s)
  res.send('Succes');
});
app.post("/api/KD/v1", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_s;
  var post_k = req.body.k;
  var post_d = req.body.d;
 buff_s = JSON.stringify({k:post_k,d:post_d})
  fs.writeFileSync("INFO/KD/list_d",buff_s)
  res.send('Succes');
});
app.get('/KD_l', (req, res) => {
  var buff_k = fs.readFileSync("INFO/KD/K", "utf8");
  var buff_d = fs.readFileSync("INFO/KD/D", "utf8");
  res.send(JSON.stringify({Deaths : buff_d, Kills : buff_k}))
})
app.get('/overlay_toggle', (req, res) => {
  toggle = fs.readFileSync("INFO/OTHER/OverlayTRG", "utf8");
    if(toggle == '0'){fs.writeFileSync("INFO/OTHER/OverlayTRG", '1')}
    if(toggle == '1'){fs.writeFileSync("INFO/OTHER/OverlayTRG", '0')}
  res.send('Succes')
})
app.get('/state_toggle', (req, res) => {
  toggle = fs.readFileSync("INFO/OTHER/StateTRG", "utf8");
    if(toggle == '0'){fs.writeFileSync("INFO/OTHER/StateTRG", '1')}
    if(toggle == '1'){fs.writeFileSync("INFO/OTHER/StateTRG", '0')}
  res.send('Succes')
})
app.get('/reset', (req, res) => {
  fs.writeFileSync("INFO/KD/list", 'startup')
  res.send('succes')
})
app.post("/api/config", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_s;
  fs.writeFileSync("INFO/USER/NICK",req.body.Nick)
  fs.writeFileSync("INFO/USER/POLK",req.body.Polk)
  res.send('Succes');
});

app.post("/api/red_map", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_m = req.body.nums
  buff_m = parseInt(buff_m)
  fs.writeFileSync("INFO/BATTLE/map_number", buff_m.toString())
  res.send('Succes');
});
app.post("/api/TXL_SLC", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_m = req.body.TXL_SLC
  buff_m = parseInt(buff_m)
  fs.writeFileSync("INFO/OTHER/DMGType", buff_m.toString())
  res.send('Succes');
});
app.get("/api/matches", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_s;
  var num_m = fs.readFileSync("INFO/BATTLE/map_number", 'utf8')
  res.send(num_m);
});
app.get("/api/OPR", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.send('1');
});
app.get("/api/VM", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.send(fs.readFileSync("INFO/OTHER/VM", 'utf8'));
});
app.get("/api/status", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.send('OK');
});
app.post("/api/VMR", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_m = req.body.VM
  fs.writeFileSync("INFO/OTHER/VM", buff_m.toString())
  res.send('Succes');
});

app.post("/api/VMT", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var buff_m = req.body.VM
  fs.writeFileSync("INFO/BATTLE/TX_Cnf", buff_m.toString())
  res.send('Succes');
});
app.get("/api/status_t", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.send(fs.readFileSync("INFO/BATTLE/TX_Cnf", 'utf8'));
});
app.get("/api/status_d", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.send(fs.readFileSync("INFO/OTHER/DMGType", 'utf8'));
});
app.get("/api/status_rt", function (req, res) {
  if(!req.body) return res.sendStatus(400);
  fs.writeFileSync("INFO/KD/list_d", '0')
  fs.writeFileSync("INFO/KD/K", '0')
  fs.writeFileSync("INFO/KD/D", '0')
  res.send('Succes');
});
app.listen(port, () => {
  console.log(`Внимание! Во время работы программы WT_RP порт ${port} будет зарезервирован.`)
})

console.log('открытие вкладок...')
opn('http://localhost:3000/controle');