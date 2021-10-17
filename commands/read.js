exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw)
    return msg.channel
      .send(`NSFW channel pliss.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  let nick =
    msg.member.nickname !== null
      ? `${msg.member.nickname}`
      : msg.author.username;
  let id = args[0];
  if (!args[0])
    return msg.channel
      .send(`**${nick}**, tolong berikan aku kode doujinnya`)
      .then(msg => msg.delete({ timeout: 5000 }));

  try {
    let m = await client.embeds.getInfoEmbed(id, msg);
  } catch (e) {
    if (e.message == "Doujin Tidak Ditemukan") {
      return msg.channel
        .send(`**${nick}**, Aku tidak dapat menemukan doujin yang kamu maksud`)
        .then(msg => msg.delete({ timeout: 5000 }));
    }
  }
};

exports.conf = {
  aliases: [],
  cooldown: "15"
};

exports.help = {
  name: "read",
  description: "Baca nHentai manga di Discord",
  usage: "read <Book_ID>"
};
