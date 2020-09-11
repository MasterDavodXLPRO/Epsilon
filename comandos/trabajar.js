const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./dinero.sqlite");
const talkedRecently = new Set();
const ms = require("ms");
let bost = 0

module.exports.run = async (client, message, args) => {
  
      if (talkedRecently.has(message.author.id)) {
        const DineroEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username)
        .setDescription("Estas muy cansado para trabajar. Espera 3h minimo para volver a trabajar.");
        message.channel.send(DineroEmbed);  
    } else {

   let value = Math.floor(Math.random() * 30) + 1;
  let id = message.author.id;

  let sentencia = `SELECT * FROM dinero WHERE idusuario = ${id}`;

  dinero.get(sentencia, (err, filas) => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    if (err) return console.error(err.message)
    if(!filas) {
          let insert2 = `INSERT INTO dinero(idusuario, dinero) VALUES(${id}, 0)`;
            
          dinero.run(insert2, async function(err) {
           if (err) return console.error(err.message);

           message.channel.send(":warning: || Creando DB Warns para este usuario. | Esto solo pasa con los usuarios que ya estaban en el servidor, a los nuevos se crea automaticamente.")
           await sleep(5000);
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-trabajar`");
        });
    }else{
    let update = `UPDATE dinero SET dinero = ${filas.dinero + value + bost} WHERE idusuario = ${id}`;

    dinero.run(update, function(err) {      
    if (err) return console.error(err.message)
    const DineroEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username)
        .setDescription("Has ganado "+value+" monedas");
    message.channel.send(DineroEmbed);  

    });
  
};

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
    }, 10800000);
    }
  
)}};

module.exports.config = {
    name: 'trabajar',
    displayName: 'trbajar',
    aliases: ['job'],
    usage: 'trabajar',
    description: 'Trabaja para ganar -dinero',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};