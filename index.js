const { Client, Collection, RichEmbed } = require("discord.js");
const { token } = require('./settings/botconfig.json');
const bot = new Client();
const db = require('quick.db');
require('./server');

bot.queue = new Map();

['aliases', 'commands'].forEach(x => bot[x] = new Collection());
['command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('guildCreate', (guild) => {
    db.set(`antilink_${guild.id}`, 0)
    db.set(`antispam_${guild.id}`, 0)
    let guildID = guild.id;
    let guildName = guild.name;
    let guildOwner = guild.owner.displayName;
    let guildOwnerID = guild.owner.id;
    let embed = new RichEmbed()
    .setColor("GREEN")
    .setTitle(`Бот был добавлен на сервер!`)
    .setDescription(`Информация сервера:
Имя сервера: **${guildName}**
Айди сервера: **${guildID}**
Создатель сервера: **${guildOwner}**
Айди создателя сервера: **${guildOwnerID}**`)
    bot.users.get("545956523571150858").send(embed);

    let welcomeembed = new RichEmbed()
    .setColor("DARK-BLUE")
    .setAuthor(`${guildName} | ${guildOwner}`)
    .setTitle(`Спасибо за добавление бота!`)
    .setDescription(`Надеюсь, что бот понравится вам и вы его оставите!
Префикс бота: **&**
Список команд: &help
Если вы читаете данное сообщение, то сообщите всем участникам сервера с упоминанием @everyone префикс бота(**указан чуть выше**)

С уважением, bad boy#1046
Если вы заметили баги, то напишите &call или &bugreport

Так-же вы можете настроить сервер!

Если вы хотите получать сообщения о приходе участников, то на сервере напишите команду:
&setwchannel (#Упоминание канала) - Писать без скобок.

Если вы хотите получать сообщения о уходе участников, то на сервере напишите команду:
&setbyechannel (#Упоминание канала) - Писать без скобок

Если вы хотите получать логи(о выдаче бана, кика, мута и размута)
&setlogchannel (#Упоминание канала) - Писать без скобок

Если вы хотите получать логи о изменений/удалений сообщений
&setmlogchannel (#Упоминание канала) - Писать без скобок

Если вы хотите сделать выдачу роли при заходе участника на сервер, то на сервере напишите команду:
&setautorole (@Упоминание роли) - Писать без скобок.`)
    .setFooter(`Спасибо за добавление! <3`)
    .setTimestamp()
    guild.owner.send(welcomeembed);
});

bot.on('guildMemberAdd', async (member) => {
let channel = db.get(`welcomechannel_${member.guild.id}`);
if(channel === null) {
    return;
}
let autorole = db.get(`autorole_${member.guild.id}`);
if(autorole === null) {
    return;
}

let descs = [
    `**Воу! На сервер зашёл новый пользователь!**`,
    `**Вот и легенда зашёл(а)!**`,
    `**Вечеринка уже пополняется!**`,
    `**Сервер пополняет коллекцию новым пользователем!**`,
    `**Давайте скажем привет новому пользователю сервера!**`
];
let randdesc = Math.floor(Math.random() * descs.length);

let embed = new RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Добро пожаловать на сервер!`)
    .setDescription(`${descs[randdesc]}`)
    .addField(`**Имя нашего участника:**`,
    `${member.toString()}`)
    .addField("На всяких случай, если случайно забанил(а), вот айди:",
    `${member.id}`)
    .setTimestamp()
member.guild.channels.get(channel).send(embed);

member.addRole(autorole);
});

bot.on("guildMemberRemove", function(member) {
let channel = db.get(`leavechannel_${member.guild.id}`);
if(channel === null) {
    return;
}

let descs = [
    `**К сожалению, данный сервер покинул пользователь :(**`,
    `**Нашей легенде пришлось покинуть сервер...**`,
    `**Вечеринка начинает расходится!**`,
    `**С сервера уходит один пользователь...**`,
    `**Давайте попрощаемся с пользователем...**`
];
let rand = descs[Math.floor(Math.random() * descs.length)];

let embed = new RichEmbed()
.setColor("RED")
.setAuthor(`От нас ушёл пользователь :(`)
.setDescription(`${rand}`)
.addField("Всё, что мы о нём помним, это его ник:",
`${member.toString()}`)
.setTimestamp()
member.guild.channels.get(channel).send(embed)
});
  
  
bot.on('message', (message) => {
    let anti = db.get(`antilink_${message.guild.id}`);
    if(anti === null) anti = 0;
    if(anti === 1) {
        if(message.content.includes('https://')) {
            message.delete()
            let fy = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Была замечена реклама!**\nСообщение было удалено.`)
            .setTimestamp()
            return message.channel.send(fy);
        }else if(message.content.includes('http://')) {
            message.delete()
            let fyy = new RichEmbed()
            .setColor("RED")
            .setDescription(`**Была замечена реклама!**\nСообщение было удалено.`)
            .setTimestamp()
            return message.channel.send(fyy);;
        }
    }else if(anti === 0) {
        return;
    }
})
  
const usersMap = new Map();
const LIMIT = 7;
const TIME = 15000;
const DIFF = 3000;

bot.on(`message`, (message) => {
    let dbbb = db.get(`antispam_${message.guild.id}`);
    if(dbbb === null) dbbb = 0;
    if(dbbb === 1) {
        if(message.author.bot) return;
        if(usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            console.log(difference);

            if(difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared timeout');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    console.log('Removed from RESET.');
                }, TIME);
                usersMap.set(message.author.id, userData);
            }else {
                ++msgCount;
                if(parseInt(msgCount) === LIMIT) {
                    let roleid = db.get(`antispamrole_${message.guild.id}`);
                    const role = message.guild.roles.get(roleid);
                    message.member.addRole(role)
                    let muted = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`**${message.author.username} был замучен за спам.**`)
                    .setFooter(`Анти-Спам Защита`)
                    message.channel.send(muted);
                    setTimeout(() => {
                        message.member.removeRole(role)
                        let unmuted = new RichEmbed()
                        .setColor("DARK-BLUE")
                        .setDescription(`**${message.author.username} был размучен.**`)
                        .setFooter(`Анти-Спам Защита`)
                        message.channel.send(unmuted);
                    }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
            }
        }
        else {
            let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.');
            }, TIME);
            usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
            });
        }
    }else if(dbbb === 0){
        return;
    }
});

bot.login(token);