const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js');
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let mencionado = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    let canallogs = client.channels.get(config.canallogs);
    
    if(!mencionado) return message.reply(`No ha mencionando a ningún miembro.`);
    if(!razon) return message.channel.send(`Escriba una razón del uso de kick.`);
    
    message.guild.member(mencionado).kick(razon);
    message.channel.send(`**${mencionado.username}**, fue kickeado del servidor, razón: ${razon}.`);
    
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Kickeo de usuario")
    .setTitle("**__Kickeo__**")
    .addField("Usuario Kickeado", "<@!"+mencionado.id+">")
    .addField("Razon del Kickeo", razon)
    .addField("Operador|Staff que Kickeo", "<@!"+message.author.id+">")
    canallogs.send({ embed: embedDatos }); 

    let user = client.users.cache.get(mencionado.id);

    const embedDatos2 = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Has sido kickeado")
    .setTitle("**__Has sido Kickeado**")
    .addField("Razon del Kickeo", razon)
    .addField("Operador|Staff del Kickeo", "<@!"+message.author.id+">") 
    user.send({ embed: embedDatos2 });
}     

module.exports.config = {
    name: 'kick',
    displayName: 'kickear',
    aliases: ['echar', 'patear'],
    usage: 'kick',
    description: 'Bloquear a un usuario la entrada al servidor',
    permission: 'KICK_MEMBERS',
    type: 'utility'
};