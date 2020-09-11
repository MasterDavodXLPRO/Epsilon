const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    var server = message.guild
    let canalsug = client.channels.get(config.canalsugerencias);
    let texto = args.slice(1).join(' ')
    if(!texto) return message.channel.send(":warning: || Escriba la sugerencia. `-sugerir {sugerencia}`") 

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    message.channel.send(":warning: || Creando sugerencia..")
    await sleep(5000)
    const embedDatos = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("Sugerencia")
        .setTitle("**__Nueva Sugerencia__**")
        .addField("Sugerencia de", "<@!"+message.author.id+">")
        .addField("Contenido de la Sugerencia", "`"+texto+"`")
        canalsug.send({embed: embedDatos}).then(embedMessage => {
            embedMessage.react("👍");
            embedMessage.react("👎")
        });

        const embedDatos2 = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("Sugerencia enviada")
        .setTitle("**__Sugerencia Enviada__**")
        .addField("Sugerencia de", "<@!"+message.author.id+">")
        .addField("Contenido de la Sugerencia", "`"+texto+"`")
        message.channel.send({embed: embedDatos2})

}

module.exports.config = {
    name: 'sugerir',
    displayName: 'sugestion',
    aliases: [],
    usage: 'sugerir',
    description: 'Comando para usgerir algo en el servidor',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};