const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./dinero.sqlite");
const talkedRecently = new Set();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    const embedDatos2 = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Tienda de Roles por -dinero")
    .setTitle("**__Tienda de Roles__**")
    .setDescription("\n1- Role <@&721509987410772018> - 1000(1k) monedas.\n2- Role <@&721510253338034208> - 100000(100k) monedas.\n3- Role <@&721510487161962506> - 1000000(1m) monedas.")
    message.channel.send({ embed: embedDatos2 });
      
  
}

module.exports.config = {
    name: 'tienda',
    displayName: 'tienda',
    aliases: ['shop'],
    usage: 'tienda',
    description: 'Tienda para comprar roles.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};