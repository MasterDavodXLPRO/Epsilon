const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(user.username)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
}

module.exports.config = {
    name: 'avatar',
    displayName: 'avatar',
    aliases: [],
    usage: 'avatar',
    description: 'Ver tu avatar o el de otro.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};

