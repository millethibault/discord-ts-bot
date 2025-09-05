import { ChatInputCommandInteraction, Guild, GuildChannel, GuildMember, Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';
import { checkRoleConditions } from '../../../utils/checkPerms';
import { readQRCodeFromUrl, getTagValueFromLink } from '../../../utils/readCodeQr';
import { handleLink } from '../../../utils/handleValidation';

export async function handleLinkProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild, channel: GuildChannel}): Promise<Message> {
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
    .then(player => handleLink(interaction, user, player))
    .catch(err => {
        console.log(err);
        return interaction.editReply(`❌ Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars`);
    });
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('Associe votre compte Brawl Stars à votre compte discord sur ce serveur.')
    .addAttachmentOption(option => 
      option.setName('qrcode')
      .setDescription('Un screen du QR code de votre profil disponible dans Amis -> Mon QR')
      .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Le tag de joueur, retrouvable sur votre profil Brawl Stars (inutile si QR Code)')
        .setRequired(false)
    )
    .addUserOption(option => 
      option.setName('membre')
        .setDescription('Le membre auquel lier le profil Brawl Stars')
        .setRequired(false)
    )