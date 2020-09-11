const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  
const moment = require("moment");
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");

console.log(duration);
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("El bot lleva activo..")
    .setTitle("**__Uptime__**")
    .setDesc(duration)
    message.channel.send({embed: embedDatos})
}

module.exports.config = {
    name: 'uptime',
    displayName: 'uptime',
    aliases: ['encendido', 'prendido'],
    usage: 'uptime',
    description: 'Cuanto lleva el bot encendido.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};