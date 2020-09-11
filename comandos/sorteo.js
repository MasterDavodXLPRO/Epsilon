const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const bot = new Discord.Client();
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.randomAmount = function (array, length) {
	let arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(array.random());
	}

	return arr;
};  
  
  
    let texto = args.slice(3).join(' ')
    let tiempo = args[1];
    let everyone = message.guild.roles.get(config.everyone);
    const winner_amount = args[2];
    
    if(!tiempo) return message.channel.send(":warning: || Debes escribir un tiempo. `-sorteo {tiempo} {numero de ganadores} {premio}`");
    if(!winner_amount) return message.channel.send(":warning: || Debes escribir un numero de ganadores. `-sorteo {tiempo} {numero de ganadores} {premio}`");
    if(!texto) return message.channel.send(":warning: || Debes escribir un premio. `-sorteo {tiempo} {numero de ganadores} {premio}`");
    let server = message.guild;
    let givewayschannel = client.channels.get(config.canalgiveways);
    const embedDatos = new Discord.RichEmbed() 
    .setColor("RANDOM")
    .setFooter("¡Nusvo Sorteo!")
    .setTitle("**__NUEVO SORTEO__**")
    .setDescription("Sorteos GibsonClub Network")
    .addField(" Información", " reacciona a este mensaje con: ❤️ para participar en el sorteo.")
    .addField("Se Sortea:", texto)
    .addField("Tiempo:", tiempo)
    .addField("Numero de Ganadores:", winner_amount)
    .addField("Operador del Sorteo", "<@!"+message.author.id+">")
    givewayschannel.send({embed: embedDatos}).then(embedMessage => {
        embedMessage.react("❤️");
    setTimeout(async function() {
      let canallogs = client.channels.get(config.canallogs);
      
    const c = message.guild.channels.get(config.canalgiveways);
    const m = await c.fetchMessage(embedMessage.id);
    const reactions = m.reactions;
    const reaction = reactions.first(); // This reaction would normally be the reaction a user would use to enter the giveaway
    const users = reaction.users.map(u => u.toString());
    if (winner_amount == 1) {
    	return c.send(`**${users.random()}** has won the giveaway!`); // this uses the Array.prototpe.random method below
    } else {
    	let winners;
    	const selected = Array.prototype.randomAmount(users, winner_amount); // this uses the Array.prototype.randomAmount method below

    	if (winner_amount === 2) winners = selected.join(' and ');
    	else winners = selected.join(', ');

        let givewayschannel = client.channels.get(config.canalgiveways);
        const embedDatosa = new Discord.RichEmbed() 
        .setColor("RANDOM")
        .setFooter("¡Un sorteo a Finalizado!")
        .setTitle("**__Sorteo Terminado__**")
        .setDescription("Sorteos Urtzinxa_ Discord")
        .addField(" Se Sorteaba:", texto)
        .addField("Ganador(es):", `${winners}`)
        .addField("Operador del Sorteo", "<@!"+message.author.id+">")
        givewayschannel.send({embed: embedDatosa})
    }  
           
    }, ms(tiempo));
    });
  
}

module.exports.config = {
    name: 'sorteo',
    displayName: 'sorteo',
    aliases: ['giveway'],
    usage: 'sorteo',
    description: 'Empezar un Sorteo',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};