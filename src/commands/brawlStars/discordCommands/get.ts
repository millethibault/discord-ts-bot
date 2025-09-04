import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('get')
  .setDescription('Récupérer des paramètres')
  .addSubcommandGroup(sub => sub
    .setName('autorename')
    .setDescription('Indique si le bot renomme automatiquement les membres ors de la mise à jour sur ce serveur.')
  )
  .addSubcommand(sub => sub
    .setName('clubroles')
    .setDescription('Affiche la liste des rôles discord associés à vos clubs Brawl Stars.')
  )
  .addSubcommand(sub => sub
    .setName('clubs')
    .setDescription('Affiche la liste des clubs Brawl Stars associés à ce serveur discord.')
  )
  .addSubcommand(sub => sub
    .setName('graderoles')
    .setDescription('Affiche la liste des rôles de grade dans vos clans associés à des rôles sur votre serveur discord.')
  )
  .addSubcommand(sub => sub
    .setName('trophyroles')
    .setDescription('Renvoie la liste des rôles attribués à des paliers de trophées')
  )
  .addSubcommand(sub => sub
    .setName('profile')
    .setDescription('Affiche votre profil Brawl Stars ou celui d\'un autre membre.')
    .addStringOption(option => 
      option.setName('tag')
      .setDescription('Le tag du joueur Brawl Stars')
      .setRequired(false)
    )
    .addUserOption(option => 
      option.setName('membre')
        .setDescription('Le membre discord')
        .setRequired(false)
    )
  )