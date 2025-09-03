import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription('Récupérer des paramètres')
  .addSubcommand(sub => sub
    .setName('club')
    .setDescription('Dissocie un de vos clubs Brawl Stars de votre serveur discord et à son rôle.')
    .addStringOption(option =>
        option.setName('club')
        .setDescription('Choisis un club')
        .setRequired(true)
        .setAutocomplete(true)
    )
  )
  .addSubcommand(sub => sub
    .setName('trophyrole')
    .setDescription('Dissocie un palier de trophées du rôle qui lui était associé.')
    .addStringOption(option =>
        option.setName('palier')
        .setDescription('Choisis un role')
        .setRequired(true)
        .setAutocomplete(true)
    )
    ).setDescription('Configurer des paramètres')
  .addSubcommand(sub => sub
    .setName('graderole')
    .setDescription('Dissocie les rôles discord que vous associez aux grades des membres de vos clans.')
    .addStringOption(option =>
        option.setName('grade')
        .setDescription('Le grade à dissocier de son rôle discord')
        .setRequired(true)
        .setChoices(
            {name: 'Président', value: 'president'},
            {name: 'Vice-Président', value: 'vicePresident'},
            {name: 'Sénior', value: 'senior'},
            {name: 'Membre', value: 'member'},
        )
    )
  )
.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)