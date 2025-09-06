import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_UPDATE,
  description: t.HELP_UPDATE_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/update` - ' + t.HELP_UPDATE_UPDATE },
    { name: t.HELP_FIELD_COMMAND, value: '`/update club` - ' + t.HELP_UPDATE_UPDATE_CLUB },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_UPDATE,
  optionValue: 'update',
});