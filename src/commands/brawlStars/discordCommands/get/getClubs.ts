import { ChatInputCommandInteraction, Guild, Message } from 'discord.js';
import { getClub } from '../../../../database/club';

export async function handleGetClubs(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    const clubs = await getClub(interaction.guild);
    if (!clubs[0]) return interaction.editReply(`❌ Le serveur ${interaction.guild.name} n'a a pas enregistré de club `);
    return interaction.editReply(`✅ Le serveur ${interaction.guild.name} a ${clubs.length} clubs enregistrés : \n${clubs.map(club => `${club.clubName} (\`${club.clubTag}\`)`).join('\n')}`);
}