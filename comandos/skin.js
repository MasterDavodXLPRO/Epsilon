const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment")

module.exports.run = async (client, message, args) => {
    let text = args.slice(1).join(' ')
  
    if(!text) return message.channel.send("Debes escribir un usuario de minecraft `-skin {mcuser}`")
    let headURL = `https://minotar.net/armor/body/${text}`;
            
    const avatarEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(text)
        .setImage(headURL);
    message.channel.send(avatarEmbed);
}

module.exports.config = {
    name: 'skin',
    displayName: 'skin',
    aliases: [],
    usage: 'skin',
    description: 'Ver tu skin de minecraft.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};
