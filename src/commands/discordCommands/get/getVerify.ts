import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getVerify } from '../../../database/verify';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetVerify(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  const verify = await getVerify(interaction.guild);

  return interaction.editReply(
    verify ? traductions.GET_VERIFY_ENABLED : traductions.GET_VERIFY_DISABLED
  );
}
