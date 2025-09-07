import { ChatInputCommandInteraction, Guild, GuildMember, Message, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, StringSelectMenuInteraction, InteractionResponse, AuditLogEvent } from 'discord.js';
import { client } from '../../bot/client';
import { getTraductions } from '../../traductions/tradFunctions';

export async function handleConfig(interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }): Promise<Message> {
    const traductions = await getTraductions(interaction.guild)
    if(!client.user) return interaction.editReply(traductions.ERROR_SYNC_BOT)
    return interaction.editReply(traductions.CONFIG_BOT(client.user))
}

import { SlashCommandBuilder } from 'discord.js';
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
    .setName('config')
    .setDescription(tradEn.CONFIG_COMMAND_DESCRIPTION)
    .setDescriptionLocalizations({
    "fr": tradFr.CONFIG_COMMAND_DESCRIPTION,
    "en-GB": tradEn.CONFIG_COMMAND_DESCRIPTION,
    "en-US": tradEn.CONFIG_COMMAND_DESCRIPTION
    })