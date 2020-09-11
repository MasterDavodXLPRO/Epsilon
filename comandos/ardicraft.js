const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment")
const request = require("request")

module.exports.run = async (client, message, args) => {
    let text = args.slice(1).join(' ')
  
    let pingURL = `https://api.minetools.eu/ping/play.ardicraft.es`;
    let iconURL = `https://api.minetools.eu/ping/play.ardicraft.es`;
  
    request(pingURL, function(err, resp, body) {
        body = JSON.parse(body)
        if(body.error) return message.channel.send("El servidor ArdiCraft esta cerrado.")
      let descReplace = /§\w/g;
      const avatarEmbed = new Discord.RichEmbed()
        .setTitle("ArdiCraft Network")
        .setColor("RANDOM")
        .setFooter("Informacion de ArdiCraft")
        .addField("Descripcion:",body.description.replace(descReplace, ""))
        .addField("Jugadores:",body.players.online+"/"+body.players.max)
        .addField("Version:",body.version.name)
      message.channel.send(avatarEmbed);
    })
}

module.exports.config = {
    name: 'ardicraft',
    displayName: 'ardicraft',
    aliases: [],
    usage: 'ardicraft',
    description: 'Ver estado del servidor ardicraft.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};
