import { ChatInputCommandInteraction, Guild, Message } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClub } from '../../../../database/club';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';

export async function handleAddClub(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    let clubTag = interaction.options.getString('tag', true);
    clubTag = clearTag(clubTag);

    const club = await bsapi.getClubData(clubTag)
    if(!club) return interaction.editReply(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    await setClub(interaction.guild, club);
    return interaction.editReply(`Le club ${club.name} (\`${club.tag}\`) a été ajouté au serveur ${interaction.guild.name} ✅`);
}