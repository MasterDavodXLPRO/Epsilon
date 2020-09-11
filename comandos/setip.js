const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const ips = new sqlite3.Database("./ips.sqlite");

module.exports.run = async (client, message, args) => {
    let server = message.guild.id;
    let texto = args.join(' ')
    let ipdefault = "Undefinida";
    let prefixdefault = "-";
    if(!texto) return message.channel.send("Debes escribir una ip sin espacios.")
    //si no existe la tabla:

    let sentencia = `SELECT * FROM ips WHERE idserver = ${server}`;

    ips.get(sentencia, async (err, filas) => {
    if(!filas) {
        let insert = `INSERT INTO ips(idserver, ip, prefix) VALUES(${server}, ${ipdefault}, ${prefixdefault})`;
            
        ips.run(insert, async function(err) {
         if (err) return console.error(err.message);

         message.channel.send(":warning: || Creando DB para el servidor..")
         await sleep(5000);
         return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-setip {Ip} `");
      });
    
    }else{
        let updatea = `UPDATE ips SET ip = ${texto} WHERE idserver = ${server}`;
    
        ips.run(updatea, function(err) {      
         if (err) return console.error(err.message)
         let canallogs = client.channels.cache.get(config.canallogs);
    
         const embedDatos = new Discord.RichEmbed() 
         .setColor(0x00AE86)
         .setFooter("¡Ip Urtzinxa_ Network!")
         .setTitle("**__CAMBIO DE IP__**")
         .setDescription("Se ha cambiado la ip para el comando -ip")
         .addField("Nueva Ip:", texto)
         .addField("Operador del Cambio", "<@!"+message.author.id+">")
         canallogs.send({embed: embedDatos})
         });
    }
})};
  
module.exports.config = {
    name: 'setip',
    displayName: 'setip',
    aliases: ['changeip',],
    usage: 'setip',
    description: 'Cambiar la ip del server',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};