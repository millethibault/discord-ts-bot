import { ChatInputCommandInteraction, Guild, Interaction, Message, Role } from 'discord.js';
import { setMember, setPresident, setSenior, setVicePresident } from '../../../../database/gradeRole';

export async function handleSetGradeRole(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    const grade = interaction.options.getString('grade', true);
    const roleMention = interaction.options.getRole('role', true);
    if(!(roleMention instanceof Role)) return interaction.editReply(`❌ Veuillez mentionner un rôle valide.`);
    if(grade === 'vicePresident') return handleSetVicePresident(interaction, roleMention);
    if(grade === 'president') return handleSetPresident(interaction, roleMention);
    if(grade === 'senior') return handleSetSenior(interaction, roleMention);
    if(grade === 'member') return handleSetMember(interaction, roleMention);
    return interaction.editReply('❌ Veuillez mentionner un grade valide.');
}

export async function handleSetPresident(interaction: ChatInputCommandInteraction & { guild: Guild }, role: Role): Promise<Message> {
    await setPresident(interaction.guild, role);
    return interaction.editReply(`Le grade Président a été associé au rôle ${role.name} ✅`);
}

export async function handleSetVicePresident(interaction: ChatInputCommandInteraction & { guild: Guild }, role: Role): Promise<Message> {
    await setVicePresident(interaction.guild, role);
    return interaction.editReply(`Le grade Vice-Président a été associé au rôle ${role.name} ✅`);
}

export async function handleSetSenior(interaction: ChatInputCommandInteraction & { guild: Guild }, role: Role): Promise<Message> {
    await setSenior(interaction.guild, role);
    return interaction.editReply(`Le grade Sénior a été associé au rôle ${role.name} ✅`);
}

export async function handleSetMember(interaction: ChatInputCommandInteraction & { guild: Guild }, role: Role): Promise<Message> {
    await setMember(interaction.guild, role);
    return interaction.editReply(`Le grade Membre a été associé au rôle ${role.name} ✅`);
}