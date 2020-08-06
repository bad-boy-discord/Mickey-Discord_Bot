const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ping",
        description: "Отображает пинг бота.",
        usage: "&uptime",
        category: "other",
        accessableby: "Members",
        aliases: ["pong"]
    },
    run: async(bot, message, args) => {
        let fast = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Подготовка...`)
        .setTimestamp()

        let msg = await message.channel.send(fast);

        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Пинг бота: **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}**мс`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        msg.edit(embed);
    }
}