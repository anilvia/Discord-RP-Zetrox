
const fs = require("fs");

let TX_Cnf = fs.readFileSync("INFO/BATTLE/TX_Cnf", "utf8");
let N_conf = fs.readFileSync("INFO/USER/NICK", "utf8");
var msg = '[SGht] АналВиа (МиГ-29) разбился'
var regex_sk = new RegExp(N_conf+" \\("+TX_Cnf+"\\) разбился");
var last_reg_sk;
last_reg_sk = regex_sk.exec(msg);
console.log(last_reg_sk)
