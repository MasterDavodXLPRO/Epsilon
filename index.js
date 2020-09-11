const http = require('http');
const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);
/*PARA USAR ESTE CODIGO ES NECESARIO ISTALAR LO SIGUIENTE:
File System: "npm install file-system --no-audit --save"
Mega-dtbs: "npm install mega-dtbs --no-aduit --save"
FFMPEG: "npm install ffmpeg-static --no-audit --save"
OPUS: "npm install opusscript --no-audit --save"
YTSEARH: "npm install youtube-search --no-audit --save"
YTDLCORE: "npm install ytdl-core --no-audit --save"

*/

const {FriendlyError, SQLiteProvider} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
const dba = new sqlite3.Database("./mybotdata.sqlite");
const prefixes = new sqlite3.Database("./prefixes.sqlite");
const ips = new sqlite3.Database("./ips.sqlite");
const warns = new sqlite3.Database("./warns.sqlite");
const dinero = new sqlite3.Database("./dinero.sqlite");
const ytdl = require('ytdl-core');
const search = require('youtube-search');


//NIVELES
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let server = message.guild.id;

    let prefix = config.prefix;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(message.content.startsWith(prefix)) return;
    let command = args.shift().toLowerCase();
        
    //EMPIEZA NIVELES XDDDDDDDDDDD
/*    let id = message.author.id;
    let sentencia = `SELECT * FROM usuarios WHERE idusuario = ${id}`;
        
            
    dba.get(sentencia, (err, filas) => {
        if (err) return console.error(err.message)
        if (!filas){
            let insert = `INSERT INTO usuarios(idusuario, nivel, exp) VALUES(${id}, 0, 1)`;
        
            dba.run(insert, function(err) {
            if (err) return console.error(err.message)
            });
            
        } else {
        
        let expactual = `SELECT * FROM usuarios WHERE idusuario = ${id}`;
        //<-- UPDATE EXPERIENCIA/NIVELES -->
                  
            dba.get(expactual, (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas){
            let insert = `INSERT INTO usuarios(idusuario, nivel, exp) VALUES(${id}, 0, 1)`;
            }
        });
        
            let curLevel = Math.floor(Math.random() * 30) + 1;
            console.log(curLevel);
            let nxlvl = 5 * (filas.nivel ** 2) + 50 * filas.nivel + 100;
        
            if(filas.exp >= nxlvl) {
            let update = `UPDATE usuarios SET exp = 0, nivel = ${filas.nivel + 1} WHERE idusuario = ${id}`;
            
                dba.run(update, function(err) {      
                if (err) return console.error(err.message)
                    let canalniveles = client.channels.get(config.canalniveles);
        
                    const embedDatos = new Discord.RichEmbed() 
                      .setColor("RANDOM")
                      .setFooter(message.author.tag+" a subido de nivel")
                      .setTitle("**__¡Muy Bien!__**")
                      .setThumbnail(message.author.displayAvatarURL)
                      .setDescription("<@!"+message.author.id+">! has logrado subir al nivel: **"+filas.nivel+"**")
                      canalniveles.send({embed: embedDatos})
                    });
                  }else{
                    let update = `UPDATE usuarios SET exp = ${filas.exp + curLevel} WHERE idusuario = ${id}`;
                    dba.run(update, function(err) {      
                      if (err) return console.error(err.message)
                    })
                  }
        }}); */
    });
    
    //ACABA NIVELES XDDDDDDDDDDDDD  


//TERMINA BASES DE DATOS QLITE XDDDDDD

//AL BOT ACTIVARSE
const invites = {};
// A pretty useful method to create a delay without blocking the whole script.


client.on("ready", () => {
  console.log('Listo para trabajar')
  client.user.setActivity("-ayuda | Bot de ArdiCraft y Urtzintxa | by MasterDavodXL")

  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });

 let crear = "CREATE TABLE IF NOT EXISTS usuarios (idusuario TEXT, nivel INTEGER, exp INTEGER)";

dba.run(crear, function(err) {
    if (err) return console.error(err.message)
})

let crear2 = "CREATE TABLE IF NOT EXISTS ips (idserver TEXT, ip TEXT, prefix BLOB)";

ips.run(crear2, function(err) {
    if (err) return console.error(err.message)
})

let crear3 = "CREATE TABLE IF NOT EXISTS warns (idusuario TEXT, avisos INTEGER)";

warns.run(crear3, function(err) {
    if (err) return console.error(err.message)
})
  
let crear4 = "CREATE TABLE IF NOT EXISTS dinero (idusuario TEXT, dinero INTEGER)";

dinero.run(crear4, function(err) {
    if (err) return console.error(err.message)
})

client.queue = new Map();
  
  
});
//USUARIO ENTRA SERVER

