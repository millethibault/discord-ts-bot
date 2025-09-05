import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClubRole } from '../../../../database/clubRole';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';

export async function handleSetClubRole(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
    const roleMention = interaction.options.getRole('role', true);
    if(!(roleMention instanceof Role)) return interaction.editReply(`❌ Veuillez mentionner un rôle valide.`);
    let clubTag = interaction.options.getString('tag', true);
    if(!clubTag) return interaction.editReply(`Veuillez entrer le tag de club ❌`);
    clubTag = clearTag(clubTag);

    const club = await bsapi.getClubData(clubTag);;
    if(!club) return interaction.editReply(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    await setClubRole(interaction.guild, roleMention, club);
    return interaction.editReply(`Le club ${club.name} a été associé au rôle ${roleMention.name} ✅`);
}