import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Guild,
  Message
} from 'discord.js';
import { getTrophyRole, removeTrophyRole } from '../../../database/trophyRole';
import { getTraductions } from '../../../traductions/tradFunctions';

export async function handleRemoveTrophyRole(
  interaction: ChatInputCommandInteraction & { guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const roleId = interaction.options.getString('palier', true);
  const trophyRoles = await getTrophyRole(interaction.guild);
  const trophyRole = trophyRoles.find(r => r.roleId === roleId);

  if (!trophyRole) {
    return interaction.editReply(traductions.REMOVE_TROPHY_ROLE_NOT_FOUND(roleId, interaction.guild.name));
  }

  await removeTrophyRole(interaction.guild, trophyRole.roleId);
  return interaction.editReply(
    traductions.REMOVE_TROPHY_ROLE_SUCCESS(trophyRole.trophies, trophyRole.roleId, interaction.guild.name)
  );
}

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