import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import { setTrophyRole } from '../../../database/trophyRole';

export async function handleSetTrophyRole(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    const roleMention = interaction.options.getRole('role', true);
    if(!(roleMention instanceof Role)) return interaction.editReply(`❌ Veuillez mentionner un rôle valide.`);
    const trophies = interaction.options.getInteger('trophies', true);
    
    if(trophies < 0 || trophies > 1000000) return interaction.editReply(`❌ Veuillez préciser un nombre de trophées valide (0 < trophées < 1 000 000).`);
    await setTrophyRole(interaction.guild, roleMention, trophies);
    return interaction.editReply(`Le rôle ${roleMention} sera attribué aux joueurs dépassant les ${trophies.toLocaleString()} 🏆`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('settrophyrole')
  .setDescription('Définit les rôles discord que vous associez aux paliers de trophées atteints.')
  .addIntegerOption(option =>
    option.setName('trophies')
      .setDescription('Le nombre de trophées à atteindre')
      .setRequired(true)
  )
  .addRoleOption(option => 
    option.setName('role')
    .setDescription('Le rôle à attribuer')
    .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);