client.on("guildMemberAdd", async miembro =>{
     if (config.msgbienvenidas == "true") {
    
  
      let canal = client.channels.get(config.canalbienvenidas);
        const embedDatos = new Discord.RichEmbed() 
        .setColor(0x00AE86)
        .setFooter("Bienvenida")
        .setTitle("**__Nuevo Usuario__**")
        .setDescription("<@!"+miembro.id+">" + config.msgbienvenidap)
        canal.send({ embed: embedDatos });
        
        let id = miembro.id;

 let crear = "CREATE TABLE IF NOT EXISTS usuarios (idusuario TEXT, nivel INTEGER, exp INTEGER)";

dba.run(crear, function(err) {
    if (err) return console.error(err.message)
})

let crear2 = "CREATE TABLE IF NOT EXISTS ips (idserver TEXT, ip TEXT, prefix BLOB)";

ips.run(crear2, function(err) {
    if (err) return console.error(err.message)
})

let crear3 = "CREATE TABLE IF NOT EXISTS warns (idusuario TEXT, avisos INTEGER)";

warns.run(crear3, function(err) {
    if (err) return console.error(err.message)
})
  
let crear4 = "CREATE TABLE IF NOT EXISTS dinero (idusuario TEXT, dinero INTEGER)";

dinero.run(crear4, function(err) {
    if (err) return console.error(err.message)
})


        let insertar = `INSERT INTO usuarios(idusuario, nivel, exp) VALUES(${id}, 1, 1)`;

        dba.run(insertar, (err, filas) => {
          if (err) return console.error(err.message)
        });

        let insert = `INSERT INTO warns(idusuario, avisos) VALUES(${id}, 0)`;
            
        warns.run(insert, async function(err) {
         if (err) return console.error(err.message);
        }); 
        
        let insertar2 = `INSERT INTO dinero(idusuario, dinero) VALUES(${id}, 0)`;

        dinero.run(insertar2, (err, filas) => {
          if (err) return console.error(err.message)
        });
            }
});

//USUARIO SALE SERVER

client.on("guildMemberRemove", miembro =>{
    if (config.msgsalidas == "true") {
        let canal = client.channels.get(config.canalsalidas);
        const embedDatos = new Discord.RichEmbed() 
        .setColor(0x00AE86)
        .setFooter("Salidas")
        .setTitle("**__Un Usuario Menos__**")
        .setDescription("<@!"+miembro.id+">" + config.msgsalidasp)
        canal.send({ embed: embedDatos });
}})









    //AL ELIMINAR UN MENSAJE
    
    client.on("messageDelete", (message) => {
        
        if(message.member.hasPermission("ADMINISTRATOR")) return;
        let canal = client.channels.get(config.canallogs); 
        const embedDatos = new Discord.RichEmbed() 
        .setColor(0x00AE86)
        .setFooter("Mensaje Eliminado")
        .setTitle("**__Mensaje Eliminado__**")
        .addField("Autor del Mensaje", "<@!"+message.author.id+">")
        .addField("Contenido del Mensaje", message)
        canal.send({ embed: embedDatos }); 
    });
    
    //AL ACTUALIZAR UN MENSAJE
    
    client.on('channelUpdate', (oldChannel, newChannel) => {
        if(!oldChannel.guild) return;
      
        oldChannel.guild.fetchAuditLogs().then(logs => { 
           let userID = logs.entries.first().executor.id;

           if(oldChannel.name !== newChannel.name) {
      
            let msgName = new Discord.RichEmbed()
            .setTitle('**__Canal Alterado__**')
            .setColor(0x00AE86)
            .addField("Autor de la Edición","<@!"+userID+">")
            .addField("Nombre Anterior", "`"+oldChannel.name+"`")
            .addField("Nombre Actual", "`"+newChannel.name+"`")
            .setTimestamp()
            .setFooter(oldChannel.guild.name)
            
            let channel = oldChannel.guild.channels.get(config.canallogs);
            channel.send(msgName);
           }
        })
      
      })





      client.commands = new Discord.Collection();
      client.aliases = new Discord.Collection();
      let pathCMD ='./comandos/';
      fs.readdir(pathCMD, (err, files) => {
          if (err) return console.log(err);
      
          let jsfiles = files.filter(f => f.split('.').pop() === 'js');
          if (jsfiles.length < 1) return console.log('commands are nah');
          else console.log(`loading ${jsfiles.length} commands man`);
      
          jsfiles.forEach((f, i) => {
              delete require.cache[require.resolve(pathCMD + f)];
              var pull = require(pathCMD + f);
              console.log(`man, i loaded ${f} (${i+1}/${jsfiles.length})`);
              client.commands.set(pull.config.name, pull);
              pull.config.aliases.forEach(alias => {
                  client.aliases.set(alias, pull.config.name);
              });
          });
      });









