const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "unban",
        description: "Разбанивает пользователя",
        usage: "&unban (id пользователя)",
        category: "moderation",
        accessableby: "Модераторы",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(["BAN_MEMBERS"])) {
            let embed = new RichEmbed()
            .setColor("RED")
            .setDescription("У тебя нету прав для использования данной команды!\nТебе необходимо право на Бан Участника.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed)
            return; 
        }

        let id = args[0]
        if(!id) {
            let embed1 = new RichEmbed()
            .setColor("RED")
            .setDescription("Для разбана пользователя нужно указать ID Пользователя.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed1);
            return;
        }
        let check = parseInt(id);
        if(!check) {
            let embed1 = new RichEmbed()
            .setColor("RED")
            .setDescription("Для разбана пользователя нужно указать действительный ID Пользователя.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed1);
            return;
        }
        let bannedMember = await bot.fetchUser(id);
        if(!bannedMember) {
            let embed1 = new RichEmbed()
            .setColor("RED")
            .setDescription("Бот не смог найти пользователя с таким ID.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send(embed1);
            return;
        }

        if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) {
            let embed2 = new RichEmbed()
            .setColor("RED")
            .setAuthor(`${message.author.username} | Ошибка`)
            .setDescription("У меня нету прав для использования данной команды!\nМне необходимо право на Бан Участника.")
            message.channel.send(embed2);
            return;
        }

        try {
            message.guild.unban(bannedMember).catch(err => console.log(err));
                let embed3 = new RichEmbed()
                .setColor("GREEN")
                .setDescription(`**Успех!**\n\nТы успешно разбанил пользователя: ${bannedMember}!`)
                message.channel.send(embed3)
        } catch(e) {
            console.log(e.message)
        }
    }
}