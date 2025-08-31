import { ChatInputCommandInteraction, Guild, Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setClub } from '../../../database/club';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleAddClub(interaction: ChatInputCommandInteraction & { guild: Guild }): Promise<Message> {
    let clubTag = interaction.options.getString('tag', true);
    clubTag = clearTag(clubTag);

    return bsapi.getClubData(clubTag)
    .then(async club => {
        await setClub(interaction.guild, club);
        return interaction.editReply(`Le club ${club.name} (\`${club.tag}\`) a été ajouté au serveur ${interaction.guild.name} ✅`);
    })
    .catch(err => {
        return interaction.editReply(`Le tag de club \`${clubTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('addclub')
  .setDescription('Lie un club Brawl Stars à votre serveur discord.')
  .addStringOption(option => 
    option.setName('tag')
    .setDescription('Le tag de votre club, retrouvable sur la page de votre clan.')
    .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);