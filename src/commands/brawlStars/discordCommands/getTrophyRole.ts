import { ChatInputCommandInteraction, Message, Role } from 'discord.js';
import { getTrophyRole } from '../../../database/trophyRole';

export async function handleGetTrophyRole(interaction: ChatInputCommandInteraction): Promise<Message> {
        if(!interaction.guild) return interaction.editReply(`❌ Les commandes ne sont utilisables que dans les serveurs.`);
        const trophyRoles = await getTrophyRole(interaction.guild);
        if(!trophyRoles[0]) return interaction.editReply(`❌ Le serveur ${interaction.guild.name} n'a pas encore associé de nombre de trophées à un rôle.`)
        return interaction.editReply(`🏆 Le serveur ${interaction.guild.name} a associé les grades suivants à des paliers de tropéhes :\n${trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).map(trophyRole => `+ de \`${trophyRole.trophies.toLocaleString()}\` : <@&${trophyRole.roleId}>`).join('\n')}`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('gettrophyroles')
  .setDescription('Renvoie la liste des rôles attribués à des paliers de trophées');