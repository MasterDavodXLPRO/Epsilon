const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const bot = new Discord.Client();

module.exports.run = async (client, message, args) => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    var server = message.guild;
    let texto = args.slice(1).join(' ')
    if(!texto) return message.channel.send(":warning: || Escribe una razon para el ticket. `-crear {razon}`") 
    var name = message.author.username
    var namep = message.author.id

    if(message.guild.channels.find(c => c.name == name && c.type == "text")) return;
    server.createChannel(name, { reason: texto })
    .then(async channel => {
      message.channel.send(":warning: || Creando Ticket..")
      let category = message.guild.channels.find(c => c.name == "TICKETS" && c.type == "category");
      channel.setParent(category.id);

      channel.overwritePermissions(channel.guild.roles.get(config.everyone), { VIEW_CHANNEL: false });
      channel.overwritePermissions(message.author, { VIEW_CHANNEL: true });
      channel.overwritePermissions(channel.guild.roles.get(config.helpers), { VIEW_CHANNEL: true });
      channel.overwritePermissions(channel.guild.roles.get(config.mods), { VIEW_CHANNEL: true });
      channel.overwritePermissions(channel.guild.roles.get(config.soporte), { VIEW_CHANNEL: true });

      const embedDatos = new Discord.RichEmbed() 
      .setColor(0x00AE86)
      .setFooter("Info del Bot")
      .setTitle("**----(- __Soporte Urtzinxa_ Discord -)----**")
      .addField("Crador del Ticket", "<@!"+namep+">")
      .addField("Razon", texto)
      .addField("Informacion", "`Mientras esperas a que un staff vea el ticket, por favor escribe tu problema a continuación.`")
     channel.send({ embed: embedDatos }); 

    await sleep(3000)
    message.channel.send(":warning: || Ticket creado correctamente.")
})};

module.exports.config = {
    name: 'crear',
    displayName: 'crear',
    aliases: ["create", "ticket"],
    usage: 'crear',
    description: 'Crear un ticket de ayuda/soporte',
    permission: 'SEND_MESSAGES',
    type: 'utility'
};