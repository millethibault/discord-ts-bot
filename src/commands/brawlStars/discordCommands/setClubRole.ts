import { Message, Role } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClubRole } from '../../../database/clubRole';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';
import { addClub, getClubs } from '../../../database/club';

export async function handleSetClubRole(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    if(!args[2]) return message.channel.send(`Veuillez entrer le tag de club et mentionner le rôle à attribuer aux membres de ce club ❌`);
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`Veuillez mentionner le rôle à attribuer aux membres de ce club ❌`);
    const filteredArgs = args.filter(arg => !arg.match(/^<@&\d+>$/));
    let clubTag = filteredArgs[1];
    if(!clubTag) return message.channel.send(`Veuillez entrer le tag de club ❌`);
    clubTag = clearTag(clubTag);

    return bsapi.getClubData(clubTag)
    .then(async club => {
        const guildClubs = await getClubs(message.guild);
        if(!guildClubs.find(guildClub => guildClub.tag == club.tag)) addClub(message.guild, club);
        await setClubRole(message.guild, roleMention, club);
        return message.channel.send(`Le club ${club.name} a été associé au rôle ${roleMention.name} ✅`);
    })
    .catch(err => {
        console.log(err);
        return message.channel.send(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}