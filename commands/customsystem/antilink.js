const { RichEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "antilink",
        description: "...",
        usage: "&antilink <on || off>",
        category: "customsystem",
        accessableby: "Members",
        aliases: []
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

        let find = args[0];
        if(find == "on") {
            db.set(`antilink_${message.guild.id}`, 1);

            let onm = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nВы включили систему **Anti-Link**!\nДанная система блокирует любой вид ссылок.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(onm);
        }else if(find == "off") {
            db.set(`antilink_${message.guild.id}`, 0);

            let offm = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех!**\n\nВы выключили систему **Anti-Link**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp() 
            return message.channel.send(offm);
        }else {
            let embed = new RichEmbed()
            .setColor("RED")
            .setDescription(`Добро пожаловать!\nВы попали на команду, которая контролирует систему **Anti-Link**\nДанная система блокирует любой вид ссылкок.\nЧтобы включить систему, надо написать **${prefix}antilink on**\nЧтобы выключить, надо написать **${prefix}antilink off**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embed);
        }
    }
}