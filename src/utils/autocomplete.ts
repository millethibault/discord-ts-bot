import { AutocompleteInteraction, Guild } from "discord.js";
import { getClub } from "../database/club";

export const autocompleteGuildClubStrings = async (interaction: AutocompleteInteraction & { guild: Guild }) => {
	const focusedValue = interaction.options.getFocused();
    const clubs = await getClub(interaction.guild);
    const guildClubs = clubs.filter(club => club.guildId == interaction.guild.id);

		const choices = guildClubs.map(club => club.clubName);
		const filtered = guildClubs.filter(choice => choice.clubName.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.clubName, value: choice.clubTag })),
		);
	}