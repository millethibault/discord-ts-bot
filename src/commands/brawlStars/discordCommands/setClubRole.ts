import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClubRole } from '../../../database/clubRole';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleSetClubRole(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
    const roleMention = interaction.options.getRole('role', true);
    if(!(roleMention instanceof Role)) return interaction.editReply(`❌ Veuillez mentionner un rôle valide.`);
    let clubTag = interaction.options.getString('tag', true);
    if(!clubTag) return interaction.editReply(`Veuillez entrer le tag de club ❌`);
    clubTag = clearTag(clubTag);

    return bsapi.getClubData(clubTag)
    .then(async club => {
        await setClubRole(interaction.guild, roleMention, club);
        return interaction.editReply(`Le club ${club.name} a été associé au rôle ${roleMention.name} ✅`);
    })
    .catch(err => {
        console.log(err);
        return interaction.editReply(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('setclubrole')
  .setDescription('Définit un rôle discord que vous associez aux membres d\'un de vos club.')
  .addStringOption(option =>
    option.setName('tag')
      .setDescription('Le tag de votre club, retrouvable sur la page de votre clan.')
      .setRequired(true)
  )
  .addRoleOption(option => 
    option.setName('role')
    .setDescription('Le rôle à attribuer')
    .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);