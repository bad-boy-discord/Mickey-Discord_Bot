const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const dateFormat = require("dateformat");

module.exports = { 
    config: {
        name: "steam",
        description: "Берёт статистику пользователя.",
        usage: "<user>",
        category: "search",
        accessableby: "Members"
    },
    run: async (bot, message, args, db) => {
        const token = "35C34021118E6D90DF68ECB5B0139091"; //I reset mine.
        if(!args[0]) {
            let embd1 = new RichEmbed()
            .setColor("RED")
            .setDescription("Для поиска игрока укажите ник пользователя.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embd1);
        }
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) {
                let embd2 = new RichEmbed()
                .setColor("RED")
                .setDescription("Произошла ошибка при получении информации!\nВозможно ты неправильно указал ник пользователя.")
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(embd2);
            }

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Не в сети", "В сети", "Занят", "Отошёл", "Спит", "Смотрит трейд", "Смотрит игру"];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) {
                let embd3 = new RichEmbed()
                .setColor("RED")
                .setDescription("Произошла ошибка при получении информации!\nВозможно ты неправильно указал ник пользователя.")
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(embd3);
            }
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) {
                let embd4 = new RichEmbed()
                .setColor("RED")
                .setDescription("Произошла ошибка при получении информации!\nВозможно ты неправильно указал ник пользователя.")
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(embd4);
            }
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const embed = new RichEmbed()
                .setColor("DARK-BLUE")
                .setAuthor(`Результаты поиска: ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Настоящее имя:** ${realname || "Неизвестно"}\n**Статус:** ${state[personastate]}\n**Город:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:\n**Аккаунт создан:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}\n**Баны:** ВАК: ${NumberOfVACBans}, Игровые: ${NumberOfGameBans}\n**Ссылка:** [перейти на профиль](${profileurl})`)
                .setTimestamp();
                return message.channel.send(embed)
            })
        })
    })
  }
}