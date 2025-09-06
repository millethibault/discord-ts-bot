import {
  ChatInputCommandInteraction,
  Guild,
  Message,
  Role
} from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClubRole } from '../../../database/clubRole';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleSetClubRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const roleMention = interaction.options.getRole('role', true);
  if (!(roleMention instanceof Role)) {
    return interaction.editReply(traductions.SET_CLUB_ROLE_INVALID_ROLE);
  }

  let clubTag = interaction.options.getString('tag', true);
  if (!clubTag) {
    return interaction.editReply(traductions.SET_CLUB_ROLE_MISSING_TAG);
  }

  clubTag = clearTag(clubTag);
  const club = await bsapi.getClubData(clubTag);

  if (!club) {
    return interaction.editReply(traductions.SET_CLUB_ROLE_NOT_FOUND(clubTag));
  }

  await setClubRole(interaction.guild, roleMention, club);
  return interaction.editReply(traductions.SET_CLUB_ROLE_SUCCESS(club.name, roleMention.name));
}
