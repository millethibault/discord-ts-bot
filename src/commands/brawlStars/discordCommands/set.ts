import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('set')
  .setDescription('Configurer des paramètres')
  .addSubcommand(sub =>
    sub.setName('graderole')
        .setDescription('Définit les rôles discord que vous associez aux grades des membres de vos clans.')
        .addStringOption(option =>
            option.setName('grade')
            .setDescription('Le grade à associer à un rôle discord')
            .setRequired(true)
            .setChoices(
                {name: 'Président', value: 'president'},
                {name: 'Vice-Président', value: 'vicePresident'},
                {name: 'Sénior', value: 'senior'},
                {name: 'Membre', value: 'member'},
            )
        )
        .addRoleOption(option => 
            option.setName('role')
            .setDescription('Le rôle à attribuer')
            .setRequired(true)
        )
  )
  .addSubcommand(sub =>
    sub.setName('trophyrole')
    .setDescription('Définit les rôles discord que vous associez aux paliers de trophées atteints.')
    .addIntegerOption(option =>
      option.setName('trophies')
        .setDescription('Le nombre de trophées à atteindre')
        .setRequired(true)
      )
    .addRoleOption(option => 
       option.setName('role')
      .setDescription('Le rôle à attribuer')
      .setRequired(true)
    )
  )
  .addSubcommand(sub =>
    sub.setName('clubrole')
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
  )
  .addSubcommand(sub =>
    sub.setName('autorename')
    .setDescription('Active/désactive le renommage automatique des membres lors de leurs mises à jour.')
    .addBooleanOption(option =>
      option.setName('rename')
        .setDescription('Activer / Désactiver')
        .setRequired(false)
    )
  )
  .addSubcommand(sub =>
    sub.setName('verify')
    .setDescription('Active/désactive la vérification des modérateurs avant qu\'un membre n\'ajoute son profil.')
    .addBooleanOption(option =>
      option.setName('verify')
        .setDescription('Activer / Désactiver')
        .setRequired(false)
    )
  )
  .addSubcommand(sub =>
    sub.setName('club')
    .setDescription('Lie un club Brawl Stars à votre serveur discord.')
    .addStringOption(option => 
      option.setName('tag')
      .setDescription('Le tag de votre club, retrouvable sur la page de votre clan.')
      .setRequired(true)
    )
  )
.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)