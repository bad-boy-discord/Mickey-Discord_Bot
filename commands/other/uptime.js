const ms = require("pretty-ms");
const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "uptime",
        description: "Отображает время работы.",
        usage: "&uptime",
        category: "other",
        accessableby: "Members",
        aliases: ["ut"]
    },
    run: async(bot, message, args) => {
        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Моё время работы: ${ms(bot.uptime)}`)
        .setFooter(`Запросил: ${message.author.tag}`, message.author.displayAvatarURL)
        message.channel.send(embed);
    }
}