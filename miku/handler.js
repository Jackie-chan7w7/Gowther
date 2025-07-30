import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {smsg} from '../lib/simple.js';
import {format} from 'util';
import {fileURLToPath} from 'url';
import path, {join} from 'path';
import {unwatchFile, watchFile} from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import ws from 'ws';
import NodeCache from 'node-cache';

const { proto } = (await import('@whiskeysockets/baileys')).default

// Cache para optimizar consultas repetitivas
const userDataCache = new NodeCache({ stdTTL: 300, checkperiod: 60 })
const groupDataCache = new NodeCache({ stdTTL: 600, checkperiod: 120 })
const commandCache = new NodeCache({ stdTTL: 120, checkperiod: 30 })

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

// Función optimizada para obtener/crear datos de usuario
function getUserData(userId) {
  const cacheKey = `user_${userId}`;
  
  if (userDataCache.has(cacheKey)) {
    return userDataCache.get(cacheKey);
  }
  
  let user = global.db.data.users[userId];
  
  if (typeof user !== 'object') {
    user = {
      afk: -1,
      afkReason: '',
      name: '',
      age: 0,
      bank: 0,
      banned: false,
      BannedReason: '',
      Banneduser: false,
      coin: 0,
      diamond: 3,
      joincount: 1,
      lastadventure: 0,
      lastcoins: 0,
      lastclaim: 0,
      lastcode: 0,
      lastcofre: 0,
      lastdiamantes: 0,
      lastduel: 0,
      lastpago: 0,
      lastrob: 0,
      level: 0,
      cebollines: 10,
      money: 100,
      muto: false,
      premium: false,
      premiumTime: 0,
      registered: false,
      regTime: -1,
      rendang: 0,
      exp: 0,
      role: 'Nuv',
      warn: 0
    };
    global.db.data.users[userId] = user;
  } else {
    // Verificaciones optimizadas solo si es necesario
    if (!isNumber(user.exp)) user.exp = 0;
    if (!('premium' in user)) user.premium = false;
    if (!('muto' in user)) user.muto = false;
    if (!isNumber(user.joincount)) user.joincount = 1;
    if (!isNumber(user.money)) user.money = 150;
    if (!isNumber(user.cebollines)) user.cebollines = 10;
    if (!('registered' in user)) user.registered = false;
    if (!isNumber(user.level)) user.level = 0;
    if (!isNumber(user.warn)) user.warn = 0;
    if (!user.premium) user.premiumTime = 0;
  }
  
  userDataCache.set(cacheKey, user, 300);
  return user;
}

export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || []
this.uptime = this.uptime || Date.now()
if (!chatUpdate) return
    
    // Optimización: procesar solo mensajes válidos
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return;
    
    if (global.db.data == null) await global.loadDatabase()       
    
try {
m = smsg(this, m) || m
if (!m) return
global.mconn = m 
m.exp = 0
m.cebollines = false

try {
// Optimización: usar función de cache para datos de usuario
let user = getUserData(m.sender);

// Configurar nombre si no está registrado
if (!user.registered && !user.name) {
  user.name = m.name;
}

// Datos de Akinator optimizados
let akinator = user.akinator || {};
if (typeof akinator !== 'object') {
  akinator = {
    sesi: false,
    server: null,
    frontaddr: null,
    session: null,
    signature: null,
    question: null,
    progression: null,
    step: null, 
    soal: null
  };
  user.akinator = akinator;
}

// Optimización: cache para datos de chat
let chat = global.db.data.chats[m.chat]
const chatCacheKey = `chat_${m.chat}`;

if (groupDataCache.has(chatCacheKey)) {
  chat = groupDataCache.get(chatCacheKey);
} else {
  if (typeof chat !== 'object') {
    chat = {
      isBanned: false,
      welcome: true,
      detect: true,
      sWelcome: '',
      sBye: '',
      sPromote: '',
      sDemote: '', 
      sAutoresponder: '',
      sCondition: JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}]), 
      autoresponder: false,
      autoAceptar: false,
      nsfw: false,
      antiLink: false,
      modoadmin: false,
      expired: 0,
    };
    global.db.data.chats[m.chat] = chat;
  }
  groupDataCache.set(chatCacheKey, chat, 600);
}

let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') {
  global.db.data.settings[this.user.jid] = {
    self: false,
    autoread: false,
    restrict: false, 
    jadibotmd: true,
    botcommandCount: 0,
  };
  settings = global.db.data.settings[this.user.jid];
}

} catch (e) {
console.error(e)
}

        // Optimización: verificaciones rápidas de validez de mensaje
        if (typeof m.text !== "string") m.text = ""
        
        const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
        const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + detectwhat).includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0
        
        // Optimización: sistema de cola simplificado
        if (opts["queque"] && m.text && !isOwner) {
            const queque = this.msgqueque, time = 1000 * 3 // Reducido de 5s a 3s
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }
        
        // Filtros optimizados
        if (m.isBaileys) return
        
        m.exp += Math.ceil(Math.random() * 10)
        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        // Optimización: cache para getLidFromJid
        async function getLidFromJid(id, conn) {
          const cacheKey = `lid_${id}`;
          if (commandCache.has(cacheKey)) {
            return commandCache.get(cacheKey);
          }
          
          if (id.endsWith('@lid')) {
            commandCache.set(cacheKey, id, 120);
            return id;
          }
          
          try {
            const res = await conn.onWhatsApp(id).catch(() => []);
            const result = res[0]?.lid || id;
            commandCache.set(cacheKey, result, 120);
            return result;
          } catch (e) {
            return id;
          }
        }

