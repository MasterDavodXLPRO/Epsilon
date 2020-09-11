module.exports.run = async (client, message, args) => {
    let texto = args.slice(1).join(' ')
    
    if (!texto) return message.channel.send("<@!"+message.author.id+">  debes escribir un argumento como minimo.")
    message.channel.send(texto)
    message.delete()

    }

module.exports.config = {
    name: 'decir',
    displayName: 'decir',
    aliases: ['say', 'hablar'],
    usage: 'decir',
    description: 'Hablar con el bot',
    permission: 'ADMINISTRATOR',
    type: 'utility'
};