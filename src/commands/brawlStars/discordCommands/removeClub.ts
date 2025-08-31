import { AutocompleteInteraction, ChatInputCommandInteraction, CommandInteractionOptionResolver, Guild, Interaction, Message } from 'discord.js';
import { removeClub, getClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleRemoveClub(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    let clubTag = interaction.options.getString('club', true);
    clubTag = clearTag(clubTag);

    if(!clubTag) return interaction.editReply(`Veuillez entrer le tag d'un club ❌`);


    const clubs = await getClub(interaction.guild);

    const club = clubs.find(club => club.clubTag === clubTag);
    if (!club) return interaction.editReply(`Le tag \`${clubTag}\` n'a pas été trouvé dans la liste des clubs du serveur ${interaction.guild.name} ❌`);
    await removeClub(interaction.guild, clubTag);
    return interaction.editReply(`Le club ${club.clubName} (\`${club.clubTag}\`) a été supprimé du serveur ${interaction.guild.name} ✅`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { Autocomplete } from 'undici/types/utility';

export const data = new SlashCommandBuilder()
  .setName('removeclub')
  .setDescription('Dissocie un de vos clubs Brawl Stars de votre serveur discord.')
 .addStringOption(option =>
  option.setName('club')
    .setDescription('Choisis un club')
    .setRequired(true)
    .setAutocomplete(true)
)
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export const autocomplete = async (interaction: AutocompleteInteraction & { guild: Guild }) => {
		const focusedValue = interaction.options.getFocused();
    const clubs = await getClub(interaction.guild);
    const guildClubs = clubs.filter(club => club.guildId == interaction.guild.id);

		const choices = guildClubs.map(club => club.clubName);
		const filtered = guildClubs.filter(choice => choice.clubName.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.clubName, value: choice.clubTag })),
		);
	}