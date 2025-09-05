import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '🎖️ Grades',
  description: 'Donnez aux gradés de vos clubs un rôle sur votre serveur discord.',
  fields: [
    {
      name: 'Commande',
      value: '`/set graderole` - Associe un grade Brawl Stars à un rôle.\nSeuls les gradés des clans enregistrés sur le serveur auront leur rôle de grade mis à jour.'
    },
    {
      name: 'Commande',
      value: '`/get graderole` - Renvoie la liste des grades Brawl Stars associés à un rôle.'
    },
    {
      name: 'Commande',
      value: '`/remove graderole` - Dissocie un grade Brawl Stars de son rôle.'
    },
    {
      name: 'Utilisation',
      value: 'Les membres discord reliés à leur comtpe BS ont leur grade de club mis à jour automatiquement lorsqu\'ils font partie de vos clans.\nIl est conseillé de ne pas donner trop de permissions à ces rôles, ou bien d\'activer la vérification avec `/verify`.',
    },
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '🎖️ Grades',
  optionValue: 'grades'
};