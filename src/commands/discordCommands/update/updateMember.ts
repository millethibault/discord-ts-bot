import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  Message
} from 'discord.js';
import { getProfile } from '../../../database/player';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { checkRoleConditions } from '../../../utils/checkPerms';
import { getClubData } from '../../../BrawlStarsInterfaces/Club';
import {
  updateClubRole,
  updateGradeRole,
  updateMemberName,
  updateTrophyRole
} from '../../../utils/updateRoles';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleUpdateMember(
  interaction: ChatInputCommandInteraction & { guild: Guild; member: GuildMember }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let member = interaction.member;
  const user = interaction.options.getUser('membre');
  if (user) member = await interaction.guild.members.fetch(user.id);

  const [permission, errorString] = await checkRoleConditions(member, interaction.member);
  if (!permission) return interaction.editReply(errorString);

  const oldNickname = member.displayName;
  const brawlProfile = await getProfile(member.user, interaction.guild);

  if (!brawlProfile) {
    return interaction.editReply(traductions.UPDATE_MEMBER_NO_PROFILE(member.displayName));
  }

  return bsapi
    .getPlayerData(brawlProfile.playerTag)
    .then(async player => {
      const messageString = { value: traductions.UPDATE_MEMBER_START };

      const trophyRoleUpdated = await updateTrophyRole(member, player.trophies, messageString);
      member = await member.fetch();

      const club = player.club?.tag ? await getClubData(player.club.tag) : null;
      const gradeRoleUpdate = club ? await updateGradeRole(member, club, messageString) : null;
      member = await member.fetch();

      const clubRoleUpdated = club ? await updateClubRole(member, club, messageString) : null;
      member = await member.fetch();

      const memberNameUpdated = await updateMemberName(member, player.name, messageString);
      member = await member.fetch();

      if (!trophyRoleUpdated && !gradeRoleUpdate && !clubRoleUpdated) {
        messageString.value += traductions.UPDATE_MEMBER_ALL_UP_TO_DATE(oldNickname);
      }

      if (memberNameUpdated) {
        messageString.value += traductions.UPDATE_MEMBER_NICKNAME_CHANGED(
          oldNickname,
          memberNameUpdated
        );
      }

      return interaction.editReply(messageString.value);
    })
    .catch(err => {
      console.error(err);
      return interaction.editReply(traductions.UPDATE_MEMBER_NOT_FOUND(brawlProfile.playerTag));
    });
}