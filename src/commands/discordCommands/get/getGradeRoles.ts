import {
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getGradeRoles } from '../../../database/gradeRole';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleGetGradeRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);
  const gradeRoles = await getGradeRoles(interaction.guild);

  if (!gradeRoles) {
    return interaction.editReply(traductions.GET_GRADE_ROLE_EMPTY(interaction.guild.name));
  }

  const president = gradeRoles.president ? `<@&${gradeRoles.president}>` : 'Non défini';
  const vicePresident = gradeRoles.vicePresident ? `<@&${gradeRoles.vicePresident}>` : 'Non défini';
  const senior = gradeRoles.senior ? `<@&${gradeRoles.senior}>` : 'Non défini';
  const member = gradeRoles.member ? `<@&${gradeRoles.member}>` : 'Non défini';

  return interaction.editReply(
    traductions.GET_GRADE_ROLE_LIST(
      interaction.guild.name,
      president,
      vicePresident,
      senior,
      member
    )
  );
}
