const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();

exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw)
    return msg.channel
      .send(`NSFW channel pliss.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  if (!args[0])
    return msg.channel
      .send(
        `Perintah yang kamu gunakan salah\nCoontoh: \`dd parody <Parody> [language]\``
      )
      .then(msg => msg.delete({ timeout: 10000 }));
  let nick =
    msg.member.nickname !== null
      ? `${msg.member.nickname}`
      : msg.author.username;

  let input = args.join(" ").match(/\w+|('|")([^"]|[^'])+('|")/g);
  let parody = input[0].replace(/["']/g, "").toLowerCase();

  let lang = input[1];
  if (!lang) lang = "english";
  if (lang == "ch") {
    lang = "chinese";
  } else if (lang == "en") {
    lang = "english";
  } else if (lang == "jp") {
    lang = "japanese";
  }
  if (!client.config.LANG.includes(lang.toLowerCase()))
    return msg.channel
      .send("Bahasa yang tersedia adalah `English`, `Japanese` & `Chinese`")
      .then(msg => msg.delete({ timeout: 5000 }));

  let numPages = await api.parody(parody);
  if (!numPages.results || numPages.results.length == 0)
    return msg.channel.send(`Tidak ditemukan doujin dengan parody \`${parody}\``);
  if (numPages.num_pages == 1) {
    let query = numPages.results.filter(x => x.language == lang.toLowerCase());
    if (query.length == 0)
      return msg.channel
        .send(
          `Tidak ditemukan buku dengan bahasa **${lang}**, Coba lagi dengan bahasa yang lain`
        )
        .then(msg => msg.delete({ timeout: 6000 }));

    let rand = client.util.getRandInt(query.length);
    await client.embeds.getInfoEmbed(query[rand].id, msg);
    return;
  }
  try {
    let id = await api.parody(
      parody,
      client.util.getRandInt(numPages.num_pages)
    );
    let langs = id.results.map(x => x.language == lang.toLowerCase() && x.id);
    if (langs.every((val, i, arr) => val === arr[0]))
      return msg.channel
        .send(`Tidak ditemukan buku dengan bahasa **${lang}**, Coba lagi dengan bahasa yang lain`)
        .then(msg => msg.delete({ timeout: 6000 }));
    
    let query = id.results.find(x => x.language == lang.toLowerCase()).id;
    await client.embeds.getInfoEmbed(query, msg);
  } catch (err) {
    console.log(err);
  }
};

exports.conf = {
  aliases: [],
  cooldown: "10"
};

exports.help = {
  name: "parody",
  description: "Mendapatkan doujin dengan parody yang kamu masukkan",
  usage: [
    "parody <Doujin Parody>",
    'parody "alice in wonderlan"',
    "parody overlord <english/japanese/chinese>"
  ]
};
