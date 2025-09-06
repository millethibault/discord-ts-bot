import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { getProfile } from '../../../../database/player';
import { checkRoles } from '../../../../utils/checkRoles';

export async function handleGetProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let playerTag = interaction.options.getString('tag', false);
    let user = interaction.options.getUser('membre', false);
    if(!user) user = interaction.member.user;
    const member = await interaction.guild.members.fetch(user.id);
    if(!member) return interaction.editReply(`❌ Membre introuvable`);
    if(!playerTag) {
        const playerRow = await getProfile(user, interaction.guild);
        if(!playerRow || !playerRow.playerTag) return interaction.editReply(`❌ ${member.displayName} n'a pas encore enregistré son tag Brawl Stars`);
        playerTag = playerRow.playerTag;
    }
    
    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        const checkedRoles = await checkRoles(member, player);
        let messageString = `Le profil Brawl Stars lié à ${member.user.username} sur ${interaction.guild.name} est ${player.name} (\`${player.tag}\`).\n`;
        messageString += `${player.trophies}🏆 -> ${checkedRoles.trophies.upToDate ? `✅` : `❎`} ${checkedRoles.trophies.trophyRole ?? 'Aucun rôle'} ${checkedRoles.trophies.trophyRolesToRemove.map(role => `~~${role[1].name}~~`).join(', ')}\n`;
        messageString += `Club : ${player.club.name ? `${player.club.name} (\`#${player.club.tag}\`)` : 'Aucun'}  -> ${checkedRoles.club.upToDate ? `✅` : `❎`} ${checkedRoles.club.expectedClubRole ?? 'Aucun rôle'} ${checkedRoles.club.clubRolesToRemove.map(role => `~~${role[1].name}~~`).join(', ')}\n`;
        messageString += `Grade : ${checkedRoles.grade.grade ?? 'Aucun'} -> ${checkedRoles.grade.upToDate ? `✅` : `❎`} ${checkedRoles.grade.expectedGradeRole ?? 'Aucun rôle'} ${checkedRoles.grade.gradeRolesToRemove.map(role => `~~${role.name}~~`).join(', ')}\n`;
        if(!checkedRoles.rolesUpToDate && interaction.user.id == user.id) messageString += `Pensez à mettre vos rôles à jour 😉.`
        else if(interaction.user.id == user.id) messageString += `Votre profil est à jour ${checkedRoles.nickname.upToDate ? `` : `(sauf le pseudo)`} 😉.`;
        return interaction.editReply(messageString);
    })
    .catch(err => {
        console.log(err);
        return interaction.editReply(`❌ Le tag de joueur \`${playerTag}\` n'a pas été trouvé sur Brawl Stars`);
    });
}