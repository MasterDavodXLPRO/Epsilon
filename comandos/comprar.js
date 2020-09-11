const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./dinero.sqlite");
const talkedRecently = new Set();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
      let rango = args[1]
      
      if(!rango) return message.channel.send("Debes escribir un role para comprar. `-comprar {@role}`\nPuedes ver los roles en `-tienda`")
  
  //ROLE 11111111111111111111111111111111111111111111111111111111111
      
      if(args[1] === "<@&721509987410772018>") {
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
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-dinero`");
        });
    }else{
      
    
    if(filas.dinero >= "1000")  {
    let update = `UPDATE dinero SET dinero = ${filas.dinero - 1000} WHERE idusuario = ${id}`;

    dinero.run(update, async function(err) {      
    if (err) return console.error(err.message)
    await message.member.addRole("721509987410772018");
    message.channel.send("Has comprado <@&721509987410772018> por 1000 monedas.")
    }); 
    }else{
      message.channel.send(message.author+" no tienes monedas suficientes para comprar este role.")
    }
    }
  
}); 
        //ROLE 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        
      }else if(args[1] === "<@&721510253338034208>") {
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
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-dinero`");
        });
    }else{
    
    if(filas.dinero >= "100000")  {
    let update = `UPDATE dinero SET dinero = ${filas.dinero - 100000} WHERE idusuario = ${id}`;

    dinero.run(update, async function(err) {      
    if (err) return console.error(err.message)
    await message.member.addRole("721510253338034208");
    message.channel.send("Has comprado <@&721510253338034208> por 100000 monedas.")
    }); 
    }else{
      message.channel.send(message.author+" no tienes monedas suficientes para comprar este role.")
    }
    }
  
}); 
        
        //ROLE 3333333333333333333333333333333333333333333333333333333333333333333333333333333333
        
      }else if(args[1] === "<@&721510487161962506>") {
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
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-dinero`");
        });
    }else{
    
    if(filas.dinero >= "1000000")  {
    let update = `UPDATE dinero SET dinero = ${filas.dinero - 1000000} WHERE idusuario = ${id}`;

    dinero.run(update, async function(err) {      
    if (err) return console.error(err.message)
    await message.member.addRole("721510487161962506");
    message.channel.send("Has comprado <@&721510487161962506> por 1000000 monedas.")
    }); 
    }else{
      message.channel.send(message.author+" no tienes monedas suficientes para comprar este role.")
    }
    }
  
}); 
      }else{
        message.channel.send("Por ahora no contamos con ese role en venta. Usa `-tienda` para ver los roles en venta.")
      }
  
    

    }

module.exports.config = {
    name: 'comprar',
    displayName: 'comprar',
    aliases: ['buy'],
    usage: 'comprar',
    description: 'Comprar con -dinero',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};