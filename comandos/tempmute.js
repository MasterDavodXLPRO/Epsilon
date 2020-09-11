const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Debes mencionar a un usuario y una razón. `-tempmute {@usuario} {tiempo, ej: 1m, 1d, 1w} {Razon}`")
    if(!args[1]) return message.channel.send("Debes escribir una razon. `-tempmute {@usuario} {tiempo, ej: 30m, 1d, 1w} {Razon}`")
    let operador = message.author.id;
    const miembroMute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if(args[2] == "30m") {
        setTimeout(function() {
            let canallogs = client.channels.get(config.canallogs);

            miembroMute.removeRole(muteRole.id);
            canallogs.send(`¡El usuario ${miembroMute} a sido desmuteado despues del warn mute!`);
        }, 1800000);
    }else
    if(args[2] == "1d") {
    setTimeout(function() {
        let canallogs = client.channels.get(config.canallogs);

        miembroMute.removeRole(muteRole.id);
        canallogs.send(`¡El usuario ${miembroMute} a sido desmuteado despues del warn mute!`);
    }, 86400000);
    }else
    if(args[2] == "1w") {
        setTimeout(function() {
            let canallogs = client.channels.get(config.canallogs);

            miembroMute.removeRole(muteRole.id);
            canallogs.send(`¡El usuario ${miembroMute} a sido desmuteado despues del warn mute!`);
        }, 604800017);
    }else{
       return message.channel.send(":warning: || Por ahora solo tenemos para, 30m(30 minutos), 1d(1 dia), 1w(1 semana)");

    }

    let reason = args.slice(3).join(' ')
    const muteRole = message.guild.roles.find(x => x.name === "muted");
    if (!muteRole) message.guild.createRole("name", "muted");


    await miembroMute.addRole(muteRole.id);
    message.channel.send(`${miembroMute} a sido muteado por `+args[2]+` (razon: ${reason})`);
    let canallogs = client.channels.get(config.canallogs); 
    
    const embedDatos = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Un miembro a sido muteado")
    .setTitle("**__Un Miembro Muteado__**")
    .addField("Usuario Muteado", "<@!"+miembroMute.id+">")
    .addField("Razon del Muteo", reason)
    .addField("Operador|Staff que Muteo", "<@!"+operador+">")
    canallogs.send({ embed: embedDatos }); 

    let user = client.users.get(miembroMute.id);

    const embedDatos2 = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Has sido muteado")
    .setTitle("**__Has sido Muteado__**")
    .addField("Razon del Muteo", reason)
    .addField("Tiempo del Mute", args[2])
    .addField("Operador|Staff que Muteo", "<@!"+operador+">") 
    user.send({ embed: embedDatos2 });
}

module.exports.config = {
    name: 'tempmute',
    displayName: 'tempmute',
    aliases: ["mutetemp", "mutetemporal"],
    usage: 'tempmute',
    description: 'Mutear a un usuario temporalmente.',
    permission: 'MUTE_MEMBERS',
    type: 'utility'
};