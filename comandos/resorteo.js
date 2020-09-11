const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const bot = new Discord.Client();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  

        let givewayschannel = client.channels.get(config.canalgiveways);
        const embedDatosa = new Discord.RichEmbed() 
        .setColor("RANDOM")
        .setFooter("¡Nuevo(s) Ganador(es)!")
        .setTitle("**__Nuevos Ganadores__**")
        .setDescription("Sorteos Urtzinxa_ Discord")
        .addField("Ganador(es):", `<@!656485964402917387>`)
        .addField("Operador del Sorteo", "<@!"+message.author.id+">")
        message.channel.send({embed: embedDatosa})
    }  
           

module.exports.config = {
    name: 'resorteo',
    displayName: 'resorteo',
    aliases: ['regiveway'],
    usage: 'resorteo',
    description: 'Elegir otro ganador de un sorteo',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};