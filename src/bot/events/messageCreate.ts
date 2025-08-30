import { client } from '../client';
import { getPrefix } from '../../database/prefix';
import { handleHello } from '../../commands/hello';
import { handleSetPrefix } from '../../commands/setPrefix';
import { handleBrawlerRanking } from '../../commands/brawlStars/apiConnectionCommands/getBrawlerRanking';
import { handleAddClub } from '../../commands/brawlStars/discordCommands/addClub';
import { handleGetClubs } from '../../commands/brawlStars/discordCommands/getClubs';
import { handleRemoveClub } from '../../commands/brawlStars/discordCommands/removeClub';
import { handleSetProfile } from '../../commands/brawlStars/discordCommands/setProfile';
import { handleGetProfile } from '../../commands/brawlStars/discordCommands/profile';
import { handleSetClubRole } from '../../commands/brawlStars/discordCommands/setClubRole';
import { handleGetClubRole } from '../../commands/brawlStars/discordCommands/getClubRole';
import { handleGetGradeRole } from '../../commands/brawlStars/discordCommands/getGradeRoles';
import { handleSetGradeRole } from '../../commands/brawlStars/discordCommands/setGradeRole';
import { handleSetTrophyRole } from '../../commands/brawlStars/discordCommands/setTrophyRole';
import { handleGetTrophyRole } from '../../commands/brawlStars/discordCommands/getTrophyRole';

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

  if (message.content.startsWith(prefix + 'brawlerranking')) {
    return handleBrawlerRanking(message);
  }

  if (message.content.startsWith(prefix + 'setclub')) {
    return handleAddClub(message);
  }

  if (message.content.startsWith(prefix + 'getclubs')) {
    return handleGetClubs(message);
  }

  if (message.content.startsWith(prefix + 'removeclub')) {
    return handleRemoveClub(message);
  }

  if (message.content.startsWith(prefix + 'setprofile')) {
    return handleSetProfile(message);
  }
  
  if (message.content.startsWith(prefix + 'profile')) {
    return handleGetProfile(message);
  }

  if (message.content.startsWith(prefix + 'setclubrole')) {
    return handleSetClubRole(message);
  }

  if (message.content.startsWith(prefix + 'getclubrole')) {
    return handleGetClubRole(message);
  }

  if (message.content.startsWith(prefix + 'getgraderole')) {
    return handleGetGradeRole(message);
  }

  if (message.content.startsWith(prefix + 'setgraderole')) {
    return handleSetGradeRole(message);
  }

  if (message.content.startsWith(prefix + 'settrophyrole')) {
    return handleSetTrophyRole(message);
  }

  if (message.content.startsWith(prefix + 'gettrophyrole')) {
    return handleGetTrophyRole(message);
  }
}); 