const {RichEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "geninvite",
        description: "Даёт ссылку на приглашение.",
        usage: "&invite",
        category: "other",
        accessableby: "Members",
        aliases: ["inv"]
    },
    run: async(bot, message, args) => {
        let invite = await message.channel.createInvite({
            maxAge: 0,
            maxUses: 0
        },
        `Сгенерированно ${message.author.tag}`
        ).catch(err => console.log(err));
        let generation = new RichEmbed()
        .setColor("GREEN")
        .setDescription(`**Успех**\nБыло создано бесконечное приглашение на сервер.\nВот и оно: ${invite.url}`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(generation);
    }
}