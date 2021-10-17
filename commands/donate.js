const Discord = require("discord.js");
const pkg = require("../package.json");

exports.run = async (client, msg, args, color) => {
  const app = await client.fetchApplication();

  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(
      `**${msg.member.user.tag}** Selamat datang di halaman donasi, kamu dapat berdonasi di [Saweria](https://saweria.co/doujindesu) atau kamu dapat mengirim pesan ke owner bot${app.owner.tag}.\n\n**Thank You**`
    )
    .setFooter(`© UukxLena | ${pkg.version}`);
  msg.channel.send(embed);
};

exports.conf = {
  aliases: ["donation"]
};

exports.help = {
  name: "donate",
  description: "Bantu owner bot beli rokok",
  usage: "donate"
};
