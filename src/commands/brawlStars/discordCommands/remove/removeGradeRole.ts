import { AutocompleteInteraction, ChatInputCommandInteraction, CommandInteractionOptionResolver, Guild, Interaction, Message } from 'discord.js';
import { removeGrade, getGradeRoles } from '../../../../database/gradeRole';
const gradeKeyToString =
{
    "president": "Président",
    "vicePresident": "Vice-Président",
    "senior": "Sénior",
    "member": "Membre",
}

export async function handleRemoveGradeRole(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    type GradeKey = 'president' | 'vicePresident' | 'senior' | 'member';
    const grade: GradeKey = interaction.options.getString('grade') as GradeKey;
    if (!gradeKeyToString[grade]) return interaction.editReply(`❌ Veuillez mentionner un grade valide.`);
    const rowsAffected = await removeGrade(interaction.guild, grade);
    if(rowsAffected == 0) return interaction.editReply(`❌ Le grade ${gradeKeyToString[grade]} n'était déjà attribué à aucun rôle !`);
    return interaction.editReply(`✅ Le grade ${gradeKeyToString[grade]} n'est désormais plus lié à aucun rôle !`);
}