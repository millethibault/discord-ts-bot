import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { removeGrade } from '../../../database/gradeRole';
import { getTraductions } from '../../../traductions/tradFunctions';

const gradeKeyToString = {
  president: "Président",
  vicePresident: "Vice-Président",
  senior: "Sénior",
  member: "Membre",
};

export async function handleRemoveGradeRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  type GradeKey = keyof typeof gradeKeyToString;
  const grade = interaction.options.getString('grade') as GradeKey;

  const gradeLabel = gradeKeyToString[grade];
  if (!gradeLabel) {
    return interaction.editReply(traductions.REMOVE_GRADE_ROLE_INVALID_GRADE);
  }

  const rowsAffected = await removeGrade(interaction.guild, grade);
  if (rowsAffected === 0) {
    return interaction.editReply(traductions.REMOVE_GRADE_ROLE_ALREADY_REMOVED(gradeLabel));
  }

  return interaction.editReply(traductions.REMOVE_GRADE_ROLE_SUCCESS(gradeLabel));
}
