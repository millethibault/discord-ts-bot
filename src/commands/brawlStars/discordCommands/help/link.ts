import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '🔗 Profile',
  description: 'Associez votre compte Discord à votre profil Brawl Stars.',
  fields: [
    {
      name: 'Commande',
      value: '`/link` - Lie un compte BS à votre compte Discord.',
    },
    {
      name: 'Commande',
      value: '`/unlink` — Délie ton compte BS de Discord',
    },
    {
      name: 'Commande',
      value: '`/get profile` — Renvoie les informations de joueur d\'un membre du serveur.',
    },
    {
      name: 'Utilisation',
      value: 'Les membres discord reliés à leur comtpe BS ont leurs rôles mis à jour.',
    },
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '🔗 Profile',
  optionValue: 'link'
};