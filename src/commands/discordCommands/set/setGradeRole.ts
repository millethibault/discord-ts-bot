import {
  ChatInputCommandInteraction,
  Guild,
  Message,
  Role
} from 'discord.js';
import {
  setMember,
  setPresident,
  setSenior,
  setVicePresident
} from '../../../database/gradeRole';
import { getTraductions } from '../../../traductions/tradFunctions';
import { Traductions } from '../../../traductions/type';

export async function handleSetGradeRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const grade = interaction.options.getString('grade', true);
  const roleMention = interaction.options.getRole('role', true);

  if (!(roleMention instanceof Role)) {
    return interaction.editReply(traductions.SET_GRADE_ROLE_INVALID_ROLE);
  }

  switch (grade) {
    case 'president':
      return handleSetGrade(interaction, roleMention, 'Président', setPresident, traductions);
    case 'vicePresident':
      return handleSetGrade(interaction, roleMention, 'Vice-Président', setVicePresident, traductions);
    case 'senior':
      return handleSetGrade(interaction, roleMention, 'Sénior', setSenior, traductions);
    case 'member':
      return handleSetGrade(interaction, roleMention, 'Membre', setMember, traductions);
    default:
      return interaction.editReply(traductions.SET_GRADE_ROLE_INVALID_GRADE);
  }
}

async function handleSetGrade(
  interaction: ChatInputCommandInteraction & { guild: Guild },
  role: Role,
  gradeLabel: string,
  setter: (guild: Guild, role: Role) => Promise<void>,
  traductions: Traductions
): Promise<Message> {
  await setter(interaction.guild, role);
  return interaction.editReply(traductions.SET_GRADE_ROLE_SUCCESS(gradeLabel, role.name));
}
