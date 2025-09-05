
import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '🔄 Update',
  description: 'Mettez vos membres à jour automatiquement.',
  fields: [
    {
      name: 'Commande',
      value: '`/update` - Met à jour les rôles d\'un membre du serveur en fonction de son profil Brawl Stars et des rôles configurés sur le serveur.'
    },
    {
      name: 'Commande',
      value: '`/update club` - Met à jour les rôles de tous les membres d\'un club Brawl Stars.'
    }
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '🔄 Update',
  optionValue: 'update'
};