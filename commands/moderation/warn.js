const {RichEmbed} = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
    config: {
        name: "warn",
        description: "Разбанивает пользователя",
        usage: "&warn (@упоминание участника) (причина)",
        category: "moderation",
        accessableby: "Модераторы",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username)
            .setDescription("У вас нет прав для использования данной команды.\nУ вас должно быть право на Управление Сообщениями.")
            .setTimestamp()
            return message.channel.send(noperms);
        }

        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!wUser) {
            let nousermention = new RichEmbed()
            .setColor("RED")
            .setDescription("Ты не упомянул пользователя для выдачи варна.")
            .setTimestamp()
            return message.channel.send(nousermention);
        }
        if(wUser.hasPermission("MANAGE_CHANNELS")) {
            let hasperms = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username)
            .setDescription(`**Ошибка!**\n\nУ пользователя **${wUser}** есть имунитет для команды **warn**!`)
            .setTimestamp()
            return message.channel.send(hasperms);
        }
        let reason = args.join(" ").slice(22);
        if(!reason) reason = "Без причины";
        let muterole = message.guild.roles.find("name", "Мут");
        let mutetime = "30s";

        let warns = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
        if(!warns || warns === null) warns = 1;
        db.add(`warns_${message.guild.id}_${wUser.id}`, 1);
        let warns1 = db.fetch(`warns_${message.guild.id}_${wUser.id}`);

        let warnEmbed = new RichEmbed()
        .setColor("RED")
        .setTitle(`Новый случай на сервере!`)
        .setDescription(`Модератор: **${message.author.username}** выдал **варн**\nПользователю: **${wUser}**\nПо причине: **${reason}**`)
        .addField("Количество варнов у пользователя:", `**${warns1}**`)
        .setTimestamp()
        message.channel.send(warnEmbed)

        if(warns1 === 2) {
            if(!muterole) {
                try {
                    muterole = await message.guild.createRole({
                        name: "Замучен",
                        color: "#f9f9f6",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false
                        })
                    })
                }catch(e) {
                    console.log(e);
                }
            }

            let mutewarn = new RichEmbed()
            .setColor("RED")
            .setAuthor(`Временный мут`)
            .setTitle("Новый случай на сервере!")
            .setDescription(`Так как у пользователя: **${wUser}** стало 2 варна,\nДанный пользователь получил **временный мут** на *30 секунд*!`)
            .setTimestamp()
            await(wUser.addRole(muterole.id));
            message.channel.send(mutewarn);

            setTimeout(function() {
                let unmutewarn = new RichEmbed()
                .setColor("GREEN")
                .setAuthor(`Истекло время временного мута`)
                .setTitle("Новый случай на сервере!")
                .setDescription(`Так как у пользователя: **${wUser}** кончился таймер варна(30 секунд),\nУ данного пользователя убран **временный мут**!`)
                .setTimestamp()
                wUser.removeRole(muterole.id)
                return message.channel.send(unmutewarn)
            }, ms(mutetime));
        }

        let warns2 = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
        if(warns2 === 3) {
            let banwarn = new RichEmbed()
            .setColor("RED")
            .setDescription(`Так как у пользователя: **${wUser}** стало 3 варна,\nДанный пользователь получил **Бан**!`)
            .setTimestamp()
            message.guild.member(wUser).ban(reason);
            db.subtract(`warns_${message.guild.id}_${wUser.id}`, 3)
            return message.channel.send(banwarn);
        }
    }
}