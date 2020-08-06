const { RichEmbed } = require("discord.js");
const db = require(`quick.db`);
module.exports = {
    config: {
        name: "antispam",
        description: "...",
        usage: "&antispam <on || off>",
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

        let find = args[0]
        if(find == "on") {
            db.set(`antispam_${message.guild.id}`, 1);

            try{
                let muterole = await message.guild.createRole({
                    name: "Замучен",
                    color: "#f9f9f6",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
                db.set(`antispamrole_${message.guild.id}`, muterole.id);
            } catch(e) {
                console.log(e.stack);
            }

            let onm = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех**\n\nВы включили систему **Anti-Spam**!\nДанная система будет выдавать мут, за спам в чате.`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(onm);
        }else if(find == "off") {
            db.set(`antispam_${message.guild.id}`, 0);

            let off = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`**Успех**\n\nВы выключили систему **Anti-Spam**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(off);
        }else {
            let embed = new RichEmbed()
            .setColor("RED")
            .setDescription(`Добро пожаловать!\nВы попали на команду, которая контролирует систему **Anti-Spam**\nДанная система мутит пользователя за частым спам.\nЧтобы включить систему, надо написать **${prefix}antispam on**\nЧтобы выключить, надо написать **${prefix}antispam off**\n\n**ВАЖНО: Данная система мутит за 7 сообщений за 3 секунды.**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embed);
        }
    }
}