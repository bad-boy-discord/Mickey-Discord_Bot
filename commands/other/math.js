const { RichEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
    config: {
        name: "math",
        aliases: ["mth"],
        usage: "&math",
        description: "Калькулирует пример",
        category: "other",
        accessableby: "Members"
    },
    run: async(bot, message, args) => {
        if(!args[0]) { 
            let na = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка при использовании команды**\n\nУкажи пример(пример 2+2)")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(na);
        }
         
        let resp;
        try {
            resp = math.evaluate(args.join(' '))
        }catch (err) {
            let qq = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка при использовании команды**\n\nУкажите действительный пример.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(qq);
        }
    
        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`**Ответ на пример**:\n\nПример: **${args.join(' ')}**\nОтвет: **${resp}**`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(embed);
    }
} 