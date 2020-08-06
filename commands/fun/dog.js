const { RichEmbed } = require("discord.js");
const superagent = require("superagent");


module.exports = {
    config: {
        name: "dog",
        description: "Собачки!",
        category: "fun",
        usage: "&dog",
        accessableby: "Members",
        aliases: []
    }, 
    run: async (bot, message, args) => {
        let fast = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Идёт генерация картинки...`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        
        let msg = await message.channel.send(fast);

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) {
            let embd = new RichEmbed()
            .setColor("RED")
            .setDescription("Произошла ошибка при получении фотографии!")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embd);
        }

        let dEmbed = new RichEmbed()
        .setColor(`DARK-BLUE`)
        .setDescription(`Рандом картинка с cобакой.`)
        .setImage(body.message)
        .setTimestamp()

        msg.delete();
        return message.channel.send(dEmbed)
    }
}