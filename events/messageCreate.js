const { prefix } = require(`../config.json`);
const cooldown = require("../utils/cooldown")

module.exports = client => {
    client.on("messageCreate", (message) => {
        if (message.content.startsWith(prefix) == false) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (command == undefined) return;

        //Cooldown
        const cooldownTime = cooldown(command, message.author.id);
        if (cooldownTime) return message.channel.send({ content: `Bu Komutu Tekrar Kullanmak İçin Lütfen ${cooldownTime} Saniye Bekle.` })

        try {
            command.execute(message);
        } catch (e) {
            console.log(e);
            return message.channel.send({
                content: 'Bu Komut Şu Anda Hatalı Lütfen Ruler`Grave#9102 ile iletişime geçin'
            });
        };

    })
};