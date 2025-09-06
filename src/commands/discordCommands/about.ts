import { ChatInputCommandInteraction, Guild, GuildMember, Message, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, StringSelectMenuInteraction, InteractionResponse } from 'discord.js';
import { client } from '../../bot/client';
import { getTraductions } from '../../traductions/tradFunctions';

export async function handleAbout(interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }): Promise<Message> {
    const traductions = await getTraductions(interaction.guild)
    if(!client.user) return interaction.editReply(traductions.ERROR_SYNC_BOT)
    return interaction.editReply(traductions.ABOUT_BOT(client.user));
}

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('about')
  .setDescription('A propos du bot');