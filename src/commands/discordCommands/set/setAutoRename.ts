import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { setAutoRename, getAutoRename } from '../../../database/autoRename';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleSetAutoRename(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const currentAutoRename = await getAutoRename(interaction.guild);
  const autoRename = interaction.options.getBoolean('rename', false) ?? !currentAutoRename;

  if (currentAutoRename === autoRename) {
    if (currentAutoRename) {
      return interaction.editReply(traductions.AUTO_RENAME_ALREADY_ENABLED);
    } else {
      return interaction.editReply(traductions.AUTO_RENAME_ALREADY_DISABLED);
    }
  }

  await setAutoRename(interaction.guild, autoRename);

  if (autoRename) {
    return interaction.editReply(traductions.AUTO_RENAME_ENABLED);
  } else {
    return interaction.editReply(traductions.AUTO_RENAME_DISABLED);
  }
}
