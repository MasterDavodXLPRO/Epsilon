const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    let operador = message.author.id;
    if(!args[0]) return message.channel.send("Debes mencionar a un usuario y una razón. `-mute {@usuario} {Razon}`")
    if(!args[1]) return message.channel.send("Debes escribir una razon. `-mute {@usuario} {Razon}`")
    const miembroMute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );
    let reason = args.slice(2).join(' ')
    const muteRole = message.guild.roles.find(x => x.name === "muted");
    if (!muteRole) message.guild.createRole("name", "muted");
    
    await miembroMute.addRole(muteRole.id);
    message.channel.send(`${miembroMute} a sido muteado permanentemente. (razon: ${reason})`);
    let canallogs = client.channels.get(config.canallogs); 

    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Un miembro a sido muteado")
    .setTitle("**__Un Miembro Muteado__**")
    .addField("Usuario Muteado", "<@!"+miembroMute.id+">")
    .addField("Razon del Muteo", reason)
    .addField("Operador|Staff que Muteo", "<@!"+operador+">")
    canallogs.send({ embed: embedDatos }); 

    const embedDatos2 = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Has sido muteado")
    .setTitle("**__Has sido Muteado__**")
    .addField("Razon del Muteo", reason)
    .addField("Tiempo del Mute", args[1])
    .addField("Operador|Staff que Muteo", "<@!"+operador+">") 
    client.users.get(miembroMute.id).send({ embed: embedDatos2 });

}
module.exports.config = {
    name: 'mute',
    displayName: 'mute',
    aliases: ["mutear", "muteperma"],
    usage: 'mute',
    description: 'Mutear a un usuario',
    permission: 'MUTE_MEMBERS',
    type: 'utility'
};