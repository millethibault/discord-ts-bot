import { ChatInputCommandInteraction, Guild, GuildMember, GuildMemberFlagsBitField, Interaction, InteractionResponse, Message, Role, User } from 'discord.js';
import { getAllProfiles, getProfile } from '../../../../database/player';
import { getClub } from '../../../../database/club';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { checkRoleConditions } from '../../../../utils/checkPerms';
import { Club } from '../../../../interfaces/brawlStarsInterfaces/club';
import { PlayerRow } from '../../../../interfaces/player';
import { updateClubRole, updateGradeRole, updateMemberName, updateTrophyRole } from '../../../../utils/updateRoles';

export async function handleUpdateClub(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {

    let clubInput = interaction.options.getString('club', false);
    const clubs = await getClub(interaction.guild);
    const guildClubs = clubs.filter(club => !clubInput || club.clubTag === clubInput && club.guildId == interaction.guild.id);
    if (!guildClubs[0]) return interaction.editReply(`❌ Aucun club n'est ${clubInput ? `enregistré` : `associé à \`${clubInput}\``} sur le serveur ${interaction.guild.name}`);
    let messageString = `✅ Mise à jour des clubs du sereur effectée !\n\n`;
    let clubMemberDiscordId = []
    for(let club of guildClubs) {

        const bsClub: Club | null = await bsapi.getClubData(club.clubTag);
        if(!bsClub) {
            messageString += `❌ Je n'ai pas trouvé le club ${club.clubName} (\`${club.clubTag}\`) sur Brawl Stars !\n\n`;
            continue;
        };
        const allGuildBsProfiles = await getAllProfiles(interaction.guild);
        let countUpdated = 0;
        let countChecked = 0
        for(let clubMember of bsClub.members) {
            let bsProfileRow: PlayerRow | undefined = allGuildBsProfiles.find(bsProfile => bsProfile.playerTag === clubMember.tag);
            if(!bsProfileRow) continue;
            let member = await interaction.guild.members.fetch(bsProfileRow.userId);
            if(!member) continue;
            clubMemberDiscordId.push(member.id)
            countChecked +=1
            const [permission, _] = await checkRoleConditions(member, interaction.member, false, true);
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
            }
        }
        const emoji = countUpdated > 0 ? countUpdated > 3 ? countUpdated > 5 ? '⏭️' : '⏩' : '▶️' : '⏸️';
        if(countUpdated > 0) messageString += `${emoji} \`${countUpdated}\` membre${countUpdated > 2 ? 's' : ''} de ${bsClub.name} mis à jour parmi les \`${countChecked}/${bsClub.members.length}\` enregistrés sur votre serveur !\n\n`;
        else messageString += `${emoji} Les \`${countChecked}/${bsClub.members.length}\` membre${countChecked > 2 ? 's' : ''} du club ${bsClub.name} enregistrés sur votre serveur étaient déjà tous à jour !\n\n`;
    }
    for (let club of guildClubs) {
        const role = interaction.guild.roles.cache.find(guildRole => guildRole.id === club.roleId);
        let count = 0;
        if(role) {
            for (let member of role.members.values()) {
                if(member.roles.cache.has(role.id) && !clubMemberDiscordId.includes(member.id)) {
                    await member.roles.remove(role);
                    count +=1
                }
            }
        if(count > 0) messageString += `\`${count}\` membres ont perdu le rôle ${role.name}.\n`;
        }
    }
    return interaction.editReply(messageString);
}