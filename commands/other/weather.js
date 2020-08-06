const {RichEmbed} = require("discord.js");
const weather = require("weather-js");

module.exports = {
    config: {
        name: "weather",
        description: "Показывает температуру в городе/стране",
        usage: "&weather <город>",
        category: "other",
        accessableby: "Members",
        aliases: ["wtr", "weathr"]
    },
    run: async(bot, message, args) => {
        weather.find({search: args.join(" "),degreeType: "C", lang: "RU"}, function(err, result) {
            if (err) {
                if(err == "missing search input") {
                    err = "Вы не указали локацию."
                }
                if(err == "Error: ESOCKETTIMEDOUT") {
                    err = "Не удалось загрузить погоду в данной локации."
                }

                let fast = new RichEmbed()
                .setColor("RED")
                .setDescription(`**Ошибка**\n\n${err}`)
                .setTimestamp()
                return message.channel.send(fast).then(console.log(err));
            }
    
            if(result.length === 0) {
                let validloc = new RichEmbed()
                .setColor("RED")
                .setDescription("**Ошибка**\n\nУкажите правильную локацию!")
                .setTimestamp()
                return message.channel.send(validloc);
            }
    
            let current = result[0].current;
            let location = result[0].location;
    
            let embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setThumbnail(current.imageUrl)
            .setDescription(`Погода в городе/стране **${current.observationpoint}**:`)
            .addField("Временная зона", `UTC+${location.timezone}`, true)
            .addField("Тип температуры", location.degreetype, true)
            .addField("Температура", `${current.temperature} Градусов`, true)
            .addField("Ощущается", `${current.feelslike} Градусов`, true)
            .addField("Ветер", current.winddisplay, true)
            .addField('Влажность', `${current.humidity}%`, true)
            .setTimestamp()
            message.channel.send(embed);
        });
    }
}