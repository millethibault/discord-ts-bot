import { Message } from 'discord.js';
import { getClubs, hasClubs } from '../../../database/club';

export async function handleGetClubs(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    const guildHasClubs = await hasClubs(message.guild!.id);
    if (!guildHasClubs) return message.channel.send(`Le serveur ${message.guild.name} n'a a pas enregistré de club ❌`);

    const clubs = await getClubs(message.guild!.id);
    return message.channel.send(`Le serveur ${message.guild.name} a ${clubs.length} clubs enregistrés : ${clubs.map(club => `${club.name} (\`${club.tag})\``).join('\n')} ✅`);
}