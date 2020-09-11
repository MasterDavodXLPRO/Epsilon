const config = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {

if(!args) return message.channel.send(':warning: || Escriba la cantidad de mensajes a eliminar.');
let cantidadm = args[1]

if(!cantidadm) return message.reply(":warning: || Introduce un numero por favor. `-purge {cantidad}`") 

if(cantidadm > 100){
    message.channel.send(":warning: || El maximo de mensajes que puedo borrar es 100.")
}

message.channel.send(`:warning: || Voy a borrar los ${cantidadm} mensajes.`)

message.channel.fetchMessages({limit: cantidadm}).then((mensajes) => {
    var msgs = mensajes.filter(m => !m.pinned && !m.system)


    message.channel.bulkDelete(args[1]).then(() => {
        message.channel.send(`:white_check_mark: || Listo, borre los ${cantidadm} mensajes.`).then(m => m.delete(4000))  
      
        let canallogs = client.channels.get(config.canallogs); 

        const embedDatos = new Discord.RichEmbed() 
        .setColor(0x00AE86)
        .setFooter("Mensajes Eliminados en Masa")
        .setTitle("**__Mensajes Eliminados__**")
        .addField("Canal del Borrado", "<#"+message.channel.id+">")
        .addField("Cantidad de Mensajes", args[1])
        .addField("Operador|Staff que Borro", "<@!"+message.author.id+">")
        canallogs.send({ embed: embedDatos }); 
    
    }).catch(e => {
        switch(e.message){
            case(":no_entry: || Los mensajes de mas de 2 semanas no se pueden borrar con un bot por las leyes de discord."):{
                message.channel.send("Solo puedo borrar mensajes con menos de 2 semanas de antigüedad")
            }
            //aqui ire poniendo mas mensajes a medida que se me ocurran o vea en el canal de ayuda
            default:{
                message.channel.send(":warning: || Ocurrio un error desconocido en el comando para borrar mensajes \nPor favor avise a <@!"+config.ownerid+">")
                console.log("Err al borrar los mensajes: "+e)
            }
        }
    })
})
}

module.exports.config = {
    name: 'purge',
    displayName: 'purge',
    aliases: ['purgar', 'clear'],
    usage: 'purge',
    description: 'Eliminar mensajes de un canal. Maximo 100',
    permission: 'MANAGE_CHANNELS',
    type: 'utility'
};