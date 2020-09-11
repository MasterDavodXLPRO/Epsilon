const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const bot = new Discord.Client();

module.exports.run = async (client, message, args) => {
        let messageID = args[0];
        client.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send("Success! Giveaway rerolled!");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    }

module.exports.config = {
    name: 'nuevoganador',
    displayName: 'nuevoganador',
    aliases: ['reroll', "resorteo"],
    usage: 'nuevoagnador',
    description: 'Elije otro ganador aleatorio en un sorteo',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};