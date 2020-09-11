const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let guild = await message.guild.fetchMembers();
    let prefix = "-"
    var server = message.guild;
    let memberCount = guild.roles.get(config.users).members.size;
  
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Info del Servidor")
    .setTitle("**----(- __Info Server__ -)----**")
    .addField("Nombre", "`"+server.name+"`")
    .addField("Descripción", "`"+server.description+"`")
    .addField("Miembros Totales", "`"+server.memberCount+"`")
    .addField("Usuarios", "`"+memberCount+"`")
    .addField("Prefijo del Servidor", "`"+prefix+"`")
    message.channel.send({ embed: embedDatos }); 

    }

module.exports.config = {
    name: 'server',
    displayName: 'infoserver',
    aliases: ['serverinfo', 'infoserver'],
    usage: 'server',
    description: 'Informacion del serviodr de discord',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};