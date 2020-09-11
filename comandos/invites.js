const config = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {

        var user = null;
        user = message.author;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                    for(var i=0; i < userInvites.length; i++)
                    {
                        var invite = userInvites[i];
                        userInviteCount += invite['uses'];
                    }
                        message.reply(`Tu has invitado a ${userInviteCount} usuario(s) a este servidor.`)
            }
        )
}

module.exports.config = {
    name: 'invites',
    displayName: 'invites',
    aliases: ['invitaciones', 'invs'],
    usage: 'invites',
    description: 'Ver cuantos users has invitado a este servidor.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};