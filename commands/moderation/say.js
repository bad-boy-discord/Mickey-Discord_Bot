const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "say",
        description: "Пишет сообщения от имени бота",
        usage: "&say (тип) (сообщение)",
        category: "moderation",
        accessableby: "Модераторы",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nУ вас должно быть право на **Управление Сообщениями**.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms);
        }

        let argsresult;
        let mChannel = message.mentions.channels.first()

        message.delete()
        if(mChannel) {
            argsresult = args.slice(1).join(" ")
            mChannel.send(argsresult)
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult)
        }
    }
}