let media = imagen1; 
let handler = async (m, { conn, command }) => {
    let fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    let str = `𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝖽𝗂𝗈 𝖠 𝖫𝖺𝗌 𝖢𝗎𝖾𝗇𝗍𝖺𝗌 𝖮𝖿𝗂𝖼𝗂𝖺𝗅𝖾𝗌 😻
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
⚡️ *Propietario:*
Wa.me/51988514570
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
❤️‍🔥 *Edicion*
wa.me/51953073477
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🌹 *Colaborador 1:*
Wa.me/51939508653
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🌹 *Colaborador 2:*
wa.me/xxxxxxxxxxx
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🧩 *Grupos Oficiales:*
1) *${gp1}*\n
2) *${gp2}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;

   
    await conn.sendFile(m.chat, media, 'imagen.jpg', str, fkontak, true);
};

handler.command = ['cuentas','cuentasoficiales'];
handler.exp = 35;
handler.register = true;

export default handler;
