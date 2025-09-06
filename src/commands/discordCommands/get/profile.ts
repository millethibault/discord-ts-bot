import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  Message,
  EmbedBuilder
} from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { getProfile } from '../../../database/player';
import { checkRoles } from '../../../utils/checkRoles';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetProfile(
  interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let playerTag = interaction.options.getString('tag', false);
  let user = interaction.options.getUser('membre', false);
  if (!user) user = interaction.member.user;

  const member = await interaction.guild.members.fetch(user.id);
  if (!member) return interaction.editReply(traductions.GET_PROFILE_MEMBER_NOT_FOUND);

  if (!playerTag) {
    const playerRow = await getProfile(user, interaction.guild);
    if (!playerRow || !playerRow.playerTag) {
      return interaction.editReply(traductions.GET_PROFILE_NO_TAG(member.displayName));
    }
    playerTag = playerRow.playerTag;
  }

  return bsapi
    .getPlayerData(playerTag)
    .then(async player => {
      const checkedRoles = await checkRoles(member, player);
      const none = traductions.LABEL_NONE;
      const noRole = traductions.LABEL_NO_ROLE;

      const trophyRemoved = checkedRoles.trophies.trophyRolesToRemove
        .map(role => `~~${role[1].name}~~`)
        .join(', ') || '';
      const clubRemoved = checkedRoles.club.clubRolesToRemove
        .map(role => `~~${role[1].name}~~`)
        .join(', ') || '';
      const gradeRemoved = checkedRoles.grade.gradeRolesToRemove
        .map(role => `~~${role.name}~~`)
        .join(', ') || '';

      const embed = new EmbedBuilder()
        .setTitle(traductions.LABEL_PROFILE_OF(player.name))
        .setDescription(
          traductions.GET_PROFILE_HEADER(
            member.user.username,
            interaction.guild.name,
            player.name,
            player.tag
          )
        )
        .addFields(
          {
            name: traductions.LABEL_TROPHIES,
            value: traductions.GET_PROFILE_TROPHIES_LINE(
              player.trophies,
              checkedRoles.trophies.upToDate ? '✅' : '❎',
              checkedRoles.trophies.trophyRole,
              trophyRemoved
            ),
            inline: false
          },
          {
            name: traductions.LABEL_CLUB,
            value: traductions.GET_PROFILE_CLUB_LINE(
              player.club.name ?? none,
              player.club.tag ?? '',
              checkedRoles.club.upToDate ? '✅' : '❎',
              checkedRoles.club.expectedClubRole ,
              clubRemoved
            ),
            inline: false
          },
          {
            name: traductions.LABEL_GRADE,
            value: traductions.GET_PROFILE_GRADE_LINE(
              checkedRoles.grade.grade ?? none,
              checkedRoles.grade.upToDate ? '✅' : '❎',
              checkedRoles.grade.expectedGradeRole,
              gradeRemoved
            ),
            inline: false
          }
        )
        .setColor(checkedRoles.rolesUpToDate ? 0x57F287 : 0xED4245) // ✅ green / ❎ red
        .setFooter({
          text:
            interaction.user.id === user.id
              ? checkedRoles.rolesUpToDate
                ? traductions.GET_PROFILE_REMINDER_UP_TO_DATE(checkedRoles.nickname.upToDate)
                : traductions.GET_PROFILE_REMINDER_UPDATE
              : ""
        });

      return interaction.editReply({ embeds: [embed] });
    })
    .catch(err => {
      console.log(err);
      return interaction.editReply(traductions.GET_PROFILE_NOT_FOUND(playerTag));
    });
}