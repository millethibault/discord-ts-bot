/*import { client } from '../client';
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
import { handleUpdateMember } from '../../commands/brawlStars/discordCommands/updateMember';

client.on('messageCreate', async message => {
  if (message.author.bot || !client.user || !message.guild) return;
  if(!message.inGuild()) return;

  const args = message.content.split(/\s+/);
  const command = args[0];

  const prefix = getPrefix(message.guild.id);

  if (message.content.trim() === `<@${client.user.id}>` || message.content.trim() === `<@!${client.user.id}>`) {
    return message.channel.send(`🔧 Le préfixe sur ce serveur est : \`${prefix}\``);
  }

  if (command === prefix + 'hello') {
    return handleHello(message);
  }

  if (command === prefix + 'setprefix') {
    return handleSetPrefix(message);
  }

  if (command === prefix + 'brawlerranking') {
    return handleBrawlerRanking(message);
  }

  if (command === prefix + 'setclub') {
    return handleAddClub(message);
  }

  if (command === prefix + 'getclubs') {
    return handleGetClubs(message);
  }

  if (command === prefix + 'removeclub') {
    return handleRemoveClub(message);
  }

  if (command === prefix + 'setprofile') {
    return handleSetProfile(message);
  }
  
  if (command === prefix + 'profile') {
    return handleGetProfile(message);
  }

  if (command === prefix + 'setclubrole') {
    return handleSetClubRole(message);
  }

  if (command === prefix + 'getclubrole') {
    return handleGetClubRole(message);
  }

  if (command === prefix + 'getgraderole') {
    return handleGetGradeRole(message);
  }

  if (command === prefix + 'setgraderole') {
    return handleSetGradeRole(message);
  }

  if (command === prefix + 'settrophyrole') {
    return handleSetTrophyRole(message);
  }

  if (command === prefix + 'gettrophyrole') {
    return handleGetTrophyRole(message);
  }

  if (command === prefix + 'updateprofile') {
    return handleUpdateMember(message);
  }
}); */