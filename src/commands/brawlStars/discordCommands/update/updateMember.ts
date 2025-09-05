import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import { getProfile } from '../../../../database/player';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { checkRoleConditions } from '../../../../utils/checkPerms';
import { getClubData } from '../../../../BrawlStarsInterfaces/Club';
import { updateClubRole, updateGradeRole, updateMemberName, updateTrophyRole } from '../../../../utils/updateRoles';

export async function handleUpdateMember(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {
    let member = interaction.member;
    const user = interaction.options.getUser('membre');
    if(user) member = await interaction.guild.members.fetch(user.id);

    const [permission, errorString] = await checkRoleConditions(member, interaction.member)
    if(!permission) return interaction.editReply(errorString);
    const oldNickname = member.displayName;

    const brawlProfile = await getProfile(member.user, interaction.guild);
    if(!brawlProfile) return interaction.editReply(`❌ ${member.displayName} n'a pas encore enregistré votre tag Brawl Stars.`);
    return bsapi.getPlayerData(brawlProfile.playerTag)
    .then(async player => {
        let messageString = { value:`✅ Mise à jour du profil Discord effectuée\n`};
        const trophyRoleUpdated = await updateTrophyRole(member, player.trophies, messageString);
        member = await member.fetch();
        const club = player.tag ? await getClubData(player.club.tag) : null;
        const gradeRoleUpdate = club ? await updateGradeRole(member, club, messageString) : null;
        member = await member.fetch();
        const clubRoleUpdated = club ? await updateClubRole(member, club, messageString) : null;
        member = await member.fetch();
        const memberNameUpdated = await updateMemberName(member, player.name, messageString);
        member = await member.fetch();
        if(!trophyRoleUpdated && !gradeRoleUpdate && !clubRoleUpdated) messageString.value += `Tous les rôles de ${oldNickname} étaient déjà à jour.\n`;
        if (memberNameUpdated) messageString.value += `Pseudo sur le serveur : ${oldNickname} ➡️ ${memberNameUpdated}`;
        return interaction.editReply(messageString.value);
    })
    .catch(err => {
        console.error(err);
        return interaction.editReply(`❌ Votre profil \`${brawlProfile.playerTag}\` n'a pas été trouvé sur Brawl Stars.`);
    });
}