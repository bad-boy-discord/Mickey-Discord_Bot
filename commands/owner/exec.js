const { RichEmbed } = require('discord.js');
const { owner_id } = require('../../settings/botconfig.json');

module.exports = {
    config: {
        name: "exec",
        description: "...",
        usage: "...",
        category: "owner",
        accessableby: "Создатель бота",
        aliases: ['terminal', 'console', 'bash', "cmd", 'term', 'consl']
    },
    run: async(bot, message, args) => {
        if(message.author.id != owner_id) {
            let noright = new RichEmbed()
            .setColor("RED")
            .setDescription(`У вас нет доступа к данной команде!`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            return message.channel.send(noright) 
        }

        const code = args.join(' ');
        if(!code) {
            let errEmbed = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУкажите код для применения.`)
            .setTimestamp()
            return message.channel.send(errEmbed);
        }

        const { exec } = require('child_process');
        exec(code, (err, stdout, stderr) => {
            if(err) {
                let errEmbed1 = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\n${err.message}`)
                .setTimestamp()
                return message.channel.send(errEmbed1);
            }
            if(stderr) {
                let errEmbed2 = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\n${stderr}`)
                .setTimestamp()
                return message.channel.send(errEmbed2);
            }
            if(stdout) {
                let errEmbed3 = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\n${stdout}`)
                .setTimestamp()
                return message.channel.send(errEmbed3);
            }
            if (!stderr && !stdout) {
                let ok = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Успех!`)
                .setTimestamp()
                return message.channel.send(ok);
            }
        }) 
    }
}