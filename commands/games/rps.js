const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions/promptMessage");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    config: {
        name: "rps",
        description: "Камент,Ножницы,Бумага!",
        usage: "<commands>",
        category: "games",
        accessableby: "Members",
        aliases: ["rpss"] 
    }, 
    run: async (bot, message, args, db) => {
        const embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription("Нажми на одну из трёх эмоджи для начала игры!")
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "Ты победил!";
            } else if (me === clientChosen) {
                return "Ничья!";
            } else {
                return "Ты проиграл!";
            }
        }
    }
}