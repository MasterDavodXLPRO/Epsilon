const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./invites.sqlite");
const talkedRecently = new Set();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  let id = message.author.id;
  let value = args[1]

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
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-dinero`");
        });
    }else{
    let update = `UPDATE dinero SET dinero = ${filas.dinero+value} WHERE idusuario = ${id}`;

    dinero.run(update, function(err) {      
    if (err) return console.error(err.message)
    message.channel.send(message.author+'se te han añadido '+value+" monedas a tu cuenta. `-dinero`")

    });
    }
  
});
    }
  

module.exports.config = {
    name: 'giveinvites',
    displayName: 'giveinvites',
    aliases: ['gmonedas'],
    usage: 'giveinvites',
    description: 'Dar invites a un jugador si hay errores',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};