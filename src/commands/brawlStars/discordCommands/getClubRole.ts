import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import { getClubRoles, setClubRole } from '../../../database/clubRole';

export async function handleGetClubRole(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
        const guildRoles = await getClubRoles(interaction.guild);
        if(guildRoles.length == 0) return interaction.editReply(`❌ Le serveur ${interaction.guild.name} n'a pas encore associé de club à un rôle `)
        return interaction.editReply(`✅ Le serveur ${interaction.guild.name} a ${guildRoles.length} clubs associés à des rôles : \n${guildRoles.map(guildRoles => `${guildRoles.clubName} (\`${guildRoles.clubTag}\`) -> <@&${guildRoles.roleId}>`).join('\n')} `);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('getclubroles')
  .setDescription('Affiche la liste des rôles discord associés à vos clubs Brawl Stars.')