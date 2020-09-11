const sqlite3 = require('sqlite3').verbose();
const dba = new sqlite3.Database("./mybotdata.sqlite");
const warns = new sqlite3.Database("./warns.sqlite");


module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Debes mencionar a un usuario. `-unwarn {@usuario}`")
    const warnedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );

    let sentencia = `SELECT * FROM warns WHERE idusuario = ${warnedUser.id}`;

    warns.get(sentencia, async (err, filas) => {
        if (err) return console.error(err.message)
        if(filas) {
            let updatea = `UPDATE warns SET avisos = ${filas.avisos - 1} WHERE idusuario = ${warnedUser.id}`
            warns.run(updatea, async function(err) {      
              if (err) return console.error(err.message)
              message.channel.send("Se ha eliminado uno de los warns de <@!"+warnedUser.id+">")
            })
        }
    })};

module.exports.config = {
    name: 'unwarn',
    displayName: 'unwarn',
    aliases: [],
    usage: 'unwarn',
    description: 'Quitar un warn a un usuario.',
    permission: 'KICK_MEMBERS',
    type: 'utility'
};