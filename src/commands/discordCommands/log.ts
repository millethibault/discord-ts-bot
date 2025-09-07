import {
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  Message,
  PermissionFlagsBits,
  Guild,
  EmbedBuilder
} from 'discord.js';
import { getLog } from '../../database/log';
import { getTraductions } from '../../traductions/tradFunctions';

export async function handleLog(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let offset = 0;
  const limit = 10;

  const logs = await getLog(interaction.guild, offset, limit);

  const formatLogs = (logs: any[]) =>
    logs.length === 0
      ? traductions.LOG_EMPTY
      : logs
          .map(log => {
            const timestamp = `<t:${Math.floor(new Date(log.datetime).getTime() / 1000)}:f>`;
            const member = `<@${log.memberId}>`;
            const action = log.addOrRemove ? traductions.LOG_ADDED : traductions.LOG_REMOVED;
            const role = `<@&${log.roleId}>`;
            return `• ${timestamp}\n${member} ${action} - ${role}`;
          })
          .join('\n\n');

  const embed = new EmbedBuilder()
    .setTitle(traductions.LOG_TITLE)
    .setDescription(formatLogs(logs))
    .setColor(0x5865F2)
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('prev').setLabel('⬅️').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('next').setLabel('➡️').setStyle(ButtonStyle.Secondary)
  );

  const message = await interaction.editReply({
    embeds: [embed],
    components: [row]
  });

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60 * 60 * 1000
  });

  collector.on('collect', async i => {
    if (i.user.id !== interaction.user.id) return;

    if (i.customId === 'next') offset += limit;
    if (i.customId === 'prev') offset = Math.max(0, offset - limit);

    const newLogs = await getLog(interaction.guild, offset, limit);

    const updatedEmbed = EmbedBuilder.from(embed).setDescription(formatLogs(newLogs));

    await i.update({
      embeds: [updatedEmbed],
      components: [row]
    });
  });

  return message;
}


import { SlashCommandBuilder } from 'discord.js';
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('log')
  .setDescription(tradEn.LOG_COMMAND_DESCRIPTION)
  .setDescriptionLocalizations({
    "fr": tradFr.LOG_COMMAND_DESCRIPTION,
    "en-GB": tradEn.LOG_COMMAND_DESCRIPTION,
    "en-US": tradEn.LOG_COMMAND_DESCRIPTION
  })