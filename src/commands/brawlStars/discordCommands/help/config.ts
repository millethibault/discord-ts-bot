
import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '⚙️ Config',
  description: 'Changez les paramètres du bot.',
  fields: [
    {
      name: 'Commande',
      value: '`/set verify` - Active/désactive la vérification obligatoire des modérateurs avant d\'enregistrer un membre sur le serveur afin d\'éviter les abus.\nIl est recommandé de ne pas donner trop de permissions aux rôles gérés par le bot ou bien de de laisser cette option activée.'
    },
    {
      name: 'Commande',
      value: '`/get verify` - Renvoie si la vérification est activée ou non.'
    },
    {
      name: 'Commande',
      value: '`/set autorename` - Active/Désactive le renommage automatique sur votre serveur discord.'
    },
    {
      name: 'Commande',
      value: '`/get autorename` - Renvoie si le renommage automatique est activé ou non.'
    },
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '⚙️ Config',
  optionValue: 'config'
};