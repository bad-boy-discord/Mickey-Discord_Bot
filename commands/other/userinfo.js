const { RichEmbed } = require('discord.js');
const embed = new RichEmbed();

module.exports = {
    config: {
        name: "userinfo",
        description: "Показывает информацию пользователя.",
        usage: "&userinfo (@mention)",
        category: "other",
        accessableby: "Members",
        aliases: ["ui"]
    },
    run: async(bot, message, args) => {
        let user = message.mentions.members.first();

        if(!user) {
            user = message.author;
        }

        embed.setColor("DARK-BLUE")
        embed.setDescription(`P.s: **Если вы хотите получить информацию другого пользователя, то упомяните его.**\n\nИнформация о пользователе **${user.toString()}**\n\nНик пользователя: **${user.user.username}**\nЦифры(После #): **${user.user.discriminator}**\nПолный тег: **${user.user.username + "#" + user.user.discriminator}**\nАйди пользователя: **${user.user.id}**\nАккаунт создан: **${user.user.createdAt.toLocaleString()}**`)
        embed.setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        embed.setTimestamp()
        return message.channel.send(embed);
    }
}