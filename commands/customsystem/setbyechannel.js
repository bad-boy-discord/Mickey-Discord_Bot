const { RichEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "setbyechannel",
        description: "...",
        category: "customsystem",
        usage: "&setbyehannel (#channel mention)",
        accessableby: "Guild Owner",
        aliases: ["sbyehannel", "setbyech", "sbc", "setbyec"]
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) {
            let noperms = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Ошибка**\n\nУ вас нет прав для использования данной команды!\nДля использования данной команды, вам нужно право на **Управление сервером**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(noperms);
        }

        let prefix = db.get(`serverprefix_${message.guild.id}`);
        if(prefix === null) prefix = "&"

        let find = args.join(' ');
        if(!find) {
            let nofound = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Произошла ошибка!**\n\nВы не упомянули канал для установки.\n\nУпомяните канал или укажите название канала.\n\nЕсли у вас уже стоит канал, и вы хотите его удалить, то напишите **${prefix}setbyechannel remove**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nofound);
        }else if(find == "remove") {
            db.delete(`leavechannel_${message.guild.id}`);
            let emeb = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nБот успешно удалил канал из базы!\nЕсли вы хотите поставить канал обратно, то напишите данную команду ещё раз, но с упоминанием канала.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(emeb);
        }
        
        let channel = message.mentions.channels.first() || message.guild.channels.get(find);
        if(!channel) {
            let nofound = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Произошла ошибка!**\n\nБот не смог найти канал с названием **${find}**\n\nПопробуйте упомянуть канал или указать правильное название.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nofound);
        }

        db.set(`leavechannel_${message.guild.id}`, channel.id);
        let embed = new RichEmbed()
        .setColor('DARK-BLUE')
        .setDescription(`**Успех!**\n\nВы установили канал **${find}** для прощаний с участниками!`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(embed);
    }
}