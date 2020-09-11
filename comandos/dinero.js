const config = require("../config.json");
const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const dinero = new sqlite3.Database("./dinero.sqlite");

module.exports.run = async (client, message, args) => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  const user = message.mentions.users.first() || message.author;
  let id = message.author.id;
  let SQLSelect = `SELECT * FROM dinero WHERE idusuario = ${user.id}`;

  dinero.get(SQLSelect, (err, filas) => {
    if (err) return console.error(err.message)
    if (!filas) {
          let insert2 = `INSERT INTO dinero(idusuario, dinero) VALUES(${id}, 0)`;
            
          dinero.run(insert2, async function(err) {
           if (err) return console.error(err.message);

           message.channel.send(":warning: || Creando DB Warns para este usuario. | Esto solo pasa con los usuarios que ya estaban en el servidor, a los nuevos se crea automaticamente.")
           await sleep(5000);
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-dinero`");
        });
    }else {
    const DineroEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(user.username)
        .setDescription(filas.dinero+" monedas");
    message.channel.send(DineroEmbed);    
    }

  console.log(filas)
})

}

module.exports.config = {
    name: 'dinero',
    displayName: 'dinero',
    aliases: ['money'],
    usage: 'dinero',
    description: 'Mira tu dinero.',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};

