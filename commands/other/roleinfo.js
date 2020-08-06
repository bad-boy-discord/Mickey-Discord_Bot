const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "roleinfo",
        aliases: ['ri', 'rinfo', "rolei"],
        usage: "&roleinfo (название роли)",
        category: "other",
        description: "...",
        accessableby: "Пользователи"
    },
    run: async(bot, message, args, db) => {
        let role = message.mentions.roles.first(),
            grole = message.guild.roles.get(role.id),
            author = message.author;

        if(!role) {
            let norole = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУпомяните роль!`)
            .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(norole)
        }
        if(!grole) {
            let nofindrole = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nБот не смог найти роль с таким именем!`)
            .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nofindrole);
        }

        try {
            let embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Информация роли **${role}**:\n\nID Роли: **${grole.id}**\nИмя роли: **${grole.name}**\nЦвет роли: **${grole.hexColor}**\nУчастников с ролью: **${grole.members.size}**\nПозиция:**${grole.position}**`)
            .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embed);
        }catch(e) {
            console.error(e);
        }
    }
}