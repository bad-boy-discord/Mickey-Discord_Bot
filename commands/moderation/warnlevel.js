const {RichEmbed} = require("discord.js");
//const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");

module.exports =  {
    config: {
        name: "warnlevel",
        description: "Проверяет кол-во варнов у участника",
        category: "moderation",
        usage: "_warnlevel <mention>",
        accessableby: "Administrators",
        aliases: ["wrnlvl", "wanlvl", "warlvl"]
    },
    run: async(bot, message, args) => {
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        let warns = db.fetch(`warns_${message.guild.id}_${wUser.id}`)
        if(warns === null) warns = 0;

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username)
            .setTitle("У вас нет прав для использования данной команды.")
            .setDescription("У вас должно быть право на Проверку варнов у Участников.")
            .setTimestamp()
        }

        if(!wUser) {
            let nousermention = new RichEmbed()
            .setColor("RED")
            .setTitle("Ты не упомянул пользователя для проверки уровня варна.")
            .setTimestamp()
            return message.channel.send(nousermention);
        }

        let embed = new RichEmbed()
        .setColor("GREEN")
        .setTitle("Проверка уровня варна у участника")
        .setDescription(`Участник: ${wUser}\nУровень варна: ${warns}`)
        .setTimestamp()
        message.channel.send(embed);

    }
}