import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '🧩 Clubs',
  description: 'Associez vos clubs Brawl Stars à votre serveur discord.',
  fields: [
    {
      name: 'Commande',
      value: '`/set club` - Lie un club Brawl Stars à votre serveur discord.'
    },
    {
      name: 'Commande',
      value: '`/set clubrole` - Associe un club Brawl Stars à un rôle sur votre serveur discord.'
    },
    {
      name: 'Commande',
      value: '`/get clubs` - Renvoie la liste des clubs Brawl Stars liés au serveur discord.'
    },
    {
      name: 'Commande',
      value: '`/get clubroles` - Renvoie la liste des clubs Brawl Stars associés à un rôle sur le serveur.'
    },
    {
      name: 'Commande',
      value: '`/remove club` - Dissocie un club Brawl Stars de votre serveur discord et du rôle qui lui était associé.'
    },
    {
      name: 'Utilisation',
      value: 'Les membres discord reliés à leur comtpe BS ont leur rôle de club mis à jour.',
    },
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '🧩 Clubs',
  optionValue: 'clubs'
};