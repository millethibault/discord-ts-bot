import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleAddClub(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  let clubTag = interaction.options.getString('tag', true);
  clubTag = clearTag(clubTag);

  const club = await bsapi.getClubData(clubTag);
  if (!club) {
    return interaction.editReply(traductions.ADD_CLUB_NOT_FOUND(clubTag));
  }

  await setClub(interaction.guild, club);
  return interaction.editReply(
    traductions.ADD_CLUB_SUCCESS(club.name, club.tag, interaction.guild.name)
  );
}
