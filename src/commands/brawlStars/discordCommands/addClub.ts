import { Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { addClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleAddClub(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    let clubTag = args[1];
    if(!clubTag) return message.channel.send(`Veuillez entrer le tag d'un club ❌`);
    clubTag = clearTag(args[1]);

    return bsapi.getClubData(clubTag)
    .then(async club => {
        await addClub(message.guild, club);
        return message.channel.send(`Le club ${club.name} (\`${club.tag}\`) a été ajouté au serveur ${message.guild.name} ✅`);
    })
    .catch(err => {
        return message.channel.send(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}