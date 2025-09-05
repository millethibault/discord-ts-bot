import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { setProfile } from '../../../../database/player';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';
import { checkRoleConditions } from '../../../../utils/checkPerms';
import { readQRCodeFromUrl, getTagValueFromLink } from '../../../../utils/readCodeQr';

export async function handleSetProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let playerTag = interaction.options.getString('tag', false);
    let user = interaction.options.getUser('membre', false);
    let attachment = interaction.options.getAttachment('qrcode', false);
    if(!playerTag && !attachment) return interaction.editReply(`❌ Veuillez fournir un tag Brawl Stars ou bien un QR code !`);
    if(!playerTag && attachment) {
        const link = await readQRCodeFromUrl(attachment.url);
        const foundTag = link ? getTagValueFromLink(link) : null;
        if(foundTag) playerTag = foundTag
        else return interaction.editReply(`❌ Le QR code fourni n'est pas valie ! Retrouvez le en allant dans Amis -> Mon QR sur Brawl Stars.`);
    }
    if(!playerTag) return interaction.editReply(`❌ Veuillez fournir un tag Brawl Stars.`);
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
        return interaction.editReply(`❌ Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars`);
    });
}