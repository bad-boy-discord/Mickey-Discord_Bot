const myID = "BOT OWNER ID";
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "call",
        description: "Вызывает создателя бота на сервер.",
        usage: "_call",
        category: "other",
        accessableby: "Members",
        aliases: []
    },
    run: async(bot, message, args) => {
        try {
            let invite = await message.channel.createInvite({maxAge: 0})
    
            let embed = new RichEmbed()
            .setColor("GREEN")
            .setDescription(`Вы успешно вызвали создателя бота на ваш сервер!
Ожидайте его прихода!`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()

            let sozd = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**${message.author.username}** вызвал(а) вас на их сервер!
Ссылка на сервер: ${invite.url}`)
            
            message.channel.send(embed);
            bot.fetchUser(myID).then((user) => {
                user.send(sozd);
            })
        }catch(e) {
            console.error(e);
        }
    }
}