import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*


global.botNumber = " 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['527223618420', '👑 Jackie_bwd', true],
  ['527223618420', 'Jackie_bwd', true],
  
// <-- Número @lid -->
  ['249306023985172', 'ღ ᘜㄖ山ㄒ卄乇尺  ᰔᩚ', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['527223618420'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '💖 Gowther ✨V✨ 💖'
global.namebot = '🐐💜 𝗚𝗼𝘄𝘁𝗵𝗲𝗿-𝗕𝗼𝘁 💜🐐'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '👑💖 𝗚𝗢𝗪𝗧𝗛𝗘𝗥-𝗕𝗢𝗧 💖👑'
global.botname = '🄶🄾🅆🅃🄷🄴🅁'
global.wm = '🩷 ＧＯＷＴＨＥＲ 🩷'
global.author = '© (ღ ᘜㄖ山ㄒ卄乇尺  ᰔᩚ)'
global.dev = '© 🄿🄾🅆🄴🅁🄴🄳 (ღ ᘜㄖ山ㄒ卄乇尺  ᰔᩚ)'
global.textbot = '🌟 Gowther la Cabra de la Lujuria 🌟'
global.etiqueta = '📿 Gowther Ｄｅｖ 📿'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = '💝 Marionetas'
global.welcom1 = '💖 ¡Que hay! soy Gowther 💖 \n🐐 Espero serte de mucha ayuda en tu aventura  🐐 \n🌟 Edita este mensaje con setwelcome 🌟'
global.welcom2 = '😴😇 ¡Hasta pronto! \n✨ ¡Esperamos verte pronto en la taberna del Cerdo! 🌟 \n👑 Edita este mensaje con setbye 🐐'
global.banner = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYck8S6F7u_95wUCMr_nS0liSC41bMYK84UQ_9g1qMOeD8c_VQGnnOCj0&s=10.png'
global.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rIwlEnrxbyemvbtbokz7Rd5DC_1wqavseFCThNPmFwcCsGIQoHetKqtb&s=10.png'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/FQ78boTUpJ7Ge3oEtn8pRE?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/FQ78boTUpJ7Ge3oEtn8pRE?mode=ac_t'
global.channel = 'https://www.whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o'
global.channel2 = 'https://www.whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o'
global.md = 'https://github.com/Jackie-chan7w7/Gowther'
global.correo = 'patita8669527@gmail.com'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363401404146384@newsletter',
}
global.multiplier = 60

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
