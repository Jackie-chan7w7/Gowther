let handler = async (m, { conn, isAdmin, isROwner} ) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = false
    await conn.reply(m.chat, '💜 Gowther activo en el grupo.', m, rcanal)
    await m.react('🐐')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['arcangel', 'unbanchat']
handler.group = true 
export default handler
