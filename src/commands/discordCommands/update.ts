import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('update')
  .setDescription('Mettre à jour des membres en fonction des paramètres du serveur')
  .addSubcommand(sub => sub
    .setName('profile')
    .setDescription('Met à jours les rôles discord d\'un membre en fonction de son profil Brawl Stars lié.')
    .addUserOption(option => 
        option.setName('membre')
        .setDescription('Le membre à mettre à jour')
        .setRequired(false)
    )
  )
    .addSubcommand(sub => sub
    .setName('club')
    .setDescription('Met à jours les rôles discord des membres de vos clubs enregistrés sur votre serveur.')
    .addStringOption(option =>
        option.setName('club')
        .setDescription('Choisis un club')
        .setRequired(false)
        .setAutocomplete(true)
    )
)
.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)