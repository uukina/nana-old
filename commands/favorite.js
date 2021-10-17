exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw || msg.channel.nsfw == false)
    return msg.channel
      .send(`NSFW channel pliss.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  client.channels.fetch(msg.channel.id);

  let nick = msg.member.nickname || msg.author.username;
  if (args[0] == "add") {
    let bookId = args[1];
    let res = await client.embeds.getById(bookId);
    let info = client.embeds.getInfo(res);
    let favorite = await client.favorite.getUserFavoritID(msg.author.id);
    favorite = favorite.find(x => x.bookID == bookId);
    if (!favorite) {
      client.favorite.setUserFavoritID(msg.author.id, res.id);
      return msg.channel
        .send(`${nick} kamu telah menambahkan **${res.title.pretty}** ke **Favorite**`)
        .then(msg => msg.delete({ timeout: 7000 }));
    }
    return msg.channel
      .send(`${nick} ID ini sudah ada di daftar **Favorite** kamu`)
      .then(msg => msg.delete({ timeout: 7000 }));
  }
  if (args[0] == "delete") {
    let bookId = args[1];
    let res = await client.embeds.getById(bookId);
    let info = client.embeds.getInfo(res);
    let favorite = await client.favorite.getUserFavoritID(msg.author.id);
    favorite = favorite.find(x => x.bookID == bookId);
    if (!favorite) {
      return msg.channel
        .send(`${nick} kamu tidak punya doujin dengan ID tersebut`)
        .then(msg => msg.delete({ timeout: 7000 }));
    }

    client.favorite.deleteUserFavoritID(msg.author.id, bookId);
    return msg.channel
      .send(
        `${nick}, **${res.title.pretty}** telah dihapus dari **Favorite**`
      )
      .then(msg => msg.delete({ timeout: 5000 }));
  }
  if (args[0] == "look") {
    try {
      var member =
        msg.mentions.members.first() || msg.guild.members.get(args[1]);
      await client.favorite.favoriteEmbed(msg, member.id);
    } catch (e) {
      if (e.message == "Tidak dapat membaca property 'title' pada undefined") {
        return msg.channel
          .send(`${member.user.username} kamu tidak punya ID doujin apapun`)
          .then(msg => msg.delete({ timeout: 7000 }));
      }
    }
  }
  if (!args[0]) {
    try {
      await client.favorite.favoriteEmbed(msg, msg.author.id);
    } catch (e) {
      if (e.message == "Tidak dapat membaca property 'title' pada undefined") {
        return msg.channel
          .send(`${nick} kamu tidak punya ID doujin apapun`)
          .then(msg => msg.delete({ timeout: 7000 }));
      }
    }
  }
};

exports.conf = {
  aliases: ["favorites", "fav"],
  cooldown: 3
};

exports.help = {
  name: "favorite",
  description: "Simpan ID doujin favorite kamu",
  usage: ["favorite add <BookID>", "favorite delete <BookID>"]
};
