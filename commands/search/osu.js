const {RichEmbed} = require('discord.js');
const osu = require('node-osu');

let osuApi = new osu.Api('def22deeefa068e052076ef488c4d12bfc3fd49f', {
    notFoundAsError: false,
    completeScores: false
});

module.exports = {
    config: {
        name: "osu",
        description: "Производит поиск игрока и показывает его статистику.",
        usage: "&osu (user)",
        category: "search",
        accessableby: "Members",
        aliases: []
    },
    run: async(bot, message, args) => {
        let query = message.content.split(/\s+/g).slice(1).join(' ');
        if(!query) {
            let embd1 = new RichEmbed()
            .setColor("RED")
            .setDescription("Для поиска игрока укажите ник пользователя.")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(embd1);
        }
    
        try {
    
            osuApi.getUser({ u: query }).then(user => {
                
                if(!user.name) {
                    let embd2 = new RichEmbed()
                    .setColor("RED")
                    .setDescription("Произошла ошибка при получении информации!\nВозможно ты неправильно указал имя имя пользователя.")
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    return message.channel.send(embd2);
                }
    
                let embed = new RichEmbed()
                .setColor("DARK-BLUE")
                .setAuthor(`${user.name}`, `https://a.ppy.sh/${user.id}`)
                .setTitle(`Поиск игрока | Успех!`)
                .addField(`❯\u2000\Статистика`, 
                `•\u2000\**Уровень:** **${user.level}**\n\•\u2000\**Количество игр:** **${user.counts.plays}**\n\•\u2000\**Аккуратность:** **${user.accuracy}**`)
                .addField(`❯\u2000\PP`, 
                `•\u2000\**Всего:** **${user.pp.raw}**\n\•\u2000\**Ранг по миру:** **${user.pp.rank}**\n\•\u2000\**Ранг по миру:** **${user.pp.countryRank} в ${user.country}**`)
                .addField(`❯\u2000\Скоры`, 
                `•\u2000\**На ранг:** **${user.scores.ranked}**\n\•\u2000\**Всего:** **${user.scores.total}**`)
                .addField(`❯\u2000\Ранги на картах(всего)`,
                `•\u2000\**SS:** ${user.counts.SS}\n\•\u2000\**S:** ${user.counts.S}\n\•\u2000\**A:** ${user.counts.A}`)
                .setThumbnail(`https://a.ppy.sh/${user.id}`)
                .setURL(`https://lemmmy.pw/osusig/sig.php?colour=bpink&uname=${query}&countryrank&darkheader&darktriangles&avatarrounding=10`)
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(embed);
            }).catch(err => {
                console.log(err);
                let embd2 = new RichEmbed()
                .setColor("RED")
                .setDescription("Произошла ошибка при получении информации!\nВозможно ты неправильно указал имя имя пользователя.")
                .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                .setTimestamp()
                return message.channel.send(embd2);
            });
        } catch (err) {
            console.log(err);
        }
    }
}