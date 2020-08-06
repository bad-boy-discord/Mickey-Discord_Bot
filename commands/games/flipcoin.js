const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "flipcoin",
        description: "...",
        category: "games",
        usage: "&flipcoin",
        accessableby: "Пользователи",
        aliases: ["flpcoin", "fcoin", "fcn"]
    },
    run: async(bot, message, args, db) => {
        let variables = ['Орёл', 'Решка'];
        let rand = variables[Math.floor(Math.random() * variables.length)];

        let embed = new RichEmbed()
        .setColor('DARK-BLUE')
        .setTitle(`Игра: Flip-Coin`)
        .setDescription(`Монетка упала и показала сторону - **${rand}**`)
        .setTimestamp()
        return message.channel.send(embed);

    }
}