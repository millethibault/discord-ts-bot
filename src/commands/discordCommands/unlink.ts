import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  Message
} from 'discord.js';
import { getProfile, unlink } from '../../database/player';
import { checkRoleConditions } from '../../utils/checkPerms';
import { getTraductions } from '../../traductions/tradFunctions';

export async function handleUnlinkProfile(
  interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let user = interaction.options.getUser('membre', false);
  if (!user) user = interaction.member.user;

  const member = await interaction.guild.members.fetch(user.id);
  const [permission, errorString] = await checkRoleConditions(member, interaction.member, false);
  if (!permission) return interaction.editReply(errorString);

  const profile = await getProfile(user, interaction.guild);
  if (!profile) {
    return interaction.editReply(
      traductions.UNLINK_ALREADY_UNLINKED(user.username, interaction.guild.name)
    );
  }

  await unlink(user, interaction.guild);
  return interaction.editReply(
    traductions.UNLINK_SUCCESS(user.username, interaction.guild.name)
  );
}


import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
    .setName('unlink')
    .setDescription(tradEn.UNLINK_COMMAND_DESCRIPTION)
    .setDescriptionLocalizations({
      "fr": tradFr.UNLINK_COMMAND_DESCRIPTION,
      "en-GB": tradEn.UNLINK_COMMAND_DESCRIPTION,
      "en-US": tradEn.UNLINK_COMMAND_DESCRIPTION
    })
    .addUserOption(option =>
      option.setName('membre')
        .setDescription(tradEn.UNLINK_OPTION_MEMBER_DESCRIPTION)
        .setDescriptionLocalizations({
          "fr": tradFr.UNLINK_OPTION_MEMBER_DESCRIPTION,
          "en-GB": tradEn.UNLINK_OPTION_MEMBER_DESCRIPTION,
          "en-US": tradEn.UNLINK_OPTION_MEMBER_DESCRIPTION
        })
        .setRequired(false)
    )
