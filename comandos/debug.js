const sqlite3 = require('sqlite3').verbose();
const ips = new sqlite3.Database("./ips.sqlite");
const dinero = new sqlite3.Database("./dinero.sqlite");


module.exports.run = async (client, message, args) => {
    let SQLSelectAll = "SELECT * FROM dinero";


    dinero.all(SQLSelectAll, (err, filas) => {
        if (err) return console.error(err.message)
        console.log(filas)
    });
}

let SQLSelectAll2 = "SELECT * FROM ips";


ips.all(SQLSelectAll2, (err, filas) => {
    if (err) return console.error(err.message)
    console.log(filas)
});

module.exports.config = {
    name: 'debug',
    displayName: 'debug',
    aliases: [],
    usage: 'debug',
    description: 'Hablar con el bot',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};