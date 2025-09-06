import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { setLang, getLang } from '../../../database/lang';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleSetLang(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  let traductions = await getTraductions(interaction.guild);

  const currentLang = await getLang(interaction.guild);
  const lang = interaction.options.getString('lang', true);

  if (currentLang === lang) {
    return interaction.editReply(traductions.LANG_ALREADY);
  }

  await setLang(interaction.guild, lang);
  traductions = await getTraductions(interaction.guild);
  return interaction.editReply(traductions.LANG_CHANGED(currentLang));
}
