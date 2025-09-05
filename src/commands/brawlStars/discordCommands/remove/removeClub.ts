import { AutocompleteInteraction, ChatInputCommandInteraction, CommandInteractionOptionResolver, Guild, Interaction, Message } from 'discord.js';
import { removeClub, getClub } from '../../../../database/club';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';

export async function handleRemoveClub(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    let clubTag = interaction.options.getString('club', true);
    clubTag = clearTag(clubTag);

    if(!clubTag) return interaction.editReply(`Veuillez entrer le tag d'un club ❌`);


    const clubs = await getClub(interaction.guild);

    const club = clubs.find(club => club.clubTag === clubTag);
    if (!club) return interaction.editReply(`Le tag \`${clubTag}\` n'a pas été trouvé dans la liste des clubs du serveur ${interaction.guild.name} ❌`);
    await removeClub(interaction.guild, clubTag);
    return interaction.editReply(`Le club ${club.clubName} (\`${club.clubTag}\`) a été supprimé du serveur ${interaction.guild.name} ✅`);
}