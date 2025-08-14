let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    await conn.reply(m.chat, `💜 Chat Pecador Baneado con exito.`, m, rcanal)
    await m.react('🐐')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'sinner']
handler.group = true 
export default handler