//EMPIEZA EL GUILD MENSAJES
const queue = new Map();


client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;

    let server = message.guild.id;

  const serverQueue = queue.get(message.guild.id);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  
  
  
  
  
  //ANTI LINKSSSSSSSSSSSSSSSSSSSS
      
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/'||'https')) { //if it contains an invite link
    message.delete() //delete the message
      .then(client.users.get(message.member.id).send(`:warning: || <@${message.author.id}> Tu mensaje a sido eliminado. Razón: No esta permitido enviar links en este servidors...`));
  }
  if(message.channel.id === '720041097916710983') {
    
  }else if (message.channel.id === '720041098973806703') {
    
  }else if (message.channel.id ==="721064730025918556") {
    
  }else if (message.channel.id ==="721862738460147853") {
    
  }else if (message.member.hasPermission("ADMINISTRATOR")){
    
    
  }else{
  if (message.content.includes("https://")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    client.users.get(message.member.id).send(`:warning: || <@${message.author.id}> Tu mensaje a sido eliminado. Razón: No esta permitido pasar links en este servidor...`)
  }
  if (message.content.includes("http://")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    client.users.get(message.member.id).send(`:warning: || <@${message.author.id}> Tu mensaje a sido eliminado. Razón: No esta permitido pasar links en este servidor...`)
  }
  if (message.content.includes("www.")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    client.users.get(message.member.id).send(`:warning: || <@${message.author.id}> Tu mensaje a sido eliminado. Razón: No esta permitido pasar links en este servidor...`)
  }
   
  }
  //ACABA ANTI LINKSSSSSSSSSSSSSS
  
    //DETECTAR PALABRAS MAL SONANTES
  
    let mensaje = message.content
    
    let words = ["cocaina","marihuana","xxx","porn","pornhub","poop","capullo","nazi","pto", "puto", "hdp", "toxico", "pta", "puta", "pelotudo", "boludo", "cabron", "gillipollas", "estupido","tocapelotas", "txco", "retrasado", "aborigen", "estupido", "transexual", "seudosimio", "gay", "maricon", "aborto", "pija", "pijo", "polla", "plla", "mendigo", "dildo", "masturbacion", "masturbate", "mtbate", "pajero", "pajera", "travesti", "seudopajero", "porno", "nopor", "pene", "nepe", "tontito", "tontita", "mierda", "proxoneta", "virgen", "virginidad", "alcoholico"] 

    //Esto buscara las palabras en un array creado con el mensaje
    if(words.some(p => message.content.toLowerCase().split(' ').includes(p.toLowerCase()))) { 


    // Esto eliminara el mensaje que contega la palabra censurada
    await message.delete();


    //Esto enviara un mensaje avisando al usuario que no utilize mas la palabra
    await client.users.get(message.member.id).send(`:warning: || <@${message.author.id}> Tu mensaje a sido eliminado. Razón: No uses ese tipo de palabras...`);
    
    let canallogs = client.channels.get(config.canallogs); 

    const embedDatosg = new Discord.RichEmbed() 
    .setColor(0x00AE86)
    .setFooter("Detector de palabras mal sonantes")
    .setTitle("**__Palabra Eliminada__**")
    .addField("Usuario del Mensaje", "<@!"+message.author.id+">")
    .addField("Mensaje", mensaje)
    .addField("Canal del Mensaje", "<#"+message.channel.id+">")
    await canallogs.send({ embed: embedDatosg }); 
}
    
  //ACABA DETECTION DE PALABRAS MAL SONANTES
  
    if(!message.content.startsWith(prefix)) return;
    
  

  
  
  
