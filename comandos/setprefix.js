const config = require("../config.json");
const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {
    let prefix = "-"
    var server = message.guild
    if(!args.length) return message.channel.send("Necesitas añadir un prefijo. `"+prefix+"setprefix [prefijo]`");
    let autor = message.author.id

    prefix_db.establecer("${message.guild.id}", args[0]);
    message.channel.send("Se acaba de cambiar el prefix a `"+args[0]+"`");

    let canallogs = client.channels.cache.get(config.canallogs);

    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Cambio de Prefix")
    .setTitle("**----(- __Bot Alterado__ -)----**")
    .addField("Autor del Cambio", "<@!"+autor+">")
    .addField("Prefix Anterior", "`"+prefix+"`")
    .addField("Prefix Nuevo", "`"+args[0]+"`")
    canallogs.send({ embed: embedDatos });

    }

module.exports.config = {
    name: 'setprefix',
    displayName: 'cambiarprefix',
    aliases: ['cambiarprefix', 'changeprefix'],
    usage: 'setprefix',
    description: 'Cambiar prefix del servidor',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};