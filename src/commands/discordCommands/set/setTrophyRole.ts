import {
  ChatInputCommandInteraction,
  Guild,
  Message,
  Role
} from 'discord.js';
import { setTrophyRole } from '../../../database/trophyRole';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleSetTrophyRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const roleMention = interaction.options.getRole('role', true);
  if (!(roleMention instanceof Role)) {
    return interaction.editReply(traductions.SET_TROPHY_ROLE_INVALID_ROLE);
  }

  const trophies = interaction.options.getInteger('trophies', true);
  if (trophies < 0 || trophies > 1000000) {
    return interaction.editReply(traductions.SET_TROPHY_ROLE_INVALID_TROPHIES);
  }

  await setTrophyRole(interaction.guild, roleMention, trophies);
  return interaction.editReply(traductions.SET_TROPHY_ROLE_SUCCESS(roleMention.name, trophies));
}
