const config = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {
    let texto = args.join(' ')
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Config Urtzinxa_ Bot")
    .setTitle("**----(- __Config Urtzinxa_ Bot__ -)----**")
    .addField(":raised_back_of_hand: Mensaje de Bienvenida", "activo: `"+config.msgsalidas+"` \nCanalId: `" +config.canalbienvenidas+"` \nMensaje: `" + config.msgbienvenidap+"`\nCanalNombre: <#" +config.canalbienvenidas+">")
    .addField(":wave: Mensaje de Salida", "activo: `"+config.msgsalidas+"` \nCanalId: `"+config.canalsalidas+"` \nMensaje: `"+config.msgsalidasp+"`\nCanalNombre: <#" +config.canalsalidas+">")
    message.channel.send({ embed: embedDatos }); 

    }

module.exports.config = {
    name: 'config',
    displayName: 'ajustes',
    aliases: ['ajustes'],
    usage: 'config',
    description: 'Revisar configuracion del servidor',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};