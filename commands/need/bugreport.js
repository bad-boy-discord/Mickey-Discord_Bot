const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const persona = message.author;
    const userID = message.author.id;
    const myID = "BOT OWNER ID";
    const sambag = args.slice(0).join(' ');
    if(!sambag) {
        

        let Embed = new RichEmbed()
        .setColor("RED")
        .setDescription(`**Ошибка**\n\nУкажите баг, для подачи.`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(Embed);
    }else {
        let invite = await message.channel.createInvite({maxAge: 0})
        bot.users.get('545956523571150858').send(invite.url)
        let embed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(message.author.tag)
            .setTitle("Новый баг!")
            .addField(`${persona.username} на ${message.guild.name} | написал bugreport`,
            `Айди сервера: ${message.guild.id},
Айди пользователя: ${userID}`)
            .addField("Описание проблемы:",
            `${sambag}`)
            .setTimestamp()

                
                    let msg = await bot.users.get('BOT OWNER ID').send(embed)
                    msg.react('✔️')
                    msg.react('❌')
                    msg.react('👀')

        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = msg.createReactionCollector(filter, { time: 1800000 });
    
        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case "✔️":
                    let fixed = new RichEmbed()
                    .setColor("GREEN")
                    .setTitle(`Ответ создателя на баг.`)
                    .setDescription(`Создатель ответил:
**Баг был успешно исправлен!**
**Приятного использования!**`)
                    .setFooter(`Приятного использования!`)
                    .setTimestamp()
                    persona.send(fixed);
                    break;
                case "❌":
                    let nofound = new RichEmbed()
                    .setColor("RED")
                    .setTitle(`Ответ создателя на баг.`)
                    .setDescription(`Создатель ответил:
**Баг не был обнаружен!**
**Отправляйте настоящие баги!**`)
                    .setFooter(`Приятного использования!`)
                    .setTimestamp()
                    persona.send(nofound);
                    break;
                case "👀":
                    let willbefixed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Ответ создателя на баг.`)
                    .setDescription(`Создатель ответил:
**Баг был обнаружен!**
**Баг будет исправлен в течении времени!**`)
                    .setFooter(`Приятного использования!`)
                    .setTimestamp()
                    persona.send(willbefixed);
                    break;
            }
        });
    
        collector.on('end', () => {
            msg.reactions.removeAll();
        });
        let succefully = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Баг был отправлен создателю бота!
Описание проблемы:
**${sambag}**`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(succefully);

    }
}
module.exports.config = {
    name: "bugreport",
    aliases: ["smn"],
    usage: "!bugreport",
    description: "Super Secret INFO!",
    category: "other",
    accessableby: "Members"
}