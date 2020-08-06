const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "8ball",
        description: "Отвечает на твой вопрос.",
        usage: "&8ball (вопрос)",
        category: "fun",
        accessableby: "Пользователи",
        aliases: ["8bal", "ball"]
    },
    run: async(bot, message, args) => {
    const Answers= ['Да','Нет','Может быть','Уверен, что да','Почему нет?','Почему да?','Не сомневаюсь','Инфа сотка','Мммм, хз','Лол','Я так не думаю','Вообще-то да','Вообще-то нет', 'Отлично', 'Хорошо', 'Прекрасно', 'Изумительно!'];
    let aanswer = Math.floor(Math.random() * Answers.length);

    let argg = args.slice(0).join(' ');

    if(!argg) {
        let noargs = new RichEmbed()
            .setColor("RED")
            .setTitle("Задай вопрос, чтобы бот дал любой ответ.")
            .setTimestamp()
            return message.channel.send(noargs);
    }
    if(argg) {
        let withargs = new RichEmbed()
            .setColor("RANDOM")
            .setTitle("Задай вопрос и получи ответ!")
            .setDescription(`Твой вопрос:\n**${argg}**\n--------------------\n\Ответ бота:\n**${Answers[aanswer]}**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(withargs);
    }
    }
}