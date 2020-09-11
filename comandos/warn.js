const {MessageEmbed} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const sqlite3 = require('sqlite3').verbose();
const warns = new sqlite3.Database("./warns.sqlite");

module.exports.run = async (client, message, args) => {
    let reason = args.slice(2).join(' ')
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const muteRole = message.guild.roles.find(x => x.name === "muted");
    if (!muteRole) return message.channel.send(":warning: || Un administrador de este servidor debe crear un Role llamado muted.");
    if(!args[0]) return message.channel.send("Debes mencionar a un usuario y una razón. `-warn {@usuario} {Razon}`")
    if(!args[2]) return message.channel.send("Debes escribir una razon. `-warn {@usuario} {Razon}`")
    const warnedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!warnedUser) return message.channel.send("El usuario mencionado no existe.");

    let id = warnedUser.id;

    let sentencia = `SELECT * 
    FROM warns WHERE idusuario = ${id}`;

    warns.get(sentencia, async (err, filas) => {
        if (err) return console.error(err.message)
        if (!filas){
          let insert = `INSERT INTO warns(idusuario, avisos) VALUES(${id}, 0)`;
            
          warns.run(insert, async function(err) {
           if (err) return console.error(err.message);

           message.channel.send(":warning: || Creando DB Warns para este usuario. | Esto solo pasa con los usuarios que ya estaban en el servidor, a los nuevos se crea automaticamente.")
           await sleep(5000);
           return message.channel.send(":warning: || Base de datos creada, por favor repita el comando. `-warn {@usuario} {razon}`");
        });

        } else {
    
        const warnToAdd = 1;
        const warnToDel = 5;
    
        let userWarnings = filas.avisos;
    
        let updatea = `UPDATE warns SET avisos = ${filas.avisos + warnToAdd} WHERE idusuario = ${id}`;
        warns.run(updatea, async function(err) {      
          if (err) return console.error(err.message)

          if (userWarnings == 0) {

            message.channel.send(`${warnedUser}, a sido avisado. (razon: ${reason})`);
            let canallogs = client.channels.get(config.canallogs); 
            
            const embedDatos = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setFooter("Un miembro a sido avisado")
            .setTitle("**__Un Miembro Avisado__**")
            .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
            .addField("Razon del Aviso", reason)
            .addField("Avisos del Usuario", userWarnings + 1)
            .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
            canallogs.send({ embed: embedDatos });
    
            const embedDatos2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("Has sido avisado")
            .setTitle("**__Avisado en GibsonClub Network (Discord)__**")
            .addField("Razon del Aviso:", reason)
            .addField("Tus avisos totales:", userWarnings + 1)
            .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
            client.users.get(warnedUser.id).send({ embed: embedDatos2 });
            
            //EMPIEZA WARN 111111111111111111111111111111111111111

           }else if (userWarnings == 1) {

               message.channel.send(`${warnedUser}, a sido avisado. (razon: ${reason})`);
               let canallogs = client.channels.get(config.canallogs); 
       
               const embedDatos = new Discord.RichEmbed() 
               .setColor(0x00AE86)
               .setFooter("Un miembro a sido avisado")
               .setTitle("**__Un Miembro Avisado__**")
               .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
               .addField("Razon del Aviso", reason)
               .addField("Avisos del Usuario", userWarnings + 1)
               .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
               canallogs.send({ embed: embedDatos });
       
               const embedDatos2 = new Discord.RichEmbed()
               .setColor(0x00AE86)
               .setFooter("Has sido avisado")
               .setTitle("**__Avisado en Urtzinxa_ (Discord)__**")
               .addField("Razon del Aviso:", reason)
               .addField("Tus avisos totales:", userWarnings + 1)
               .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
               client.users.get(warnedUser.id).send({ embed: embedDatos2 });
      
            //EMPIEZA WARN 222222222222222222222222222222


          } else if (userWarnings == 2) {


            message.channel.send(`${warnedUser}, a sido avisado y muteado por 1h. (razon: ${reason})`);
            let canallogs = client.channels.get(config.canallogs); 
    
            const embedDatos = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setFooter("Un miembro a sido avisado")
            .setTitle("**__Un Miembro Avisado__**")
            .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
            .addField("Razon del Aviso", reason)
            .addField("Avisos del Usuario", userWarnings + 1)
            .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
            canallogs.send({ embed: embedDatos }); 
    
            const embedDatos2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("Has sido avisado")
            .setTitle("**__Avisado en Urtzinxa_ (Discord)__**")
            .addField("Razon del Aviso:", reason)
            .addField("Tus avisos totales:", userWarnings + 1)
            .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
            .addField("Informacion:", "Has sido muteado 1h en el servidor de Urtzinxa_(Discord) por llegar a 3 avisos.")
            client.users.get(warnedUser.id).send({ embed: embedDatos2 });

            await warnedUser.addRole(muteRole.id).catch(console.error);
    
            const embedDatos3 = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setFooter("Un miembro a sido muteado")
            .setTitle("**__Un Miembro Muteado__**")
            .addField("Usuario Muteado", "<@!"+warnedUser.id+">")
            .addField("Razon del Muteo", reason)
            .addField("Avisos del Usuario", userWarnings + 1)
            .addField("Operador|Staff que Muteo", "@Sistema Automatico")
            canallogs.send({ embed: embedDatos3 });
    
            setTimeout(function() {
                let canallogs = client.channels.get(config.canallogs);
        
                warnedUser.removeRole(muteRole.id).catch(console.error)
                canallogs.send(`¡El usuario ${warnedUser} a sido desmuteado despues del warn mute de 1h!`);
            }, 3600000);
  
            //3600000
          //EMPIEZA WARN 333333333333333333333333333333333333333333
  
      
          } else if (userWarnings == 3) {
            const muteRole = message.guild.roles.find(x => x.name === "muted");

            message.channel.send(`${warnedUser}, a sido avisado y muteado por 1d. (razon: ${reason})`);
            let canallogs = client.channels.get(config.canallogs); 


            const embedDatos = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setFooter("Un miembro a sido avisado")
            .setTitle("**__Un Miembro Avisado__**")
            .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
            .addField("Razon del Aviso", reason)
            .addField("Avisos del Usuario", userWarnings + 1)
            .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
            canallogs.send({ embed: embedDatos }); 

            const embedDatos2 = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("Has sido avisado")
            .setTitle("**__Avisado en Urtzinxa_ (Discord)__**")
            .addField("Razon del Aviso:", reason)
            .addField("Tus avisos totales:", userWarnings + 1)
            .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
            .addField("Informacion:", "Has sido muteado 1d en el servidor de Urtzinxa_(Discord) por llegar a 4 avisos.")
            client.users.get(warnedUser.id).send({ embed: embedDatos2 });

            const embedDatos3 = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setFooter("Un miembro a sido muteado")
            .setTitle("**__Un Miembro Muteado__**")
            .addField("Usuario Muteado", "<@!"+warnedUser.id+">")
            .addField("Razon del Muteo", reason)
            .addField("Avisos del Usuario", userWarnings + 1)
            .addField("Operador|Staff que Muteo", "@Sistema Automatico")
            canallogs.send({ embed: embedDatos3 });

            setTimeout(function() {
                let canallogs = client.channels.get(config.canallogs);

                warnedUser.removeRole(muteRole.id).catch(console.error)
                canallogs.send(`¡El usuario ${warnedUser} a sido desmuteado despues del warn mute de 1d!`);
            }, 86400000);

            await warnedUser.addRole(muteRole.id).catch(console.error);

            client.users.get(warnedUser.id).send(`:warning: ¡Atención ${warnedUser}, al quinto warn seras kickeado y al sexo baneado!`);

      
  
              //EMPIEZA WARN 444444444444444444444444444444444444444
  
  
              } else if (userWarnings == 4) {
                let canallogs = client.channels.get(config.canallogs); 
      
                const embedDatos = new Discord.RichEmbed() 
                .setColor(0x00AE86)
                .setFooter("Un miembro a sido avisado")
                .setTitle("**__Un Miembro Avisado__**")
                .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
                .addField("Razon del Aviso", reason)
                .addField("Avisos del Usuario", userWarnings + 1)
                .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
                canallogs.send({ embed: embedDatos }); 
    
                const embedDatos2 = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setFooter("Has sido avisado")
                .setTitle("**__Avisado en Urtzinxa_(Discord)__**")
                .addField("Razon del Aviso:", reason)
                .addField("Tus avisos totales:", userWarnings + 1)
                .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
                .addField("Informacion:", "Has sido kickeado en el servidor de Urtzinxa_(Discord) por llegar a 5 avisos.")
                client.users.get(warnedUser.id).send({ embed: embedDatos2 });
    
                message.channel.send(`¡${warnedUser}, a sido avisado por 5 vez! el usuario a sido kickeado. (raison: ${reason})`);
                warnedUser.kick(reason);
                const embedDatos3 = new Discord.RichEmbed() 
                .setColor(0x00AE86)
                .setFooter("Kickeo de usuario")
                .setTitle("**__Kickeo__**")
                .addField("Usuario Kickeado", "<@!"+warnedUser.id+">")
                .addField("Razon del Kickeo", "Ha llegado a 5 avisos.")
                .addField("Avisos del Usuario", userWarnings + 1)
                .addField("Operador|Staff que Kickeo", "@Sistema Automatico")
                canallogs.send({ embed: embedDatos3 }); 

              //EMPIEZA WARN 5555555555555555555555555555555555555555
  
  
              
              } else if (userWarnings == 5) {
                let canallogs = client.channels.get(config.canallogs); 
      
                const embedDatos = new Discord.RichEmbed() 
                .setColor(0x00AE86)
                .setFooter("Un miembro a sido avisado")
                .setTitle("**__Un Miembro Avisado__**")
                .addField("Usuario Avisado", "<@!"+warnedUser.id+">")
                .addField("Razon del Aviso", reason)
                .addField("Avisos del Usuario", userWarnings + 1)
                .addField("Operador|Staff que Aviso", "<@!"+message.author.id+">")
                canallogs.send({ embed: embedDatos }); 
            

                const embedDatos2 = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setFooter("Has sido avisado")
                .setTitle("**__Avisado en Urtzinxa_ (Discord)__**")
                .addField("Razon del Aviso:", reason)
                .addField("Tus avisos totales:", userWarnings + 1)
                .addField("Operador|Staff que te aviso:", "<@!"+message.author.id+">")
                .addField("Informacion:", "Has sido baneado en el servidor de Urtzinxa_(Discord) por llegar a 6 avisos.")
                client.users.get(warnedUser.id).send({ embed: embedDatos2 });
    
                let SQLDelete = `DELETE FROM warns WHERE idusuario = ${warnedUser.id}`;

                warns.run(SQLDelete, function(err) {
                  if (err) return console.error(err.message)
                })

                message.channel.send(`${warnedUser}, ha sido baneado por llegar a la cantidad maxima de avisos permitida.`);
                await sleep(2000)
                warnedUser.ban(reason);
    
                const embedDatos3 = new Discord.RichEmbed() 
                .setColor(0x00AE86)
                .setFooter("Baneo de usuario")
                .setTitle("**__Baneo__**")
                .addField("Usuario Baneado", "<@!"+warnedUser.id+">")
                .addField("Razon del Baneo", "Ha llegado a 6 avisos. Cantidad maxima permitida.")
                .addField("Avisos del Usuario", userWarnings + 1)
                .addField("Operador|Staff que Baneo", "@Sistema Automatico")
                canallogs.send({ embed: embedDatos3 }); 
  

          }
         
})}})};

module.exports.config = {
    name: 'warn',
    displayName: 'warn',
    aliases: ['avisar'],
    usage: 'warn',
    description: 'Avisar a un usuario',
    permission: 'KICK_MEMBERS',
    type: 'utility'
};