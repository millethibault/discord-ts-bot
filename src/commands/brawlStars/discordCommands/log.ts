import { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, InteractionResponse, Message, PermissionFlagsBits, Guild, EmbedBuilder } from 'discord.js';
import { getLog } from '../../../database/log'; // Assure-toi que le chemin est correct

export async function handleLog(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
  let offset = 0;
  const limit = 10;

  const logs = await getLog(interaction.guild, offset, limit);


    const formatLogs = (logs: any[]) =>
    logs.map(log =>
        `• <t:${Math.floor(new Date(log.datetime).getTime() / 1000)}:f>\n<@${log.memberId}> ` +
        `${log.addOrRemove ? '➕ Ajouté' : '➖ Retiré'} - <@&${log.roleId}>`
    ).join('\n\n') || 'Aucun log trouvé.';

    const embed = new EmbedBuilder()
    .setTitle('📜 Historique des rôles')
    .setDescription(formatLogs(logs))
    .setColor(0x5865F2) // Couleur Discord "Blurple"
    .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('prev').setLabel('⬅️').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('next').setLabel('➡️').setStyle(ButtonStyle.Secondary)
    );

    const message = await interaction.editReply({
    embeds: [embed],
    components: [row],
    });


  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 5 * 60 * 1000 // 5 minutes
  });

  collector.on('collect', async i => {
    if (i.user.id === interaction.user.id) {

        if (i.customId === 'next') offset += limit;
        if (i.customId === 'prev') offset = Math.max(0, offset - limit);

        const newLogs = await getLog(interaction.guild, offset, limit);

        await i.update({
        content: formatLogs(newLogs),
        components: [row]
        });
    }
  });

  return message;
}

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('log')
  .setDescription('Affiche les logs du bot.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)