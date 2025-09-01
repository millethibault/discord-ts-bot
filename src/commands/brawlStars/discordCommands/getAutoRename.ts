import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import { getAutoRename } from '../../../database/autoRename';

export async function handleGetAutoRename(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
    const autoRename = await getAutoRename(interaction.guild);
    if(autoRename) return interaction.editReply(`✅ Votre serveur renomme les membres du serveur lors de la mise à jour !`)
    else return interaction.editReply(`❌ Votre serveur ne renomme pas les membres du serveur lors de la mise à jour!`);
    
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('getautorename')
  .setDescription('Indique si le bot renomme automatiquement les membres ors de la mise à jour sur ce serveur.')