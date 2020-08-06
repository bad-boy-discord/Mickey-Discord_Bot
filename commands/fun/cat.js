const { RichEmbed } = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
    config: {
        name: "cat",
        category: "fun",
        description: "Котики!",
        usage: "&cat",
        accessableby: "Пользователи",
        aliases: []
    },
    run: async (bot, message, args) => {
        let fast = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Идёт генерация картинки...`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        
        let msg = await message.channel.send(fast);
        
        fetch(`http://aws.random.cat/meow`)
        .then(res => res.json()).then(body => {

         
        if(!body) {
            let embd = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username)
            .setTitle("Произошла ошибка!")
            .setDescription("Произошла ошибка при получении фотографии!\nВозможно, проблема с сайтом.")
            .setTimestamp()
            return message.channel.send(embd);
        }

            let cEmbed = new RichEmbed()
            .setColor(`DARK-BLUE`)
            .setDescription(`Рандом картинка с котом.`)
            .setImage(body.file)
            .setTimestamp()

            return message.channel.send(cEmbed)
        });
        msg.delete();
    }
}