//EMPIEZA COMANDO AYUDA EMPIEZA COMANDO AYUDA
    if(command === 'ayuda'){
        
        if(!args.length) {
             const embedDatos = new Discord.RichEmbed() 
            embedDatos.setColor("RANDOM")
            embedDatos.setFooter("Ayuda general")
            embedDatos.setTitle("**----(- __Ayuda Urtzinxa_ Bot__ -)----**")
            embedDatos.addField(":pencil2: Prefijo", "El prefijo del bot es `-`")
            embedDatos.addField(":jigsaw: Categorias de Ayuda", "Para acceder a cualquiera de las siguientes categorias usa: `-ayuda {categoria}`\nCategorias: `users` `staff` `admins`")
            message.channel.send({ embed: embedDatos }); 
        }else
        if (args[0] === "admins"){
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<@!"+message.author.id+"> Tu no tienes permisos para ver esto."); {
            const embedDatos = new Discord.RichEmbed() 
            .setColor("RANDOM")
            .setFooter("Ayuda Administrativa")
            .setTitle("**----(- __Ayuda Admins Urtzinxa_ Bot__ -)----**")
            .addField(":wrench: Comandos", "`-decir {mensaje}`- Decir algo con el bot.\n`-config`- Verifica la config del bot.\n`-addrole {@usuario} {role}`-Añade un role a un usuario.\n`-removerole {@usuario} {role}`-Quitar un role a un usuario.\n`-sorteo {Se sortea}`-Empieza un sorteo en el servidor.\n`-setip {Ip}`-Cambia la ip del servidor.\n`-setprefix {prefix}`-Por ahora apagado\n`-unwarn {@usuario}`-Quita un aviso a un usuario.\n`-givemonedas`-Givearte monedas. Solo Tests\n'-actividad {actividad}'-Cambia la actividad del bot.")
            message.channel.send({ embed: embedDatos }); 
            }
            }else
        if (args[0] === "staff"){
           if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<@!"+message.author.id+"> Tu no tienes permisos para ver esto."); {
                const embedDatos = new Discord.RichEmbed() 
                .setColor("RANDOM")
                .setFooter("Ayuda Staff")
                .setTitle("**----(- __Ayuda Staff Urtzinxa_ Bot__ -)----**")
                .addField(":wrench: Comandos", "`-ban`- Banear a un usuario.\n`-Kick`-Kickear a un usuario.\n`-tempmute {@usuario} {tiempo} {razon}`-Mutea a un usuario temp.\n`-mute {@usuario} {razon}`-Mutea a un usuario.\n`-warn {@usuario} {razon}`-Avisa a un usuario.\n`-purge {cantidad}`-Elimina mensajes en masa.")
                message.channel.send({ embed: embedDatos }); 
                                        }
        }else
        if (args[0] === "users"){
            const embedDatos = new Discord.RichEmbed() 
            .setColor("RANDOM")
            .setFooter("Ayuda Usuarios")
            .setTitle("**----(- __Ayuda Users Urtzinxa_ Bot__ -)----**")
            .addField(":wrench: Comandos", "`-server`- Información del servidor.\n`-bot`-Información del Bot.\n`-crear {razon}`-Crea un ticket para soporte.\n`-sugerir {sugerencia}`-Sugiere algo al servidor.\n`-ip`-Mira la ip de la network.\n`-avatar`-Ver tu avatar.\n`-avatar {@user}`-Ver el avatar de alguien.\n`-online`-Mira cuanta gente hay online.")
            .addField(":wrench: Comandos Roleo", "`-dinero`-Mira tu dinero.\n`-dinero {@user}`-Ver dinero de otra persona.\n`-trabajar`-Trabaja para conseguir monedas.\n`-tienda`-Mira los roles en venta.\n`-comprar {@role}`-Compra un role en venta.")
            .addField(":wrench: Juegos", "`-buscaminas`-Juega al buscaminas.\n`-proximamente`-Muy pronto mas juegos.")
            .addField(":wrench: Minecraft", "`-skin {mcuser}`-Ver la skin de un user premium.\n`-ardicraft`-Mira el estado de ArdiCraft.")
            message.channel.send({ embed: embedDatos });
        }
    }else{
        client.commands = new Discord.Collection();
        client.aliases = new Discord.Collection();
        let pathCMD ='./comandos/';

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if(!message.content.startsWith(prefix)) return;

        if (message.author.bot) return;
    
        let messageArray = message.content.split(' ');
        let cmd = messageArray[0].substring(prefix.length).toLowerCase();



      var pull = require(pathCMD + cmd);
        client.commands.set(pull.config.name, pull);             

        if(!message.content.startsWith(prefix)) return;
        else console.log(`[CMD] ${message.author.tag} used ${cmd}`);
        let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

     if(message.content.includes("buscaminas")){
      if(message.channel.id === config.canaljuegos) {
          return commandfile.run(client, message, args);
      }else{
          return message.channel.send(":warning: || Solo puedes ejecutar este comando en: <#"+config.canaljuegos+">.");
      }
     }
      
    if(message.channel.id === config.canalcomandos) {
        if(message.member.hasPermission(pull.config.permission)) {
          if (commandfile) {
             return commandfile.run(client, message, args);
                   
                } 
        }else{
            return message.channel.send(":no_entry: || Tu no tienes permisos para usar esto.");
        } 
    }else if(message.member.hasPermission("MANAGE_MESSAGES")){
        if(message.member.hasPermission(pull.config.permission)) {
          if (commandfile) {
             return commandfile.run(client, message, args);
                   
                } 
        }else{
            return message.channel.send(":no_entry: || Tu no tienes permisos para usar esto.");
        }
      
          
    }else{
        return message.channel.send(":warning: || Solo puedes ejecutar comandos en: <#"+config.canalcomandos+">.");
    }
}});

client.login(config.token).catch();
console.error(err.message)