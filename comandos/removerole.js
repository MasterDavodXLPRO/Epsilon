const config = require("../config.json");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let miembro = message.mentions.members.first();
    let nombrerol = args.slice(1).join(' ');
    let roled = message.guild.roles.get(config.roledefault)
    
    let role = message.guild.roles.find(r => r.name === nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES");
    
    if(!perms) return message.channel.send("No tienes permisos suficientes, para remover roles.");
    if(!miembro) return message.reply('Debe mencionar a un miembro.');
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover.');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.removeRole(role).catch(console.error);
    miembro.addRole(roled).catch(console.error);
    message.channel.send(`El rol **${role.name}** fue removido de **${miembro.user.username}**.`);
}      

module.exports.config = {
    name: 'removerole',
    displayName: 'quitarrole',
    aliases: ['changerole', 'quitarrole'],
    usage: 'removerole',
    description: 'Quitar role a un usuario y añadirle el default',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};