const senderLid = await getLidFromJid(m.sender, conn)
const botLid = await getLidFromJid(conn.user.jid, conn)
const senderJid = m.sender
const botJid = conn.user.jid

const groupMetadata = m.isGroup
  ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null))
  : {}

const participants = m.isGroup ? (groupMetadata.participants || []) : []

const user = participants.find(
  p => p.id === senderLid || p.id === senderJid
) || {}

const bot = participants.find(
  p => p.id === botLid || p.id === botJid
) || {}

const isRAdmin = user?.admin === "superadmin"
const isAdmin = isRAdmin || user?.admin === "admin"
const isBotAdmin = !!bot?.admin

const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
// if (m.sender === this.user.jid) {
// continue
// }
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
// if (typeof e === 'string') continue
console.error(e)
/*for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`⧋〘📕 FORMATO ERRONEO 📕〙⧋\n\n❒ 𝗘𝗥𝗥𝗢𝗥:\n\`\`\`${format(e)}\`\`\`\n`.trim(), data.jid)
}*/
}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
// global.dfail('restrict', m, this)
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? // RegExp Mode?
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ? // Array?
_prefix.map(p => {
let re = p instanceof RegExp ? // RegExp in Array?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ? // String?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') {
if (await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}
if (typeof plugin !== 'function')
continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail // When failed
let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
plugin.command.test(command) :
Array.isArray(plugin.command) ? // Array?
plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
cmd.test(command) :
cmd === command
) :
typeof plugin.command === 'string' ? // String?
plugin.command === command :
false

if (!isAccept) {
continue
}

global.db.data.settings[mconn.conn.user.jid].botcommandCount += 1

m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return 
if (m.text && user.banned && !isROwner) {
m.reply(`🚫 Está baneado(a), no puede usar los comandos de este bot!\n\n${user.bannedReason ? `\n💌 *Motivo:* 
${user.bannedReason}` : '💌 *Motivo:* Sin Especificar'}\n\n⚠️ *Si este bot es cuenta oficial y tiene evidencia que respalde que este mensaje es un error, puede exponer su caso en:*\n\n🤍 ${asistencia}`)        
return
}

if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) return

if (opts['nyimak']) return;
if (!isROwner && opts['self']) return;
if (opts['pconly'] && m.chat.endsWith('g.us')) return;
if (opts['gconly'] && !m.chat.endsWith('g.us')) {
const allowedInPrivateForUsers = ['serbot', 'serbot --code', 'menu', 'info'];
if (!isOwner && !allowedInPrivateForUsers.includes(command)) {
return
}}
if (opts['swonly'] && m.chat !== 'status@broadcast') return;
if (typeof m.text !== 'string') m.text = '';

        if (m.isBaileys) {
          return 
         }}

let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mini = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { //número bot owner
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { 
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { 
fail('owner', m, this)
continue
}
if (plugin.premium && !isPrems) { 
fail('premium', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { 
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { 
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { 
fail('unreg', m, this)
continue
}

m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
if (plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
m.reply(`No tienes suficiente Money para usar este comando. 💙`)       
continue     
}

m.exp += xp
if (plugin.cebollines && global.db.data.users[m.sender].cebollines < plugin.cebollines * 1) {
m.reply(`No tienes suficiente cebollines para usar este comando. 🌱`) 
continue
}

if (plugin.level > _user.level) {
m.reply(`No tienes el nivel para usar este comando. 💙`)  
continue
}

let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
m.cebollines = m.cebollines || plugin.cebollines || false
m.money = m.money || plugin.money || false
} catch (e) {
// Error occured
m.error = e
console.error(e)
if (e) {
let text = format(e)
// for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), 'Admin')
if (e.name)
m.reply(text)
}} finally {

if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.cebollines)
conn.reply(m.chat, `Utilizaste *${+m.cebollines}* 🌱`, m)
}
if (m.money)
conn.reply(m.chat, `Utilizaste *${+m.money}* 💰`, m)
break
}}} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
//console.log(global.db.data.users[m.sender])
let user, stats = global.db.data.stats
if (m) {
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.cebollines -= m.cebollines * 1
user.money -= m.money * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`../lib/print.js`)).default(m, this)
} catch (e) {
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
}}

global.dfail = (type, m, conn) => {
const msg = {
rowner: '💙 *Esta función solo puede ser usada por mi creador*\n\n> (ㅎㅊDEPOOLㅊㅎ).', 
owner: '💙 *Esta función solo puede ser usada por mi desarrollador.', 
premium: '💙 *Esta función solo es para usuarios Premium.',  
private: '💙 *Esta función solo puede ser usada en chat privado.*', 
admin: '💙 *Este comando solo puede ser usado por admins.*', 
botAdmin: '💙 *Para usar esta función debo ser admin.*', 
unreg: '💙 *¡Hey! no estas registrado, registrese para usar esta función*\n\n*/reg nombre.edad*\n\n*_❕ Ejemplo_* : */reg (ㅎㅊDEPOOLㅊㅎ).18*',
restrict: '💙 *Esta característica esta desactivada.*'
}[type];
if (msg) return conn.reply(m.chat, msg, m, rcanal).then(_ => m.react('💢'))}