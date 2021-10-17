const { MessageEmbed } = require("discord.js");

exports.run = async (client, msg, args, color) => {
  const app = await client.fetchApplication();

  if (!args[0]) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("LenaNuclear helps")
      .setDescription(
        `LenaNuclear membantu kamu untuk membaca doujinshi di nHentai dari Discord channel kamu, `
      )
      .addField(
        "Daftar Perintah",
        `- dd random -- Mendapatkan random doujinshi
- dd read \`<ID>\` -- Baca doujinshi dari kode/id yang di masukkan
- dd lang \`<english/japanese/chinese>\` -- Mendapatkan random doujinshi dari bahasa yang dimasukkan. Kamu juga dapat menggunakan alias.\nContoh: \`<ch/en/jp>\`
- dd download \`<Book ID>\` -- Download doujin pada file zip
- dd favorite \`[add/delete]\` \`<ID>\` -- Simpan ID doujin favorite kamu
- dd parody \`<Parody> [Bahasa]\` -- Mendapatkan random doujinshi dengan parody yang kamu masukkan
- dd tag \`<Tag> [Bahasa]\` -- Mendapatkan random doujinshi dengan tag yang kamu masukkan
- dd search \`<Query> [Bahasa]\` -- Mencari di web nHentai
- dd donate -- Menampilkan halaman donasi`
      )
      .setFooter(`LenaNuclear V${client.version} || <> = required, [] = optional`)
      .addField(
        "Changelogs",
        `- **BANNED** beberapa tag, jadi kamu tidak bisa membaca doujin itu dariku`
      )
      .setTimestamp();
    msg.channel.send(embed);
  } else {
    let cmd = args[0];
    if (
      client.commands.has(cmd) ||
      client.commands.get(client.aliases.get(cmd))
    ) {
      let command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));
      if (command.conf.owner)
        return msg.channel.send(
          `Maaf **${msg.author.username}**, Aku tidak dapat menemukan perintah \`${cmd}\`.`
        );
      let name = `${client.config.PREFIX} ${command.help.name}`;
      let desc = command.help.description;
      let aliases = command.conf.aliases;
      let usage = command.help.usage;
      let usages = Array.isArray(usage) ? usage : [usage];

      let embed = new MessageEmbed()
        .setAuthor(
          client.user.username + " Help Description",
          client.user.displayAvatarURL
        )
        .setTitle(
          aliases[0]
            ? `${name} ❱ ${client.config.PREFIX} ${aliases.join(
                ` ❱ ${client.config.PREFIX} `
              )}`
            : name
        )
        .setDescription(desc)
        .setColor(color)
        .addField(
          "Penggunaan",
          usages[0]
            ? `${client.config.PREFIX} ${usages.join(
                `\n${client.config.PREFIX} `
              )}`
            : usages
        );
      return msg.channel.send(embed);
    }
    if (
      !client.commands.has(cmd) ||
      !client.commands.get(client.aliases.get(cmd))
    ) {
      msg.channel.send(
        `Maaf **${msg.author.username}**, Aku tidak dapat menemukan perintah \`${cmd}\`.`
      );
    }
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "help",
  description: "Manampilkan daftar perintah bot",
  usage: "help"
};
