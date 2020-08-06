const { default_prefix } = require("../../settings/botconfig.json");
const db = require("quick.db");

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = db.get(`serverprefix_${message.guild.id}`);
    if(prefix === null) prefix = default_prefix;

    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
    if (!message.guild) return;
}