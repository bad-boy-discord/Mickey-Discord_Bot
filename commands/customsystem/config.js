const { RichEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
    config: {
        name: "config",
        description: "...",
        usage: "&config",
        category: "customsystem",
        accessableby: "Members",
        aliases: []
    },
    run: async(bot, message, args) => {
        let autorole = db.get(`autorole_${message.guild.id}`);
        let welcomechannel = db.get(`welcomechannel_${message.guild.id}`);
        let byechannel = db.get(`leavechannel_${message.guild.id}`);
        let prefix = db.get(`serverprefix_${message.guild.id}`);
        let antilink = db.get(`antilink_${message.guild.id}`);
        let antispam = db.get(`antispam_${message.guild.id}`);

        if(autorole === null) {
            autorole = "Не задана"
        }
        if(welcomechannel === null) {
            welcomechannel = "Не задан"
        }
        if(byechannel === null) {
            byechannel = "Не задан"
        }
        if(prefix === null) {
            prefix = "Не задан"
        }
        if(antilink === 0) {
            antilink = "Не включён"
        }else if(antilink === 1) {
            antilink = "Включена"
        }
        if(antispam === 0) {
            antispam = "Не включён"
        }else if(antispam === 1) {
            antispam = "Включена"
        }

        let role = message.guild.roles.get(autorole) || "Не задана";
        let wchannel = message.guild.channels.get(welcomechannel) || "Не задан";
        let bchannel = message.guild.channels.get(byechannel) || "Не задан";

        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Конфиг сервера **${message.guild.name}**:\n\nПрефикс: **${prefix}**\nАвтороль: **${role}**\nКанал для приветствий: **${wchannel}**\nКанал для прощаний: **${bchannel}**\nСистема Anti-Link: **${antilink}**\nСистема Anti-Spam: **${antispam}**`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(embed);
    }
}