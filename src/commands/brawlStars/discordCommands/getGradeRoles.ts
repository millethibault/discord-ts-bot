import { Message, Role } from 'discord.js';
import { getGradeRoles } from '../../../database/gradeRole';

export async function handleGetGradeRole(message: Message<true>): Promise<Message<true>> {
        const gradeRoles = await getGradeRoles(message.guild);
        if(!gradeRoles) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a pas encore associé de poste à un rôle `)
        return message.channel.send(`✅ Le serveur ${message.guild.name} a associé les grades suivants à des rôles : \nPrésident: ${gradeRoles.presidentId ? `<@&${gradeRoles.presidentId}>` : 'Non défini'}\nVice Président: ${gradeRoles.vicePresidentId ? `<@&${gradeRoles.vicePresidentId}` : 'Non défini'}>\nSénior: ${gradeRoles.seniorId ? `<@&${gradeRoles.seniorId}>` : 'Non défini'}\nMembres: ${gradeRoles.memberId ? `<@&${gradeRoles.memberId}>` : 'Non défini'}\n`);
}