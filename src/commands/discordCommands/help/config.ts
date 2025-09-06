import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_CONFIG,
  description: t.HELP_CONFIG_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/set verify` - ' + t.HELP_CONFIG_SET_VERIFY },
    { name: t.HELP_FIELD_COMMAND, value: '`/get verify` - ' + t.HELP_CONFIG_GET_VERIFY },
    { name: t.HELP_FIELD_COMMAND, value: '`/set autorename` - ' + t.HELP_CONFIG_SET_AUTORENAME },
    { name: t.HELP_FIELD_COMMAND, value: '`/get autorename` - ' + t.HELP_CONFIG_GET_AUTORENAME },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_CONFIG,
  optionValue: 'config',
});
