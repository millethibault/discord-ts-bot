import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  Message,
  Role
} from 'discord.js';
import { getAllProfiles } from '../../../database/player';
import { getClub } from '../../../database/club';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { checkRoleConditions } from '../../../utils/checkPerms';
import { Club } from '../../../interfaces/brawlStarsInterfaces/club';
import { PlayerRow } from '../../../interfaces/player';
import {
  updateClubRole,
  updateGradeRole,
  updateMemberName,
  updateTrophyRole
} from '../../../utils/updateRoles';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleUpdateClub(
  interaction: ChatInputCommandInteraction & { guild: Guild; member: GuildMember }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const clubInput = interaction.options.getString('club', false);
  const clubs = await getClub(interaction.guild);
  const guildClubs = clubs.filter(
    club => !clubInput || (club.clubTag === clubInput && club.guildId === interaction.guild.id)
  );

  if (!guildClubs[0]) {
    return interaction.editReply(
      traductions.UPDATE_CLUB_NO_MATCH(clubInput ?? null, interaction.guild.name)
    );
  }

  let messageString = traductions.UPDATE_CLUB_START;
  const clubMemberDiscordId: string[] = [];

  for (const club of guildClubs) {
    const bsClub: Club | null = await bsapi.getClubData(club.clubTag);
    if (!bsClub) {
      messageString += traductions.UPDATE_CLUB_NOT_FOUND(club.clubName, club.clubTag);
      continue;
    }

    const allGuildBsProfiles = await getAllProfiles(interaction.guild);
    let countUpdated = 0;
    let countChecked = 0;

    for (const clubMember of bsClub.members) {
      const bsProfileRows: PlayerRow[] = allGuildBsProfiles.filter(
        bsProfile => bsProfile.playerTag === clubMember.tag
      );
      if (!bsProfileRows[0]) continue;

      for (const bsProfileRow of bsProfileRows) {
        let member = await interaction.guild.members.fetch(bsProfileRow.userId);
        if (!member) continue;

        clubMemberDiscordId.push(member.id);
        countChecked += 1;

        const [permission] = await checkRoleConditions(member, interaction.member, true, true);
        if (!permission) continue;

        const trophyRoleUpdated = await updateTrophyRole(member, clubMember.trophies);
        member = await member.fetch();
        const gradeRoleUpdate = await updateGradeRole(member, bsClub);
        member = await member.fetch();
        const clubRoleUpdated = await updateClubRole(member, bsClub);
        member = await member.fetch();
        const memberNameUpdated = await updateMemberName(member, clubMember.name);
        member = await member.fetch();

        if (trophyRoleUpdated || gradeRoleUpdate || clubRoleUpdated || memberNameUpdated) {
          countUpdated += 1;
        }
      }
    }

    const emoji =
      countUpdated > 5 ? '⏭️' : countUpdated > 3 ? '⏩' : countUpdated > 0 ? '▶️' : '⏸️';

    if (countUpdated > 0) {
      messageString += traductions.UPDATE_CLUB_MEMBERS_UPDATED(
        emoji,
        countUpdated,
        bsClub.name,
        countChecked,
        bsClub.members.length
      );
    } else {
      messageString += traductions.UPDATE_CLUB_MEMBERS_ALREADY_UPDATED(
        emoji,
        bsClub.name,
        countChecked,
        bsClub.members.length
      );
    }
  }

  if (!clubInput) {
    for (const club of guildClubs) {
      const role = interaction.guild.roles.cache.find(r => r.id === club.roleId);
      let count = 0;

      if (role) {
        for (const member of role.members.values()) {
          const [permission] = await checkRoleConditions(member, interaction.member, false, true);
          if (
            member.roles.cache.has(role.id) &&
            !clubMemberDiscordId.includes(member.id) &&
            permission
          ) {
            await member.roles.remove(role);
            count += 1;
          }
        }

        if (count > 0) {
          messageString += traductions.UPDATE_CLUB_ROLE_REMOVED(count, role.name);
        }
      }
    }
  }

  return interaction.editReply(messageString);
}