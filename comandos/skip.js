


const Discord = require('discord.js');
const client = new Discord.Client();

const ytdl = require('ytdl-core');
const search = require('youtube-search');

let queue = new Map()

module.exports.run = async (client, message, args) => {

    const serverQueue = queue.get(message.guild.id);
  
  // Aquí verificamos si el usuario que escribió el comando está en un canal de voz y si hay una canción que omitir.
   if (!message.member.voiceChannel) return message.channel.send('debes unirte a un canal de voz.');
   // Aquí verificamos si el objeto de la lista de canciones esta vacía.
   if (!serverQueue) return message.channel.send('¡No hay canción que saltar!, la cola esta vacía');

   // Finalizamos el dispatcher
   await serverQueue.connection.dispatcher.destroy();
   message.channel.send(`Reproduciendo ahora: **${serverQueue.songs[1].title}**`);
}

module.exports.config = {
    name: 'skip',
    displayName: 'skip',
    aliases: ['s'],
    usage: 'skip',
    description: 'Salta una cancion',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};