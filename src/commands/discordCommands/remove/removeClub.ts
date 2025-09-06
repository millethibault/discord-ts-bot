import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { removeClub, getClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleRemoveClub(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let clubTag = interaction.options.getString('club', true);
  clubTag = clearTag(clubTag);

  if (!clubTag) {
    return interaction.editReply(traductions.REMOVE_CLUB_MISSING_TAG);
  }

  const clubs = await getClub(interaction.guild);
  const club = clubs.find(c => c.clubTag === clubTag);

  if (!club) {
    return interaction.editReply(traductions.REMOVE_CLUB_NOT_FOUND(clubTag, interaction.guild.name));
  }

  await removeClub(interaction.guild, clubTag);
  return interaction.editReply(
    traductions.REMOVE_CLUB_SUCCESS(club.clubName, club.clubTag, interaction.guild.name)
  );
}
