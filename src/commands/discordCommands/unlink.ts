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

export const data = new SlashCommandBuilder()
    .setName('unlink')
    .setDescription('Dissocie votre compte Brawl Stars de votre compte discord sur ce serveur.')
    .addUserOption(option => 
      option.setName('membre')
        .setDescription('Le membre duquel délier le profil Brawl Stars')
        .setRequired(false)
    )