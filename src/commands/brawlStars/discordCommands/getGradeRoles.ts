import { Message, Role } from 'discord.js';
import { getGradeRoles } from '../../../database/gradeRole';

export async function handleGetGradeRole(message: Message<true>): Promise<Message<true>> {
        const gradeRoles = await getGradeRoles(message.guild);
        if(!gradeRoles) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a pas encore associé de poste à un rôle `)
        return message.channel.send(`✅ Le serveur ${message.guild.name} a associé les grades suivants à des rôles : \nPrésident: ${gradeRoles.president ? `<@&${gradeRoles.president}>` : 'Non défini'}\nVice Président: ${gradeRoles.vicePresident ? `<@&${gradeRoles.vicePresident}>` : 'Non défini'}\nSénior: ${gradeRoles.senior ? `<@&${gradeRoles.senior}>` : 'Non défini'}\nMembres: ${gradeRoles.member ? `<@&${gradeRoles.member}>` : 'Non défini'}\n`);
}