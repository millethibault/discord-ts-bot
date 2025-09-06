import {
  ChatInputCommandInteraction,
  Guild,
  GuildChannel,
  GuildMember,
  Message,
  User
} from 'discord.js';
import bsapi from '../../BrawlStarsInterfaces/brawl-stars-api';
import { clearTag } from '../../BrawlStarsInterfaces/Utils/tag';
import { checkRoleConditions } from '../../utils/checkPerms';
import { readQRCodeFromUrl, getTagValueFromLink } from '../../utils/readCodeQr';
import { handleLink } from '../../utils/handleValidation';
import { getTraductions } from '../../traductions/tradFunctions';

export async function handleLinkProfile(
  interaction: ChatInputCommandInteraction & {
    member: GuildMember;
    guild: Guild;
    channel: GuildChannel;
  }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let playerTag = interaction.options.getString('tag', false);
  let user = interaction.options.getUser('membre', false);
  const attachment = interaction.options.getAttachment('qrcode', false);

  if (!playerTag && !attachment) {
    return interaction.editReply(traductions.ERROR_MISSING_TAG_OR_QR);
  }

  if (!playerTag && attachment) {
    const link = await readQRCodeFromUrl(attachment.url);
    const foundTag = link ? getTagValueFromLink(link) : null;

    if (foundTag) {
      playerTag = foundTag;
    } else {
      return interaction.editReply(traductions.ERROR_INVALID_QR_CODE);
    }
  }

  if (!playerTag) {
    return interaction.editReply(traductions.ERROR_NO_TAG_PROVIDED);
  }

  if (!user) user = interaction.member.user;
  const member = await interaction.guild.members.fetch(user.id);

  const [permission, errorString] = await checkRoleConditions(member, interaction.member, false);
  if (!permission) return interaction.editReply(errorString);

  playerTag = clearTag(playerTag);

  return bsapi
    .getPlayerData(playerTag)
    .then(player => handleLink(interaction, user as User, player))
    .catch(err => {
      console.log(err);
      return interaction.editReply(traductions.ERROR_PLAYER_NOT_FOUND(playerTag));
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