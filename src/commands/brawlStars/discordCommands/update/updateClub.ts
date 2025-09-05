import { ChatInputCommandInteraction, Guild, GuildMember, Interaction, InteractionResponse, Message, Role, User } from 'discord.js';
import { getAllProfiles, getProfile } from '../../../../database/player';
import { getClub } from '../../../../database/club';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { checkRoleConditions } from '../../../../utils/checkPerms';
import { AutocompleteInteraction } from 'discord.js';
import { Club } from '../../../../interfaces/brawlStarsInterfaces/club';
import { PlayerRow } from '../../../../interfaces/player';
import { updateClubRole, updateGradeRole, updateMemberName, updateTrophyRole } from '../../../../utils/updateRoles';

export async function handleUpdateClub(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {

    let clubInput = interaction.options.getString('club', true);
    const clubs = await getClub(interaction.guild);
    const club = clubs.find(club => club.clubTag === clubInput && club.guildId == interaction.guild.id);
    if (!club) return interaction.editReply(`❌ Aucun club n'est associé à  \`${clubInput}\` sur le serveur ${interaction.guild.name}`);
    

    const bsClub: Club | null = await bsapi.getClubData(club.clubTag);
    if(!bsClub) return interaction.editReply(`❌ Je n'ai pas trouvé le club ${clubInput} (\`${club.clubTag}\`) sur Brawl Stars !`);

    const allGuildBsProfiles = await getAllProfiles(interaction.guild);
    let countUpdated = 0;
    let countChecked = 0
    for(let clubMember of bsClub.members) {
        let bsProfileRow: PlayerRow | undefined = allGuildBsProfiles.find(bsProfile => bsProfile.playerTag === clubMember.tag);
        if(!bsProfileRow) continue;
        let member = await interaction.guild.members.fetch(bsProfileRow.userId);
        if(!member) continue;

        countChecked +=1
        const [permission, _] = await checkRoleConditions(member, interaction.member, false, false);
        if(!permission) continue;
        const trophyRoleUpdated = await updateTrophyRole(member, clubMember.trophies);
        member = await member.fetch();
        const gradeRoleUpdate = await updateGradeRole(member, bsClub);
        member = await member.fetch();
        const clubRoleUpdated = await updateClubRole(member, bsClub);
        member = await member.fetch();
        const memberNameUpdated = await updateMemberName(member, clubMember.name);
        member = await member.fetch();
        if(trophyRoleUpdated || gradeRoleUpdate || clubRoleUpdated || memberNameUpdated) {
            countUpdated +=1;
            //interaction.editReply(``)
        }
    }
    return interaction.editReply(`✅ Les membres du club ${bsClub.name} enregistrés sur le serveur ${interaction.guild.name} ont été mis à jour !\n\`${countUpdated}\` membres mis à jour parmi les \`${countChecked}/${bsClub.members.length}\` enregistrés sur votre serveur !`)
}