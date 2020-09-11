const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./dinero.sqlite");
const talkedRecently = new Set();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  
let actividad = args.slice(1).join(' ')
client.user.setActivity(actividad); 
    const avatarEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Mi actividad se ha cambiado")
        .setDescription(actividad)
    message.channel.send(avatarEmbed);

}

module.exports.config = {
    name: 'actividad',
    displayName: 'actividad',
    aliases: ['buy'],
    usage: 'actividad',
    description: 'Cambiar actividad del bot.',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};