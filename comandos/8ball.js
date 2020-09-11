const config = require("../config.json");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
let rpts = ["Sí", "No", "Tal vez", "No sé", "¡Claro!", "Es posible", "Soy un bot no estoy programado para esa respuesta", "Me da pena pero yo diria que NO", "Eso es mas complicado que calculasa la raíz cuadrada de 0"]

if (!args) return message.reply(`:warning: || Debes escribir una pregunta.`)
let usuario = message.member.user
message.channel.send(usuario +' a su pregunta `'+args+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');
}     

module.exports.config = {
    name: '8ball',
    displayName: '8ball',
    aliases: ['pregunta', '8balls'],
    usage: '8ball',
    description: 'Pregunta algo al bot.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};