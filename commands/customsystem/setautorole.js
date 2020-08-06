const { RichEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "setautorole",
        description: "...",
        category: "customsystem",
        usage: "&setautorole (@role mention)",
        accessableby: "Guild Owner",
        aliases: ["sautorole", "setautor", "setarole"]
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
            .setDescription(`**Произошла ошибка!**\n\nВы не упомянули роль для установки.\n\nУпомяните роль для установки и успешной работы.\n\nЕсли у вас уже стоит роль, и вы хотите его удалить, то напишите **${prefix}setautorole remove**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nofound);
        }else if(find == "remove") {
            db.delete(`autorole_${message.guild.id}`);
            let emeb = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nБот успешно удалил роль из базы!\nЕсли вы хотите поставить роль обратно, то напишите данную команду ещё раз, но с упоминанием роли.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(emeb);
        }
        let role = message.mentions.roles.first() || message.guild.channels.get(find);
        if(!role) {
            let nofound = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Произошла ошибка!**\n\nБот не смог найти роль с названием **${find}**\n\nПопробуйте упомянуть роль для установки и успешной работы.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(nofound);
        }

        db.set(`autorole_${message.guild.id}`, role.id);
        let embed = new RichEmbed()
        .setColor('DARK-BLUE')
        .setDescription(`**Успех!**\n\nВы установили роль **${find}** для выдачи при заходе участника на сервер!`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(embed);
    }
}