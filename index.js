import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fs from 'fs'
import readline from 'readline'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const proxies = JSON.parse(fs.readFileSync('proxies.json', 'utf8'))
let referrer;
function genString(stringLength) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < stringLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function makeRequest(proxy) {
    try {
      const token = genString(134);
  
      const install_id = genString(22);
      const body = {
        key: `${genString(43)}=`,
        install_id: install_id,
        fcm_token: `${install_id}:APA91b${token}`,
        referrer: referrer,
        warp_enabled: false,
        tos: new Date().toISOString(),
        type: "Android",
        locale: "es_ES"
      };
  
      const agent = new HttpsProxyAgent(proxy);

      fetch("https://api.cloudflareclient.com/v0a591/reg", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Host': 'api.cloudflareclient.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.1'
        },
        agent: agent
      })
        .then(response => {
        })
        .catch(error => {
        });
    } catch (error) {
    }
  }
  

async function loopRequest(time) {
  while (true) {
    for (const proxy of proxies) {
      makeRequest(proxy);
      const delay = 1000 / parseInt(time)
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
let seconds = 0
let minutes = 0
let hours = 0
    referrer = "df16c420-2cef-42e9-a736-30193dde7a9b"
    loopRequest(100000)
    setInterval(secondcounter, 1000)
    setInterval(minutescounter, 60000)
    setInterval(hourscounter, 3600000)
    setInterval(bored, 250);


function secondcounter() {
  seconds++
}
function minutescounter() {
  seconds = -1
  minutes++
}
function hourscounter() {
  minutes = -1
  hours++
}
const colors = [
    '\x1b[93m', // Bright yellow foreground
    '\x1b[92m', // Bright green foreground
    '\x1b[96m', // Bright cyan foreground
    '\x1b[95m',  // Bright magenta foreground
    '\x1b[38;5;223m', // Bright yellow-orange foreground
    '\x1b[38;5;229m', // Bright pink-purple foreground
    '\x1b[38;5;198m', // Bright lime green foreground
    '\x1b[38;5;201m', // Bright pink-red foreground
    '\x1b[38;5;221m', // Bright lemon foreground
    '\x1b[38;5;227m', // Bright purple foreground
    '\x1b[38;5;214m', // Bright peach foreground
    '\x1b[38;5;209m', // Bright hot pink foreground
    '\x1b[38;5;217m', // Bright yellow foreground
    '\x1b[38;5;224m', // Bright yellow-green foreground
    '\x1b[38;5;154m', // Bright aqua foreground
    '\x1b[38;5;087m', // Bright yellow-green foreground
    '\x1b[38;5;213m'  // Bright pink foreground
  ];
  const barc = [
    '\x1b[48;5;223m', // Bright yellow-orange background
    '\x1b[48;5;229m', // Bright pink-purple background
    '\x1b[48;5;198m', // Bright lime green background
    '\x1b[48;5;201m', // Bright pink-red background
    '\x1b[48;5;221m', // Bright lemon background
    '\x1b[48;5;227m', // Bright purple background
    '\x1b[48;5;214m', // Bright peach background
    '\x1b[48;5;209m', // Bright hot pink background
    '\x1b[48;5;217m', // Bright yellow background
    '\x1b[48;5;224m', // Bright yellow-green background
    '\x1b[48;5;154m', // Bright aqua background
    '\x1b[48;5;087m', // Bright yellow-green background
    '\x1b[48;5;213m'  // Bright pink background 
  ]
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function colorize(text) {
  return getRandomColor() + text + '\x1b[0m'; 
}
let colorIndex = 0;
function bored() {
  const rainbow = barc[colorIndex] + ' '.repeat(30) + '\x1b[0m';
  console.clear();
  console.log(colorize("Free WARP+ running!"))
  console.log(rainbow.repeat(3));
console.log(colorize("Running on " + referrer))
console.log(colorize(`Running for ${hours} hours and ${minutes} minutes and ${seconds} seconds`))
colorIndex = (colorIndex + 1) % colors.length;
}

