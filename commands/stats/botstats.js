const { RichEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    config: {
        name: "botstats",
        aliases: [],
        usage: "&botstats",
        description: "...",
        category: "other",
        accessableby: "Members"
    },
    run: async(bot, message, args) => {
        let botowner = "bad boy#1046",
            ownerid = "545956523571150858";
        
        let d0 = new Date('April 12, 2020');
        let d1 = new Date();
        let dt = (d1.getTime() - d0.getTime()) / (1000*60*60*24);

        let embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setTitle(`Информация бота.`)
            .setDescription(`**Mickey - Микки**\n\n**ВАЖНО: Данная команда показывает общую статистику бота!**\n**Всего каналов, участников, серверов - это общее количество, не на определённом сервере!**\n------------------------\nКоличество серверов: **${bot.guilds.size}**\nВсего каналов: **${bot.channels.size}**\nВсего участников: **${bot.users.size}**\nВерсия бота: **2.0**\nБиблиотека на которой бот написан: **Discord.JS** <:logosquare1:699708400795385866>\nПинг бота: **${Math.round(bot.ping)}**\nВремя работы бота: **${ms(bot.uptime)}**\nДата основания бота: **12 Апреля 2020 год**\nБоту уже: **${Math.round(dt)} дней**\nОбновление готово на: **35%**\n------------------------\nСоздатель бота - <@${ownerid}>\nПриятного использования :heart:`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
        return message.channel.send(embed);
    }
}