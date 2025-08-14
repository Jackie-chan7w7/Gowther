var handler = async (m, { conn }) => {
    let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

    global.db.data.users[m.sender].diamond += d;
    global.db.data.users[m.sender].coin += coin;

    let time = global.db.data.users[m.sender].lastclaim + 86400000;
    if (new Date() - global.db.data.users[m.sender].lastclaim < 7200000) {
        return conn.reply(m.chat, `💜🌟 *Todavía no es hora de la siguiente pelea...* 😍🤫\n\n😴 Vuelve en ${msToTime(time - new Date())} para reclamar tu recompensa medieval diaria ⚔️`, m);
    }

    global.db.data.users[m.sender].exp += exp;
    conn.reply(m.chat, `💖⚡ *Recompensa Medieval Diaria* 💖⚡

⛪ Recursos del Reino:
⚡ Experiencia Espiritual : *+${exp}*
🔮 Cristales Pecadores : *+${d}*
🧸 ${moneda} : *+${coin}*

¡Gracias por ser pecador de corazón! (⁠〃ﾟ⁠3ﾟ⁠〃⁠)`, m);

    global.db.data.users[m.sender].lastclaim = Date.now();
}

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ' Horas ' + minutes + ' Minutos';
}
