import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1lR8c_Yz-RM_GQTJFJc18W-VT7mxMVNHsRYgr1wj1USPmM4YiEgkHym0&s=10')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = '🐐 ¡Un Nuevo Pecador a Llegado ! 🐐'
  let txt1 = '💫 ¡Hasta pronto! 💫'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `♥️*¡Que onda!* Bienvenido al Bar el Dragon del Sol 🐉 ${groupMetadata.subject}🐏\n\n♥️ @${m.messageStubParameters[0].split`@`[0]} 🐏\n\n🐏 ${global.welcom1} ✨\n\n♥️ ¡Ahora somos ${groupSize} titeres de Gowther! 🦖\n\n🦖 ¡Prepárate para la lucha! (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤ 📿\n\n> 📿 Usa *#help* para ver todos los pecados de Gowther! ✨\n SIGUE NUESTRO CANAL \n https://www.whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o\n> NADJA MI ESPOSA`    
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak, m, rcanal)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `✨ *¡Hasta pronto!* ${groupMetadata.subject} te esperara ♥️\n\n📿 @${m.messageStubParameters[0].split`@`[0]} 💜\n\n✨ ${global.welcom2} 🐏\n\n💫 Ahora somos ${groupSize} titeres esperandote 💜\n\n✨ ¡Esperamos verte pronto en la taberna del cerdo! (⁠｡⁠･⁠ω⁠･⁠｡⁠)⁠ﾉ⁠♡ 📿\n\n> 💜 ¡Tus pecados te seguiran! 🐏\n SIGUE NUESTRO CANAL \n https://www.whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o\n> NADJA MI ESPOSA`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak, m, rcanal)
  }}
