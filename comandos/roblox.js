const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let texto = args.join(' ')
    let server = message.guild.id;
    let ip = "NetworkEnCreacion"

    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("¡Mi perfil de Roblox!")
    .setTitle("**__Mi perdil de Roblox__**")
    .addField("PERFIL:", "`https://www.roblox.com/users/182591054/profile`")
    message.channel.send({embed: embedDatos})

};

module.exports.config = {
    name: 'roblox',
    displayName: 'roblox',
    aliases: ['rbx',],
    usage: 'roblox',
    description: 'Ver perfil de urtzinxa en roblox',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};