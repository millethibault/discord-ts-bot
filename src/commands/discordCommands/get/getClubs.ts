import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getClub } from '../../../database/club';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetClubs(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  const clubs = await getClub(interaction.guild);

  if (!clubs[0]) {
    return interaction.editReply(traductions.GET_CLUBS_EMPTY(interaction.guild.name));
  }

  const list = clubs
    .map(club => `${club.clubName} (\`${club.clubTag}\`)`)
    .join('\n');

  return interaction.editReply(
    traductions.GET_CLUBS_LIST(interaction.guild.name, clubs.length, list)
  );
}
