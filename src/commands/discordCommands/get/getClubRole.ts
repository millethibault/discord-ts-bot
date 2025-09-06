import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getClubRoles } from '../../../database/clubRole';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetClubRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  const guildRoles = await getClubRoles(interaction.guild);

  if (guildRoles.length === 0) {
    return interaction.editReply(traductions.GET_CLUB_ROLE_EMPTY(interaction.guild.name));
  }

  const list = guildRoles
    .map(role => `${role.clubName} (\`${role.clubTag}\`) → <@&${role.roleId}>`)
    .join('\n');

  return interaction.editReply(
    traductions.GET_CLUB_ROLE_LIST(interaction.guild.name, guildRoles.length, list)
  );
}
