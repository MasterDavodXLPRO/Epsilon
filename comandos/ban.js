const config = require("../config.json");
const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {
    let mencionado = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    
    if(!mencionado) return message.reply(`No ha mencionando a ningún miembro.`);
    if(!razon) return message.channel.send(`Escriba una razón del uso de ban.`);
    
    message.guild.member(mencionado).ban(razon);
    message.channel.send(`**${mencionado.username}**, fue baneado del servidor, razón: ${razon}.`);
    
    let canallogs = client.channels.get(config.canallogs); 

    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Baneo de usuario")
    .setTitle("**__Baneo__**")
    .addField("Usuario Baneado", "<@!"+mencionado.id+">")
    .addField("Razon del Baneo", razon)
    .addField("Operador|Staff que Baneo", "<@!"+message.author.id+">")
    canallogs.send({ embed: embedDatos }); 

    let user = client.users.get(mencionado.id);

    const embedDatos2 = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Has sido baneado")
    .setTitle("**__Has sido Baneado**")
    .addField("Razon del Baneo", razon)
    .addField("Operador|Staff del Baneo", "<@!"+message.author.id+">") 
    user.send({ embed: embedDatos2 });
}     

module.exports.config = {
    name: 'ban',
    displayName: 'banear',
    aliases: ['banear', 'vetar'],
    usage: 'ban',
    description: 'Bloquear a un usuario la entrada al servidor',
    permission: 'BAN_MEMBERS',
    type: 'utility'
};