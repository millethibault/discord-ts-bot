import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_TROPHIES,
  description: t.HELP_TROPHIES_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/set trophyrole` - ' + t.HELP_TROPHIES_SET_TROPHYROLE },
    { name: t.HELP_FIELD_COMMAND, value: '`/get trophyroles` - ' + t.HELP_TROPHIES_GET_TROPHYROLES },
    { name: t.HELP_FIELD_COMMAND, value: '`/remove trophyrole` - ' + t.HELP_TROPHIES_REMOVE_TROPHYROLE },
    { name: t.HELP_FIELD_USAGE, value: t.HELP_TROPHIES_USAGE },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_TROPHIES,
  optionValue: 'trophies',
});