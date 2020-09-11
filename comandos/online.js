const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  
message.guild.members.fetch().then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
  
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(user.username)
        .setDescription("Tenemos "+totalOnline.size+" usuarios online ahora mismo.")
    message.channel.send(avatarEmbed);
});
}

module.exports.config = {
    name: 'online',
    displayName: 'online',
    aliases: [],
    usage: 'online',
    description: 'Ver gente online en el discord.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};
