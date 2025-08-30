import { Message } from 'discord.js';
import { getClub } from '../../../database/club';

export async function handleGetClubs(message: Message<true>): Promise<Message<true>> {
    const clubs = await getClub(message.guild);
    if (!clubs[0]) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a a pas enregistré de club `);
    return message.channel.send(`✅ Le serveur ${message.guild.name} a ${clubs.length} clubs enregistrés : \n${clubs.map(club => `${club.clubName} (\`${club.clubTag}\`)`).join('\n')}`);
}