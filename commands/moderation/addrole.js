const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "addrole",
        description: "Добавляет роль пользователю",
        usage: "&addrole (@упоминание участника) (@упоминание роли)",
        category: "moderation",
        accessableby: "Модераторы",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nУ вас должно быть право на Управление Ролями.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms);
        }
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) {
            let noperms1 = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nЯ не могу выдавать роли!\nВозможно у меня нет права на контроль ролей.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms1);
        }

        let rMember = message.mentions.members.first()
        if(!rMember) {
            let embed2 = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nУпомяните **пользователя** для выдачи роли.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed2)
            return;
        }
        let role = message.mentions.roles.first()
        if(!role) {
            let embed = new RichEmbed()
            .setColor("RED")
            .setDescription("**Ошибка**\n\nУпомяните **роль** для выдачи роли.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed).catch(err => console.error(err));
        }

        if(rMember.roles.has(role.id)) {
            let already = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ пользователя **${rMember}** уже есть роль ${role}!`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(already);
        } else {
            rMember.addRole(role)
            let embed1 = new RichEmbed()
            .setColor("DARK-BLUE")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**Успех!**\n\nПользователю **${rMember}** была выдана роль **${role}**`)
            message.channel.send(embed1)
        }
    }
}