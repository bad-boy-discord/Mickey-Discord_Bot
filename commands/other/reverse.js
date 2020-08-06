const { RichEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "reverse",
        aliases: ['revse', 'revers', "rverse"],
        usage: "&reverse (наверное какие-то слова)",
        category: "other",
        description: "...",
        accessableby: "Пользователи"
    },
    run: async(bot, message, args, db) => {
        let text = args.slice(0).join(' ');
        if(!text) {
            let notextbtch = new RichEmbed()
            .setColor(`RED`)
            .setDescription(`**Ошибка**\n\nУкажите текст, который нужно написать наоборот.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(notextbtch);
        }
        try {
            let embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Результат**\n------------------\nОбычный текст:\n**${text}**\nТекст наоборот:\n**${text.split('').reverse().join('')}**\n------------------`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embed);
        }catch(e) {
            console.error(e);
        }
    }
}