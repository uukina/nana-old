const pkg = require("../package.json");
const axios = require("axios");

module.exports = async (client) => {
  const version = pkg.version;

  const users = client.users.cache.size;
  const channels = client.channels.cache.size;
  const guilds = client.guilds.cache.size;

  console.log(
    `${client.user.username} Bersiap untuk bermain dengan ${users} pengguna, di ${channels} channels pada ${guilds} guilds...`
  );

  client.setInterval(async () => {
    let userFormat = client.util.nFormatter(users);
    let guildFormat = client.util.nFormatter(client.guilds.cache.size);

    let status = [
      `dengan ${userFormat} users`,
      `Bot v${version}`,
      `di ${guildFormat} server 🎉`,
      "Kapten, apakah kita akan berlayar?",
      "NTR atau Vanilla?",
      "bantu saya beli rokok | nh donate",
    ];
    let rand = client.util.getRandInt(status.length);

    client.user.setActivity(status[rand], { type: "PLAYING" });
  }, 6e4);
};
