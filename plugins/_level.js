import { canLevelUp } from '../lib/levelling.js'

const roles = {
'*🚶✨ Novato(a) Aprendiz V 🚶✨*': 0,
'*🚶✨ Novato(a) Aprendiz IV 🚶✨*': 2,
'*🚶✨ Novato(a) Aprendiz III 🚶✨*': 4,
'*🚶✨ Novato(a) Aprendiz II 🚶✨*': 6,
'*🚶✨ Novato(a) Aprendiz I 🚶✨*': 8,
'*🛡️⚔️ Caballero(a) del Reino V 🛡️⚔️*': 10,
'*🛡️⚔️ Caballero(a) del Reino IV 🛡️⚔️*': 12,
'*🛡️⚔️ Caballero(a) del Reino III 🛡️⚔️*': 14,
'*🛡️⚔️ Caballero(a) del Reino II 🛡️⚔️*': 16,
'*🛡️⚔️ Caballero(a) del Reino I 🛡️⚔️*': 18,
'*🤝🌟 Miembro de la Orden V 🤝🌟*': 20,
'*🤝🌟 Miembro de la Orden IV 🤝🌟*': 22,
'*🤝🌟 Miembro de la Orden III 🤝🌟*': 24,
'*🤝🌟 Miembro de la Orden II 🤝🌟*': 26,
'*🤝🌟 Miembro de la Orden I 🤝🌟*': 28,
'*🦁💪 Guerrero(a) de Liones V 🦁💪*': 30,
'*🦁💪 Guerrero(a) de Liones IV 🦁💪*': 32,
'*🦁💪 Guerrero(a) de Liones III 🦁💪*': 34,
'*🦁💪 Guerrero(a) de Liones II 🦁💪*': 36,
'*🦁💪 Guerrero(a) de Liones I 🦁💪*': 38,
'*😇🛡️ Santo(a) Caballero(a) V 😇🛡️*': 40,
'*😇🛡️ Santo(a) Caballero(a) IV 😇🛡️*': 42,
'*😇🛡️ Santo(a) Caballero(a) III 😇🛡️*': 44,
'*😇🛡️ Santo(a) Caballero(a) II 😇🛡️*': 46,
'*😇🛡️ Santo(a) Caballero(a) I 😇🛡️*': 48,
'*👩‍✈️🚩 Capitán(a) de la Guardia V 👩‍✈️🚩*': 50,
'*👩‍✈️🚩 Capitán(a) de la Guardia IV 👩‍✈️🚩*': 52,
'*👩‍✈️🚩 Capitán(a) de la Guardia III 👩‍✈️🚩*': 54,
'*👩‍✈️🚩 Capitán(a) de la Guardia II 👩‍✈️🚩*': 56,
'*👩‍✈️🚩 Capitán(a) de la Guardia I 👩‍✈️🚩*': 58,
'*🛡️😈 Escudero(a) de los Pecados V 🛡️😈*': 60,
'*🛡️😈 Escudero(a) de los Pecados IV 🛡️😈*': 62,
'*🛡️😈 Escudero(a) de los Pecados III 🛡️😈*': 64,
'*🛡️😈 Escudero(a) de los Pecados II 🛡️😈*': 66,
'*🛡️😈 Escudero(a) de los pecados I 🛡️😈*': 68,
'*😴⚡ Pecado Menor V 😴⚡*': 70,
'*😴⚡ Pecado Menor IV 😴⚡*': 72,
'*😴⚡ Pecado Menor III 😴⚡*': 74,
'*😴⚡ Pecado Menor II 😴⚡*': 76,
'*😴⚡ Pecado Menor I 😴⚡*': 78,
'*🐉🔥 Guerrero(a) del Dragón V 🐉🔥*': 80,
'*🐉🔥 Guerrero(a) del Dragón IV 🐉🔥*': 85,
'*🐉🔥 Guerrero(a) del Dragón III 🐉🔥*': 90,
'*🐉🔥 Guerrero(a) del Dragón II 🐉🔥*': 95,
'*🐉🔥 Guerrero(a) del Dragón I 🐉🔥*': 99,
'*🐐⚡ Guerrero(a) de la Cabra V 🐐⚡*': 100,
'*🐐⚡ Guerrero(a) de la Cabra IV 🐐⚡*': 110,
'*🐐⚡ Guerrero(a) de la Cabra III 🐐⚡*': 120,
'*🐐⚡ Guerrero(a) de la Cabra II 🐐⚡*': 130,
'*🐐⚡ Guerrero(a) de la Cabra I 🐐⚡*': 140,
'*🐻💪 Guerrero(a) del Oso V 🐻💪*': 150,
'*🐻💪 Guerrero(a) del Oso IV 🐻💪*': 160,
'*🐻💪 Guerrero(a) del Oso III 🐻💪*': 170,
'*🐻💪 Guerrero(a) del Oso II 🐻💪*': 180,
'*🐻💪 Guerrero(a) del Oso I 🐻💪*': 199,
'*🐗💨 Guerrero(a) Jabalí V 🐗💨*': 200,
'*🐗💨 Guerrero(a) Jabalí IV 🐗💨*': 225,
'*🐗💨 Guerrero(a) Jabalí III 🐗💨*': 250,
'*🐗💨 Guerrero(a) Jabalí II 🐗💨*': 275,
'*🐗💨 Guerrero(a) Jabalí I 🐗💨*': 299,
'*🐍✨ Guerrero(a) de la Serpiente V 🐍✨*': 300,
'*🐍✨ Guerrero(a) de la Serpiente IV 🐍✨*': 325,
'*🐍✨ Guerrero(a) de la Serpiente III 🐍✨*': 350,
'*🐍✨ Guerrero(a) de la Serpiente II 🐍✨*': 375,
'*🐍✨ Guerrero(a) de la Serpiente I 🐍✨*': 399,
'*🕷️🕸️ Guerrero(a) de la Araña V 🕷️🕸️*': 400,
'*🕷️🕸️ Guerrero(a) de la Araña IV 🕷️🕸️*': 425,
'*🕷️🕸️ Guerrero(a) de la Araña III 🕷️🕸️*': 450,
'*🕷️🕸️ Guerrero(a) de la Araña II 🕷️🕸️*': 475,
'*🕷️🕸️ Guerrero(a) de la Araña I 🕷️🕸️*': 499,
'*🦁👑 Guerrero(a) del León V 🦁👑*': 500,
'*🦁👑 Guerrero(a) del León IV 🦁👑*': 525,
'*🦁👑 Guerrero(a) del León III 🦁👑*': 550,
'*🦁👑 Guerrero(a) del León II 🦁👑*': 575,
'*🦁👑 Guerrero(a) del León I 🦁👑*': 599,
'*😡💥 Pecado Capital V 😡💥*': 600,
'*😡💥 Pecado Capital IV 😡💥*': 625,
'*😡💥 Pecado Capital III 😡💥*': 650,
'*😡💥 Pecado Capital II 😡💥*': 675,
'*😡💥 Pecado Capital I 😡💥*': 699,
'*🏴‍☠️✨ Capitán(a) de los Pecados V 🏴‍☠️✨*': 700,
'*🏴‍☠️✨ Capitán(a) de los Pecados IV 🏴‍☠️✨*': 725,
'*🏴‍☠️✨ Capitán(a) de los Pecados III 🏴‍☠️✨*': 750,
'*🏴‍☠️✨ Capitán(a) de los Pecados II 🏴‍☠️✨*': 775,
'*🏴‍☠️✨ Capitán(a) de los Pecados I 🏴‍☠️✨*': 799,
'*✨😇 Guerrero(a) Divino(a) V ✨😇*': 800,
'*✨😇 Guerrero(a) Divino(a) IV ✨😇*': 825,
'*✨😇 Guerrero(a) Divino(a) III ✨😇*': 850,
'*✨😇 Guerrero(a) Divino(a) II ✨😇*': 875,
'*✨😇 Guerrero(a) Divino(a) I ✨😇*': 899,
'*🕊️💖 Guerrero(a) de las Diosas V 🕊️💖*': 900,
'*🕊️💖 Guerrero(a) de las Diosas IV 🕊️💖*': 925,
'*🕊️💖 Guerrero(a) de las Diosas III 🕊️💖*': 950,
'*🕊️💖 Guerrero(a) de las Diosas II 🕊️💖*': 975,
'*🕊️💖 Guerrero(a) de las Diosas I 🕊️💖*': 999,
'*😈🔥 Guerrero(a) de los Demonios V 😈🔥*': 1000,
'*😈🔥 Guerrero(a) de los Demosnios IV 😈🔥*': 2000,
'*😈🔥 Guerrero(a) de los Demonios III 😈🔥*': 3000,
'*😈🔥 Guerrero(a) de los Demonios II 😈🔥*': 4000,
'*😈🔥 Guerrero(a) de los Demonios I 😈🔥*': 5000,
'*👑💯✨ Rey de los Pecados 👑💯✨*': 10000,
}

let handler = m => m
handler.before = async function (m, { conn }) {
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[m.sender]
    
    let level = user.level
    let before = user.level * 1
    
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++
    
    if (before !== user.level) {
        let especial = 'coin'
        let especial2 = 'exp'
        let especialCant = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        let especialCant2 = Math.floor(Math.random() * (100 - 10 + 1)) + 10

        if (user.level % 5 === 0) {
            user[especial] += especialCant
            user[especial2] += especialCant2
        }
    }

    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role

    return !0
}

export default handler
