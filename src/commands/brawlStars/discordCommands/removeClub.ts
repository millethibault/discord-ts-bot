import { Message } from 'discord.js';
import { removeClub, getClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleRemoveClub(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    const clubTag = clearTag(args[1]);

    if(!clubTag) return message.channel.send(`Veuillez entrer le tag d'un club ❌`);

    const clubs = await getClub(message.guild);
    const club = clubs.find(club => club.clubTag === clubTag);
    if (!club) return message.channel.send(`Le tag \`${clubTag}\` n'a pas été trouvé dans la liste des clubs du serveur ${message.guild.name} ❌`);
    await removeClub(message.guild, clubTag);
    return message.channel.send(`Le club ${club.clubName} (\`${club.clubTag}\`) a été supprimé  serveur ${message.guild.name} ✅`);
}