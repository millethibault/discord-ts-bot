import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getTrophyRole } from '../../../database/trophyRole';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetTrophyRole(
  interaction: ChatInputCommandInteraction & {guild: Guild}
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  if (!interaction.guild) {
    return interaction.editReply(traductions.GET_TROPHY_ROLE_NOT_IN_GUILD);
  }

  const trophyRoles = await getTrophyRole(interaction.guild);
  if (!trophyRoles[0]) {
    return interaction.editReply(traductions.GET_TROPHY_ROLE_EMPTY(interaction.guild.name));
  }

  const list = trophyRoles
    .sort((a, b) => b.trophies - a.trophies)
    .map(role => `+ de \`${role.trophies.toLocaleString()}\` : <@&${role.roleId}>`)
    .join('\n');

  return interaction.editReply(traductions.GET_TROPHY_ROLE_LIST(interaction.guild.name, list));
}