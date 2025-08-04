import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"
const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🎤💙 ¡Ara ara! Por favor, dime el nombre de la canción que quieres que descargue para ti. 🎵✨`, m, rcanal)
    }
  
let videoIdToFind = text.match(youtubeRegexID) || null
let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

if (videoIdToFind) {
const videoId = videoIdToFind[1]  
ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
} 
ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2  
if (!ytplay2 || ytplay2.length == 0) {
return m.reply('🎵💙 ¡Gomen! No encontré ninguna canción con ese nombre. ¿Podrías intentar con otro título? ✨')
}
let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
title = title || 'no encontrado'
thumbnail = thumbnail || 'no encontrado'
timestamp = timestamp || 'no encontrado'
views = views || 'no encontrado'
ago = ago || 'no encontrado'
url = url || 'no encontrado'
author = author || 'no encontrado'
    const vistas = formatViews(views)
    const canal = author.name ? author.name : 'Desconocido'
    const infoMessage = `🎤💙 「✨」Descargando melodía virtual *<${title || 'Desconocido'}>* 🎵\n\n🎶 Canal Musical » *${canal}*\n💫 Visualizaciones » *${vistas || 'Desconocido'}*\n⏰ Duración » *${timestamp || 'Desconocido'}*\n✨ Publicado » *${ago || 'Desconocido'}*\n🌟 Link Virtual » ${url}\n\n💙 ¡Preparando tu canción favorita! ✨`
    const thumb = (await conn.getFile(thumbnail))?.data
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }
    await conn.reply(m.chat, infoMessage, m, JT)    
    if (command === 'play' || command === 'yta' || command === 'ytmp3' || command === 'playaudio') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const resulta = api.result
        const result = resulta.download.url    
        if (!result) throw new Error('⚠ El enlace de audio no se generó correctamente.')
        await conn.sendMessage(m.chat, { audio: { url: result }, fileName: `${api.result.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '🎵💙 ¡Gomen nasai! No se pudo enviar el audio virtual. Esto puede deberse a que el archivo es demasiado pesado o a un error en la generación de la URL. Por favor, intenta nuevamente más tarde ✨', m, rcanal)
      }
    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4' || command === 'mp4') {
      try {
        const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.url, json.title + '.mp4', title, m)
      } catch (e) {
        return conn.reply(m.chat, '🎤💫 ¡Gomen! No se pudo enviar el video virtual. Esto puede deberse a que el archivo es demasiado pesado o a un error en la generación de la URL. Por favor, intenta nuevamente más tarde 🎵', m, rcanal)
      }
    } else {
      return conn.reply(m.chat, '🎶💙 Comando musical no reconocido ✨', m, rcanal)
    }
  } catch (error) {
    return m.reply(`🎤💙 ¡Gomen! Ocurrió un error en el escenario virtual: ${error} ✨`)
  }
}
handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (views === undefined) {
    return "No disponible"
  }

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  }
  return views.toString()
}
