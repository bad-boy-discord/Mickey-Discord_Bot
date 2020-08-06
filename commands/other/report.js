const { RichEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "report",
    aliases: [],
    usage: "&report",
    category: "other",
    description: "Отправляет жалобу на пользователя",
    accessableby: "Пользователи"
  },
  run: async(bot, message, args) => {
    let user = message.mentions.members.first(),
        reason = args.slice(1).join(' '),
        author = message.author,
        guild = message.guild;

    if(!user) {
      let noment = new RichEmbed()
      .setColor("RED")
      .setDescription(`**Ошиюка**\n\nДля отправки жалобы, вам необходимо упоминуть пользователя.`)
      .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
      .setTimestamp()
      return message.channel.send(noment);
    };
    if(!reason) {
      let noreason = new RichEmbed()
      .setColor("RED")
      .setDescription(`**Ошиюка**\n\nДля отправки жалобы, вам необходимо указать причину жалобы.`)
      .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
      .setTimestamp()
      return message.channel.send(noreason);
    };

    try {
      let jaloba = new RichEmbed()
      .setColor(`DARK-BLUE`)
      .setDescription(`Вы отправили жалобу на пользователя, вот детали жалобы:\nПользователь: <@${user.id}>\nПричина: ${reason}\n--------------\nЖалоба будет отправлена создателю сервера.`)
      .setFooter(`Запросил: ${author.username}`, author.displayAvatarURL)
      .setTimestamp()

      message.channel.send(jaloba);

      let toowner = new RichEmbed()
      .setColor(`DARK-BLUE`)
      .setDescription(`Поступила жалоба на пользователя:\nПользователь: <@${user.id}>\nПричина: ${reason}\n--------------\nПримите решение.`)
      .setTimestamp()

      let msg = await message.guild.owner.send(toowner);

      await msg.react('✅');
      await msg.react('❌');

    const filter = (reaction, user) => user.id !== message.client.user.id;
    const collector = msg.createReactionCollector(filter, { time: 1800000 });

        collector.on('collect', (reaction, user) => {
        switch(reaction.emoji.name) {
            case "✅":
            let da = new RichEmbed()
            .setColor("GREEN")
            .setTitle(`Создатель принял решение.`)
            .setDescription(`Создатель дал решение:\nСоздатель одобряет жалобу на данного пользователя.\nНарушителю будет выдан варн.`)
            .setFooter(`${guild.name} | Решение создателя.`)
            .setTimestamp()
            author.send(da)

            let warns = db.fetch(`warns_${message.guild.id}_${user.id}`)
            if(warns === null) warns = 0;
            db.add(`warns_${message.guild.id}_${user.id}`, 1)
            break;

            case "❌":
            let net = new RichEmbed()
            .setColor('RED')
            .setTitle(`Решение создателя сервера.`)
            .setDescription(`Создатель принял решение:\nСоздатель отклоняет жалобу на данного пользователя.\nНарушителю не будет выдан варн.\n-------------------\nЗа ложные репорты вы можете получить варн.`)
            .setFooter(`${guild.name} | Решение создателя.`)
            .setTimestamp()
            author.send(net);
            break;
        }
        });
    }catch(e) {
      console.error(e);
    }
  }
}