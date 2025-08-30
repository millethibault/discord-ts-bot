import { Message } from 'discord.js';
import { getClubs, hasClubs } from '../../../database/club';

export async function handleGetClubs(message: Message<true>): Promise<Message<true>> {
    const guildHasClubs = await hasClubs(message.guild);
    if (!guildHasClubs) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a a pas enregistré de club `);

    const clubs = await getClubs(message.guild);
    return message.channel.send(`✅ Le serveur ${message.guild.name} a ${clubs.length} clubs enregistrés : \n${clubs.map(club => `${club.name} (\`${club.tag}\`)`).join('\n')}`);
}