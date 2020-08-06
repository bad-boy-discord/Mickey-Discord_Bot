const { RichEmbed } = require("discord.js");

module.exports = {
    config: { 
        name: "randnum",
        description: "...",
        category: "other",
        usage: "&randnum <first number> <second number>",
        accessableby: "Members",
        aliases: ["rdnum"]
    },
    run: async(bot, message, args, db) => {
        let fnumbertorand = parseInt(args[0]);
        let snumbertorand = parseInt(args[1]);
        if(isNaN(fnumbertorand)) {
            let one = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУкажите первое **число**.`)
            .setFooter(`Запросил: ${message.author.username}`)
            .setTimestamp()
            return message.channel.send(one);
        }
        if(isNaN(snumbertorand)) {
            let two = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУкажите второе **число**.`)
            .setFooter(`Запросил: ${message.author.username}`)
            .setTimestamp()
            return message.channel.send(two);
        }

        if(!fnumbertorand) {
            let nofrand = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nТы не указал первое число!\nПример: **&randnum __<1 число>__ <2 число>**`)
            .setFooter(`Запросил: ${message.author.username}`)
            .setTimestamp()
            return message.reply(nofrand);
        }
        if(!snumbertorand) {
            let nosrand = new RichEmbed()
            .setColor("RED")
            .setTitle(`Ошибка!`)
            .setDescription(`**Ошибка**\n\nТы не указал первое число!\nПример: **&randnum <1 число> __<2 число>__**`)
            .setFooter(`Запросил: ${message.author.username}`)
            .setTimestamp()
            return message.reply(nosrand);
        }

        let randomnumber = Math.floor(Math.random() * (fnumbertorand + snumbertorand));
        message.react('👌')
        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Вот рандомное число: ${randomnumber}`)
        .setFooter(`Запросил: ${message.author.username}`)
        .setTimestamp()
        return message.channel.send(embed);

    }
}