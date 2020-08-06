const { RichEmbed } = require('discord.js');
const { owner_id } = require('../../settings/botconfig.json');

module.exports = {
    config: {
        name: "restart",
        description: "Перезапускает бота",
        usage: "&restart",
        category: "owner",
        accessableby: "Создатель бота",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(message.author.id == owner_id) {
            try {
                let msg = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Бот перезапускается...`)
                return message.channel.send(msg).then(() => process.exit());
            } catch (err) {
                let errEmbed = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\n${err.message}`)
                .setTimestamp()
                return message.channel.send(errEmbed);
            }
        }else {
            let noright = new RichEmbed()
            .setColor("RED")
            .setDescription(`У вас нет доступа для данной команды!`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            return message.channel.send(noright)
        }
    }
}