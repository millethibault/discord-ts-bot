import { APIEmbed } from 'discord.js';

export const helpEmbed: APIEmbed = {
  title: '📋 Audit',
  description: 'Assurez la sécurité de votre serveur discord',
  fields: [
    {
      name: 'Commande',
      value: '`/audit` - Fournit un audit des autorisations du bot sur le serveur afin d\'éviter que des membres ne s\'octroient des rôles contre votre gré.',
    }
  ],
  color: 0x00AEFF,
};

export const helpMeta = {
  label: '📋 Audit',
  optionValue: 'audit'
};