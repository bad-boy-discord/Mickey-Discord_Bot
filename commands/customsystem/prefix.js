const { RichEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "prefix",
        description: "...",
        category: "customsystem",
        usage: "&prefix (new prefix || reset)",
        accessableby: "Guild Owner",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ вас нет прав для использования данной команды!\nДля использования данной команды, вам нужно право на **Управление сервером**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms);
        }
        let newprefix = args[1];
        if(newprefix > 3) {
            let nomore = new RichEmbed()
            .setColor('RED')
            .setDescription(`**Ошибка**\n\nПрефикс не может быть больше 3 символов!`)
            .setTimestamp()
            return message.channel.send(nomore);
        }
        if(args[0] == "set") {
            if(!newprefix) {
                let emmbed = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\nУкажите новый префикс сервера!`)
                .setTimestamp()
                return message.channel.send(emmbed);
            }else {
                db.set(`serverprefix_${message.guild.id}`, newprefix);
                let embed = new RichEmbed()
                .setColor('DARK-BLUE')
                .setDescription(`**Успех!**\n\nПрефикс был успешно изменён!\nНовый префикс сервера: **${newprefix}**`)
                .setTimestamp()
                return message.channel.send(embed)
            }
        }else {
            db.delete(`serverprefix_${message.guild.id}`);

            let reseted = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nПрефикс сервера был сброшен!\nНовый префикс сервера: **&**\n\n**Если что-то пошло не так**\nЕсли вы хотите поставить новый префикс, то напишите:\n**&prefix set <новый префикс>**\nP.S: Префикс не должен быть больше 3 символов.`)
            .setTimestamp()
            return message.channel.send(reseted);
        }
    }
}