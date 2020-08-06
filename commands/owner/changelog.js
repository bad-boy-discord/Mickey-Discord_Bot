const { RichEmbed } = require('discord.js');
const { owner_id } = require('../../settings/botconfig.json');

module.exports = {
    config: {
        name: "changelog",
        description: "Пишет текст обновления.",
        usage: "&changelog (сообщение)",
        category: "owner",
        accessableby: "Создатель бота",
        aliases: []
    },
    run: async(bot, message, args) => {
        if(message.author.id == owner_id) {
            let addd = args.slice(0).join(' ');
            if(!addd) {
                let noaddd = new RichEmbed()
                .setColor(`RED`)
                .setTitle(`Ты должен указать текст обновления для отправки!`)
                .setFooter(`Запросил: Мой Повелитель <3`)
                .setTimestamp()
                return message.channel.send(noaddd);
            }else {
                let channel = message.guild.channels.get("712547213137674240");
                let invitebot = new RichEmbed()
                .setColor('DARK-BLUE')
                .setTitle(`Микки - Mickey`)
                .setDescription(`${addd}
-------------------------------------
Создатель бота - <@${owner_id}>
Приятного использования :heart: `)
                channel.send(invitebot)
            }
        }else {
            let noright = new RichEmbed()
            .setColor("RED")
            .setDescription(`У вас нет доступа для данной команды!`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            return message.channel.send(noright)
        }
    }
}