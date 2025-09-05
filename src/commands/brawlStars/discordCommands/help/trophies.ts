import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '🏆 Trophées',
  description: 'Associez des paliers de trophées à des rôles.',
  fields: [
    {
      name: 'Commande',
      value: '`/set trophyrole` - Associe un palier de trophées à un rôle.'
    },
    {
      name: 'Commande',
      value: '`/get trophyrole` - Renvoie la liste des paliers de trophées associés à un rôle.'
    },
    {
      name: 'Commande',
      value: '`/remove trophyrole` - Dissocie un palier de trophées de son rôle.'
    },
    {
      name: 'Utilisation',
      value: 'Les membres discord reliés à leur comtpe BS ont leur rôle de trophées mis à jour.',
    },
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '🏆 Trophées',
  optionValue: 'trophies'
};