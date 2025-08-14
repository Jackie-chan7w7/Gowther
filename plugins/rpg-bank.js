import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    if (who == conn.user.jid) return m.react('💌')
    if (!(who in global.db.data.users)) return m.reply(`😴✨ El usuario no se encuentra en la base de datos de la Tabetna del Cerdo 😴✨`)
  
    let user = global.db.data.users[who]
    let total = (user.coin || 0) + (user.bank || 0);

    const texto = `💜🌠 Información Económica del Pecador 💜🌠

🐉 Pecado » *${conn.getName(who)}*   
📿 Marionetas » *${user.coin} ${moneda}*
🏦 Banco Virtual » *${user.bank} ${moneda}*
🧸 Total » *${total} ${moneda}*

🤫 *¡Para proteger tus marionetas, depósitalas en el banco virtual usando #deposit!* ⚡`;

    await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.register = true 
handler.group = true 

export default handler
