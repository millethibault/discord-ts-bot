import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getAutoRename } from '../../../database/autoRename';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetAutoRename(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  const autoRename = await getAutoRename(interaction.guild);

  return interaction.editReply(
    autoRename ? traductions.GET_AUTO_RENAME_ENABLED : traductions.GET_AUTO_RENAME_DISABLED
  );
}
