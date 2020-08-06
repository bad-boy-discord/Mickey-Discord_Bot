const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "clear",
        description: "Очищает сообщения",
        category: "moderation",
        usage: "&clear (количество)",
        accessableby: "Модераторы",
        aliases: []  
    },
    run: async(bot, message, args) => {
        if(message.deletable) {
            message.delete();
        }

        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ вас нет прав для использования данной команды!\nДля использования данной команды, вам нужно право на **Управление сообщениями**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms).then(msg => msg.delete(5000));
        }
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES"])) {
            let nobotperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ бота нет прав для использования данной команды!\nДля использования данной команды, боту нужно право на **Управление сообщениями**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nobotperms);
        }

        if(isNaN(args[0]) || parseInt(args[0] <= 0)) {
            let novalid = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nУкажите число для удаления.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(novalid).then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }   

        message.channel.bulkDelete(deleteAmount, true).then(deleted => {
            let info = new RichEmbed()
            .setColor("RED")
            .setDescription(`Бот очистил **${deleted.size}** сообщений`)
            .setTimestamp()
            return message.channel.send(info);
        })
    }
}