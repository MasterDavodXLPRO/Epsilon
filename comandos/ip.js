const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let texto = args.join(' ')
    let server = message.guild.id;
    let ip = "NetworkEnCreacion"

    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("¡Ip SinNombre Network!")
    .setTitle("**__Ip SinNombre Network__**")
    .addField("IP:", "`"+ip+"`")
    message.channel.send({embed: embedDatos})

};

module.exports.config = {
    name: 'ip',
    displayName: 'ip',
    aliases: ['serverip',],
    usage: 'ip',
    description: 'Ver la ip del servidor',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};