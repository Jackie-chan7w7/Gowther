const handler = async (m, {conn, text, command, usedPrefix, args}) => {
// let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';

  // 60000 = 1 minuto // 30000 = 30 segundos // 15000 = 15 segundos // 10000 = 10 segundos
  const time = global.db.data.users[m.sender].wait + 10000;
  if (new Date - global.db.data.users[m.sender].wait < 10000) throw `💖🐐 Necesitas descansar entre reinos virtuales! Espera ${Math.floor((time - new Date()) / 1000)} segundos antes de jugar de nuevo 🌟`;

  if (!args[0]) return conn.reply(m.chat, `💖🐐 *PIEDRA 🗿, PAPEL 📄 o TIJERA ✂️* 💖😍\n\n🔮 *¡Juguemos en el reino virtual!* ⛪\n😌 *◉ ${usedPrefix + command} piedra*\n🥺 *◉ ${usedPrefix + command} papel*\n🌠 *◉ ${usedPrefix + command} tijera*`, m);
 
  let astro = Math.random();
  if (astro < 0.34) {
    astro = 'piedra';
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'tijera';
  } else {
    astro = 'papel';
  }
  const textm = text.toLowerCase();
  if (textm == astro) {
    global.db.data.users[m.sender].exp += 500;
    m.reply(`😍🔮 *¡Empate medievall!* 👑😌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n⚡ *Premio Espiritual: +500 XP* ⚡`);
  } else if (text == 'papel') {
    if (astro == 'piedra') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`👑😍 *¡Tú ganas el combate!* 🎉💖\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n� *Premio Espiritual l: +1000 XP* ⚡`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`🐐🥺 *¡Gowther gana esta ronda!* ❌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n💔 *Penalización: -300 XP* ⚡`);
    }
  } else if (text == 'tijera') {
    if (astro == 'papel') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`👑😍 *¡Tú ganas el combate!* 🎉💖\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n� *Premio Espiritual: +1000 XP* ⚡`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`🐐🥺 *¡Gowther gana esta ronda!* ❌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n💔 *Penalización: -300 XP* ⚡`);
    }
  } else if (textm == 'tijera') {
    if (astro == 'papel') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`👑😍 *¡Tú ganas el combate!* 🎉💖\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n� *Premio Espiritual: +1000 XP* ⚡`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`🐐🥺 *¡Gowther gana esta ronda!* ❌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n💔 *Penalización: -300 XP* ⚡`);
    }
  } else if (textm == 'papel') {
    if (astro == 'piedra') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`👑😍 *¡Tú ganas el combate!* 🎉💖\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n� *Premio Espiritual: +1000 XP* ⚡`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`🐐🥺 *¡Gowther gana esta ronda!* ❌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n💔 *Penalización: -300 XP* ⚡`);
    }
  } else if (textm == 'piedra') {
    if (astro == 'tijera') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`👑😍 *¡Tú ganas el combate!* 🎉💖\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n� *Premio Espiritual: +1000 XP* ⚡`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`🐐🥺 *¡Gowther gana esta ronda!* ❌\n\n� *Tú: ${textm}*\n� *Gowther: ${astro}*\n💔 *Penalización: -300 XP* ⚡`);
    }
  }
  global.db.data.users[m.sender].wait = new Date * 1;
};
handler.help = ['ppt'];
handler.tags = ['games'];
handler.command = ['ppt'];
handler.group = true;
handler.register = true;

export default handler;
