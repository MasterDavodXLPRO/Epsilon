const packagea = require("../package.json");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Info del Bot")
    .setTitle("**----(- __Info Bot__ -)----**")
    .addField("Nombre", "`"+message.guild.name+"`")
    .addField("Descripción", "`"+packagea.description+"`")
    .addField("Servers que Usan", "`Este bot es privado de Urtzinxa_ Discord por lo que solo esta en este servidor.`")
    message.channel.send({ embed: embedDatos }); 

    }

module.exports.config = {
    name: 'bot',
    displayName: 'robot',
    aliases: ['botinfo', 'infobot'],
    usage: 'bot',
    description: 'Informacion del bot',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};

