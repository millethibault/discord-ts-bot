import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetLang(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  return interaction.editReply(traductions.GET_LANG);
}
