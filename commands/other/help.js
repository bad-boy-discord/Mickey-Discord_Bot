const { RichEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands", "рудз", "р"],
        usage: "(command)",
        category: "other",
        description: "Показывает все доступные команды бота",
        accessableby: "Пользователи"
    },
    run: async (bot, message, args) => {
        let prefix = db.fetch(`serverprefix_${message.guild.id}`);
        if(!prefix || prefix === null) prefix = "&";

        let welcomeembed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setTitle(`Команда: Помощь.`)
        .setDescription(`**ВАЖНО: Только автор сообщения сможет использовать данные реакции!**\n\nВнизу будут реакции, с помощью которых ты сможешь перемещатся между страницами и смотреть список команд.\nПрефикс бота: **${prefix}**\n\nКатегории:\n0. **Вернутся на главную**\n1. **Развлечения**\n2. **Игры**\n3. **Модерация**\n4. **Другое**\n5. **Музыка**\n6. **Настройка Сервера**`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        
        let msg = await message.channel.send(welcomeembed)
        await msg.react('0️⃣')
        await msg.react('1️⃣');
        await msg.react('2️⃣');
        await msg.react('3️⃣');
        await msg.react('4️⃣');
        await msg.react('5️⃣');
        await msg.react('6️⃣');

    const filter = (reaction, user) => user.id === message.author.id; //user.id !== message.client.user.id
    const collector = msg.createReactionCollector(filter, { time: 1800000 });

        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case "0️⃣":
                    let welcomeembed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Команда: Помощь.`)
                    .setDescription(`**ВАЖНО: Только автор сообщения сможет использовать данные реакции!**\n\nВнизу будут реакции, с помощью которых ты сможешь перемещатся между страницами и смотреть список команд.\nПрефикс бота: **${prefix}**\n\nКатегории:\n0. **Вернутся на главную**\n1. **Развлечения**\n2. **Игры**\n3. **Модерация**\n4. **Другое**\n5. **Музыка**\n6. **Настройка Сервера**`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(welcomeembed);
                break;
                case "1️⃣":
                    let funembed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Категория: Развлечения`)
                    .setDescription(`1. **8ball** - Ответ бота на любой вопрос.\n2. **cat** - Рандомная картинка с котом.\n3. **dog** - Рандомная картинка с собакой.`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(funembed)
                break;
                case "2️⃣":
                    let gameembed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Категория: Игры`)
                    .setDescription(`1. **flipcoin** - Подбросить монетку.\n2. **rps** - Камень, ножницы, бумага.\n\n**Подкатегория: Поиск**\n1. **osu** - Поиск игрока из игры Osu!\n2. **steam** - Поиск пользователя в Steam.`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(gameembed);
                break;
                case "3️⃣":
                    let moderationembed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Категория: Модерация`)
                    .setDescription(`1. **addrole** - Добавить роль пользователю.\n2. **ban** - Забанить пользователя.\n3. **clear** - Очистить сообщения.\n4. **kick** - Кикнуть пользователя.\n5. **removerole** - Удалить роль у пользователя.\n6. **say** - Отправить сообщение от имени бота.\n7. **unban** - Разбанить пользователя(требует **ID пользователя**).\n8. **warn** - Выдать предупреждение пользователю.\n9. **warnlevel** - Посмотреть кол-во варнов у пользователя.\n\n**Будьте осторожны с командой warn**\nДанная команда выдаёт предупреждения по этой схеме:\n1 Предупрежение: - Ничего\n2 Предупрежение: Мут 30 секунд\n3 Предупрежение: Бан`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(moderationembed);
                break;
                case "4️⃣":
                    let otherembed = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Категория: Другое`)
                    .setDescription(`1. **dm** - Написать личное сообщение через бота.\n2. **geninvite** - Создаёт вечное приглашение.\n3. **help** - Список всех команд.\n4. **math** - Калькулятор.\n5. **ping** - Проверка пинга бота.\n6. **randnum** - Сгенерировать рандомную цифру(**пишете: ${prefix}randnum 10 100**(**цифры можно поменять**)).\n7. **report** - Отправить жалобу на пользователя(Приходит создателю сервера).\n8. **reverse** - Отправит ваш текст наоборот.\n9. **roleinfo** - Информация о роли.\n10. **serverinfo** - Информация о сервере.\n11. **uptime** - Время работы бота.\n12. **userinfo** - Информация о пользователе(**Которого упомянете**).\n13. **weather** - Погода в городе/стране.\n\n**Подкатегория: Статистика**\n1. **botstats** - Статистика бота(его состояние).\n\n**Подкатегория: Поддержка**\n1. **bugreport** - Уведомить создателя о баге.\n2. **call** - Вызвать создателя на сервер.`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(otherembed);
                break;
                case "5️⃣":
                    let music = new RichEmbed()
                    .setColor('DARK-BLUE')
                    .setTitle(`Категория: Музыка`)
                    .setDescription(`**ВАЖНО: Все команды требуют входа в голосовой канал, если вы не будете находится в голосовом канале, то вы не сможете использовать данные команды.**\n\n1. **np** - Показывает песню, которая играет на данный момент.\n2. **pause** - Ставит песню на паузу.\n3. **play** - Включает песню(*можно по ссылке, или по названию*).\n4. **queue** - Показывает всю очередь песен.\n5. **resume** - Включает песню(*после использования команды pause*).\n6. **skip** - Пропускает песню.\n7. **stop** - Выключает все песни из очереди.\n8. **loop** - Повторяет песню.`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(music);
                break;
                case "6️⃣":
                    let settings = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setTitle(`Категория: Настройка сервера`)
                    .setDescription(`**ВАЖНО: Только пользователь с правом на Управление сервером сможет управлять данными командами!**\n\n1. **setautorole** - Установить авто-роль для выдачи участнику, при его заходе.\n2. **setwchannel** - Установить канал для приветствий с участниками.\n3. **setbyechannel** - Установить канал для прощания с участниками.\n4. **prefix** - Сбросить/Установить префикс сервера.\n5. **config** - Посмотреть конфиг сервера.\n6. **antilink** - Система Anti-Link.\n7. **antispam** - Система Anti-Spam.`)
                    .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    msg.edit(settings);
                break;
            }   
        })
    }
}