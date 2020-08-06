const { RichEmbed } = require("discord.js");
const format = require(`moment-duration-format`)

module.exports = {
    config: {
        name: "serverinfo",
        description: "Показывает информацию о сервере.",
        usage: "&serverinfo",
        category: "other",
        accessableby: "Members",
        aliases: ["si", "serverdesc"]
    },
    run: async(bot, message, args) => {
        let verifilv = ['Отсутствует', 'Низкий', 'Средний', 'Высокий', 'Очень высокий']
        let embed = new RichEmbed() // встроенное сообщение // параметры: имя: string, картинка: string, url: string
        .setColor("DARK-BLUE")
        .setDescription(`**Информация сервера ${message.guild.name}**:\n**Данная команда отображает информацию сервера.**\n\n**Владелец сервера:** **${message.guild.owner}**\n**Регион сервера:** **${message.guild.region}**\n\n**Участников на сервере:** **${message.guild.memberCount}**\n**В сети:** **${message.guild.presences.size}**\n\n**Каналов на сервере:** **${message.guild.channels.filter(c => c.type == 'text').size} текстовых**\n**${message.guild.channels.filter(c => c.type == 'voice').size}** **голосовых**\n\n**Уровень проверки:** **${verifilv[message.guild.verificationLevel]}**\n**Ролей на сервере:** **${message.guild.roles.size}**\n**Эмоджи на сервере:** **${message.guild.emojis.size}**\n\n**Дата создания сервера:** **${message.channel.guild.createdAt.toLocaleString()}**`)
        return message.channel.send(embed)
    }
}