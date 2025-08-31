import { AutocompleteInteraction, ChatInputCommandInteraction, CommandInteractionOptionResolver, Guild, Interaction, Message } from 'discord.js';
import { removeClub, getClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleRemoveTrophyRole(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    let roleId = interaction.options.getString('palier', true);

    const trophyRoles = await getTrophyRole(interaction.guild);

    const trophyRole = trophyRoles.find(trophyRole => trophyRole.roleId == roleId);
    if (!trophyRole) return interaction.editReply(`Le palier ${roleId} n'a pas été trouvé dans la liste des rôles paliers du serveur ${interaction.guild.name} ❌`);
    await removeTrophyRole(interaction.guild, trophyRole.roleId);
    return interaction.editReply(`Le palier ${trophyRole.trophies}🏆 - <@&${trophyRole.roleId}> a été supprimé du serveur ${interaction.guild.name} ✅`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { getTrophyRole, removeTrophyRole } from '../../../database/trophyRole';

export const data = new SlashCommandBuilder()
  .setName('removetrophyrole')
  .setDescription('Dissocie un palier de trophées du rôle qui lui était associé.')
 .addStringOption(option =>
  option.setName('palier')
    .setDescription('Choisis un role')
    .setRequired(true)
    .setAutocomplete(true)
)
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export const autocomplete = async (interaction: AutocompleteInteraction & { guild: Guild }) => {
	const focusedValue = interaction.options.getFocused();
    const roles = await getTrophyRole(interaction.guild);
    const guildRoles = roles.filter(role => role.guildId == interaction.guild.id);

    const choices = guildRoles.sort((choice1, choice2) => choice2.trophies - choice1.trophies).map(role => {
        const discordRole = interaction.guild.roles.cache.get(role.roleId);
        return {
            id: role.roleId,
            description: discordRole
            ? `${role.trophies}🏆 - ${discordRole.name}` 
            : `${role.trophies}🏆 - rôle introuvable`
        };
    });
	const filtered = choices.filter(choice => choice.description.startsWith(focusedValue));
	await interaction.respond(
		filtered.map(choice => ({ name: choice.description, value: choice.id })),
	);
}