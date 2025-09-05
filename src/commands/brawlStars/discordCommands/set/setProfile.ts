import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { setProfile } from '../../../../database/player';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';
import { checkRoleConditions } from '../../../../utils/checkPerms';

export async function handleSetProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let playerTag = interaction.options.getString('tag', true);
    let user = interaction.options.getUser('membre', false);
    if(!user) user = interaction.member.user;
    const member = await interaction.guild.members.fetch(user.id);
    const [permission, errorString] = await checkRoleConditions(member, interaction.member, false)
    if(!permission) return interaction.editReply(errorString);
    playerTag = clearTag(playerTag);

    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        await setProfile(user.id, player, interaction.guild.id);
        return interaction.editReply(`Le profil Brawl Stars ${player.name} (\`${player.tag}\`) a été lié à au profil discord de ${user.displayName} sur ${interaction.guild.name} ✅`);
    })
    .catch(err => {
        console.log(err);
        return interaction.editReply(`Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}