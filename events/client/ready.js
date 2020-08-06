module.exports = bot => {
    console.log("[ЛОГИ] Приятного использования!")
    console.log("[ЛОГИ] github.com/MANECOOFF")
    console.log(`[ЛОГИ] ${bot.user.username} онлайн!`) // Ниже.
    let statuses = [
        `${bot.users.size} пользователей!`,
        `Создатель: bad boy#1046`,
        '&help',
        `${bot.guilds.size} серверов!`,
        `Префикс: &`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
    }, 15000)
}
