const { RichEmbed } = require('discord.js');
const { inspect } = require('util');
const { owner_id } = require('../../settings/botconfig.json');

module.exports = {
    config: {
        name: "eval",
        description: "Обрабатывает/Выполняет код",
        usage: "&eval (код)",
        category: "owner",
        accessableby: "Создатель бота",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(message.author.id == owner_id) {
            try {
                let toEval = args.join(' ');
                let evaluated = inspect(eval(toEval, { depth: 0 }));
                if(!toEval) {
                    return message.channel.send(`Ошибка \`air\``)
                }else {
                    if(toEval == "bot.token") {
                        let no = new RichEmbed()
                        .setColor("RED")
                        .setDescription(`Запрещено получать токен бота через **Eval**`)
                        return message.channel.send(no);
                    }

                    let hrStart = process.hrtime()
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);
                    return message.channel.send(`*Применено за: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}мс.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
                }
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