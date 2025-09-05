import { ChatInputCommandInteraction, Guild, GuildMember, Message, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, StringSelectMenuInteraction, InteractionResponse } from 'discord.js';
import { client } from '../../../bot/client';

export async function handleAbout(interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }): Promise<Message> {
    return interaction.editReply(`${client.user?.displayName} est un bot discord de gestion de clubs Brawl Stars.\n` +
        `Il permet de mettre à jour automatiquement les membres du serveur en fonction de leur profil en jeu : trophées atteints, club, grade, pseudo.\n` +
        `N'hésitez pas à ajouter le bot à votre serveur : [PLACEHOLDER]`
    )
}

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('about')
  .setDescription('A propos du bot');