exports.run = async (client, msg, args) => {
  msg.delete({ timeout: 5000 });
  if (!args || args.length < 1)
    return msg.reply("Harus Menyediakan perintah untuk dimuat ulang");
  const commandName = args[0];
  // Check if the command exists and is valid
  if (!client.commands.has(commandName)) {
    return msg.reply("Perintah tersebut tidak tersedia");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  msg
    .reply(`Perintah ${commandName} telah di muat ulang`)
    .then(msg => msg.delete({ timeout: 5000 }));
};

exports.conf = {
  aliases: [],
  owner: true
};

exports.help = {
  name: "reload"
};
