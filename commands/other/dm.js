const {RichEmbed} = require('discord.js');

module.exports = {
    config: {
        name: "dm",
        description: "Отправляет пользователю в лс сообщение.",
        usage: "_dm (user)",
        category: "other",
        accessableby: "Members",
        aliases: []
    },
    run: async (bot, message, args, db) => {
        
            let author = message.author.username;
            let user = message.mentions.members.first() || message.guild.members.get(args[0])
            let msg = args.slice(1).join(" ");
            if(!user) {
                let noment = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\nУпомяните пользователя для отправки сообщения.`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(noment);
            }
            if(user.user.id == message.author.id) {
                let hah = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\nВы не можете отправлять сообщения самому себе.`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(hah);
            }
            if(!msg) {
                let nowords = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\nУкажите сообщение для отправки.`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(nowords);
            }
    
            try {
                let ok = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`**Успех!**\n\nВы отправили пользователю **${user}** сообщение.\nТекст сообщения: **${msg}**`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()

                let embed = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Вам пришло сообщение от **${author}**.\nВот текст сообщения:\n**${msg}**`)
                .setTimestamp()
                return message.channel.send(ok).then(() => user.send(embed));
            }catch (err) {
                console.log(err);
            }
        
    }
}