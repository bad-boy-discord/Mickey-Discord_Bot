const {RichEmbed} = require("discord.js");
//const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");

module.exports =  {
    config: {
        name: "unwarn",
        description: "Забирает предупреждение(-я) у пользователя(Всего их 3)",
        category: "moderation",
        usage: "_unwarn (mention) (value)",
        accessableby: "Administrators",
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

        let wUser = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!wUser) {
            let nousermention = new RichEmbed()
            .setColor("RED")
            .setDescription("Ты не упомянул пользователя для снятия варна.")
            .setTimestamp()
            return message.channel.send(nousermention);
        }

        let warns = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
        if(!warns || warns === null) {
            let n = new RichEmbed()
            .setColor("RED")
            .setDescription(`У пользователя **${wUser}** нет предупреждений.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(n);
        }

        let number = args[1];
        let check = parseInt(number);
        if(!check) {
            let no = new RichEmbed()
            .setColor("RED")
            .setDescription(`Укажите действительное(настоящее) число.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(no);
        }
        if(number == '1') {
            if(warns < 1) {
                let n1 = new RichEmbed()
                .setColor("RED")
                .setDescription(`У пользователя **${wUser}** нет предупреждений.`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(n1); 
            }
            db.subtract(`warns_${message.guild.id}_${wUser.id}`, 1);
            let before = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
            let success = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nВы сняли **1** предупреждение пользователю **${wUser}**!\nКоличество предупрежений у пользователя: **${before}**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(success);
        }else if(number == '2') {
            let warns1 = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
            if(warns1 < 2) {
                let no1 = new RichEmbed()
                .setColor("RED")
                .setDescription(`У пользователя **${wUser}** нет предупреждений.`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(no1); 
            }
            db.subtract(`warns_${message.guild.id}_${wUser.id}`, 2);
            let warns2 = db.fetch(`warns_${message.guild.id}_${wUser.id}`);
            let success1 = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nВы сняли 2 предупреждения пользователю **${wUser}**!\nКоличество предупрежений у пользователя: **${warns2}**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(success1);
        }else {
            let welcome = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Добро пожаловать на команду по снятию варнов!\nЧтобы снять варн, вам нужно упомянуть пользователя и указать число от 1 до 2.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(welcome);
        }
    }
}