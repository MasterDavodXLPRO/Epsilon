const config = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {
    const inviteuser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );
  
        var user = null;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === inviteuser.id);
                var userInviteCount = 0;
                    for(var i=0; i < userInvites.length; i++)
                    {
                        var invite = userInvites[i];
                        userInviteCount += invite['uses'];
                    }
                        message.reply(`<@!`+inviteuser.id+`> a invitado ${userInviteCount} usuario(s) a este servidor.`)
            }
        )
}

module.exports.config = {
    name: 'getinvites',
    displayName: 'getinvites',
    aliases: ['userinvites', 'userinvs'],
    usage: 'getinvites',
    description: 'Ver cuantos users a invitado un jugador.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};