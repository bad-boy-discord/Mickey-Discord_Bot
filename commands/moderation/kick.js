const { RichEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "kick",
        description: "Кикает пользователя",
        category: "moderation",
        usage: "&kick (@упоминание) (причина)",
        accessableby: "Модераторы",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ вас нет прав для использования данной команды!\nДля использования данной команды, вам нужно право на **Кик участников**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms);
        }

        let user = message.mentions.members.first();
        if(!user) {
            let nomention = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУпомяните пользователя для кика.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nomention);
        }

        let reason = args.slice(1).join(' ');
        if(!reason) {
            let noreason = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУкажите причину для кика.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noreason);
        }

        if(!message.guild.me.hasPermission(["KICK_MEMBERS"])) {
            let nobotperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ бота нет прав для использования данной команды!\nДля использования данной команды, боту нужно право на **Кик участников**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nobotperms);
        }

        let tokicked = new RichEmbed()
        .setColor("RED")
        .setDescription(`Привет, ты был кикнут с сервера **${message.guild.name}**!\nМодератор: **${message.author.username}**\nПричина: **${reason}**`)
        .setTimestamp()

        let info = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`**Пользователь был кикнут!**\n\nДетали кика:\nПользователь: **${user}**\nПричина: **${reason}**`)
        .setTimestamp()

        try {
            user.send(tokicked).then(() => {
                user.kick();
            })
            message.channel.send(info);
        } catch (error) {
            console.log(error);
            let errorlog = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Произошла ошибка!**\n\nБот не смог кикнуть пользователя!\nОшибка в консоле.`)
            return message.channel.send(errorlog)
        }
    }
}