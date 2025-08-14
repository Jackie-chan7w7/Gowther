import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `😇🐐 *¡Que hay, querida marioneta!* 😇🐐

📿 Te invito a unirte a mis reinos Digitales oficiales para disfrutar de las increibles comidas de Ban... 📿

🔮 ${namegrupo}
> *💖* ${gp1}

🌟 ${namecomu}
> *🧿* ${comunidad1}

*📿─💜─⚡─🧿─🐐─🐉─🔮─⚔️─👑*

👑 ¿Enlace caducado? ¡Entra aquí para más información Espiritual! 

💖 ${namechannel}
> *💜* ${channel}

> ${dev} 🐐💖`

await conn.sendFile(m.chat, catalogo, "grupos.jpg", grupos, m)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
