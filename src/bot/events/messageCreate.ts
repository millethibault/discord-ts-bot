import { client } from '../client';
import { getPrefix } from '../../database/prefix';
import { handleHello } from '../../commands/hello';
import { handleSetPrefix } from '../../commands/setPrefix';
import { handleBrawlerRanking } from '../../commands/brawlStars/getBrawlerRanking';

client.on('messageCreate', async message => {
  if (message.author.bot || !client.user || !message.guild) return;
  if(!message.inGuild()) return;

  const prefix = getPrefix(message.guild.id);

  if (message.content.trim() === `<@${client.user.id}>` || message.content.trim() === `<@!${client.user.id}>`) {
    return message.channel.send(`🔧 Le préfixe sur ce serveur est : \`${prefix}\``);
  }

  if (message.content.startsWith(prefix + 'hello')) {
    return handleHello(message);
  }

  if (message.content.startsWith(prefix + 'setprefix')) {
    return handleSetPrefix(message);
  }

  if (message.content.startsWith(prefix + 'brawlerRanking')) {
    return handleBrawlerRanking(message);
  }
}); 