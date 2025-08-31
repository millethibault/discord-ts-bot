import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import { getGradeRoles } from '../../../database/gradeRole';

export async function handleGetGradeRole(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
        const gradeRoles = await getGradeRoles(interaction.guild);
        if(!gradeRoles) return interaction.editReply(`❌ Le serveur ${interaction.guild.name} n'a pas encore associé de poste à un rôle `);
        return interaction.editReply(`✅ Le serveur ${interaction.guild.name} a associé les grades suivants à des rôles : \nPrésident: ${gradeRoles.president ? `<@&${gradeRoles.president}>` : 'Non défini'}\nVice Président: ${gradeRoles.vicePresident ? `<@&${gradeRoles.vicePresident}>` : 'Non défini'}\nSénior: ${gradeRoles.senior ? `<@&${gradeRoles.senior}>` : 'Non défini'}\nMembres: ${gradeRoles.member ? `<@&${gradeRoles.member}>` : 'Non défini'}\n`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('getgraderoles')
  .setDescription('Affiche la liste des rôles de grade dans vos clans associés à des rôles sur votre serveur discord.')