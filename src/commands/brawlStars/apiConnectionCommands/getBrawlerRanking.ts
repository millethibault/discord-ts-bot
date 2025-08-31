import { ChatInputCommandInteraction, Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';

export function handleBrawlerRanking(interaction: ChatInputCommandInteraction): Promise<Message> {
    const brawler = interaction.options.getString('brawler', true);
    const rawCountryCode = interaction.options.getString('codepays', false);
    const countryCode: string | undefined = rawCountryCode ?? undefined; 
    const rawLimit = interaction.options.getInteger('limite', false);
    const limit: number | undefined = rawLimit ?? undefined; 
    

    return bsapi.getBrawlerRankings(brawler, countryCode, limit)
    .then(ranking => {
        console.log(JSON.stringify(ranking, null, 2))
        if(countryCode && ranking.length == 0) return interaction.editReply(`Veuillez entrer un code pays valide ❌`);
        return interaction.editReply(`Le classement a été loggé ! 😉 Le meilleur joueur de ${brawler.toLocaleLowerCase()} est ${ranking[0].name} avec ${ranking[0].trophies} 🏆`);
    })
    .catch(err => {
        console.error(err);
        return interaction.editReply(`Une erreur est survenue lors de la récupération du classement ❌`);
    });
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('getbrawlerranking')
  .setDescription('Affiche votre profile Brawl Stars ou celui de quelqu\'un d\'autre.')
  .addStringOption(option => 
    option.setName('brawler')
    .setDescription('Le nom du Brawler')
    .setRequired(true)
  )
  .addStringOption(option => 
    option.setName('codepays')
    .setDescription('Le code Pays')
    .setRequired(false)
  )
  .addIntegerOption(option => 
    option.setName('limite')
    .setDescription('Le nombre de joueurs à renvoyer')
    .setRequired(false)
  )