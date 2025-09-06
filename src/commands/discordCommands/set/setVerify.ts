import {
  ChatInputCommandInteraction,
  Guild,
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  GuildChannel
} from 'discord.js';
import { setVerify, getVerify } from '../../../database/verify';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleSetVerify(
  interaction: ChatInputCommandInteraction & { guild: Guild; channel: GuildChannel }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const currentVerify = await getVerify(interaction.guild);
  const verify = interaction.options.getBoolean('verify', false) ?? !currentVerify;

  if (currentVerify === verify) {
    return interaction.editReply(
      currentVerify ? traductions.VERIFY_ALREADY_ENABLED : traductions.VERIFY_ALREADY_DISABLED
    );
  }

  if (verify) {
    await setVerify(interaction.guild, verify);
    return interaction.editReply(traductions.VERIFY_ENABLED);
  }

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('confirm-disable')
      .setLabel('Valider')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('cancel-disable')
      .setLabel('Annuler')
      .setStyle(ButtonStyle.Secondary)
  );

  const reply = await interaction.editReply({
    content: traductions.VERIFY_DISABLE_WARNING,
    components: [row],
  });

  try {
    const confirmation = await reply.awaitMessageComponent({
      componentType: ComponentType.Button,
      time: 15000,
      filter: i => i.user.id === interaction.user.id,
    });

    await confirmation.deferUpdate();

    if (confirmation.customId === 'confirm-disable') {
      await setVerify(interaction.guild, verify);
      return confirmation.editReply({
        content: traductions.VERIFY_DISABLED,
        components: [],
      });
    } else {
      return confirmation.editReply({
        content: traductions.VERIFY_CANCELLED,
        components: [],
      });
    }
  } catch (error) {
    console.log(error);
    return interaction.editReply({
      content: traductions.VERIFY_TIMEOUT,
      components: [],
    });
  }
}
