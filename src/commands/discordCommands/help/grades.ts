import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_GRADES,
  description: t.HELP_GRADES_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/set graderole` - ' + t.HELP_GRADES_SET_GRADEROLE },
    { name: t.HELP_FIELD_COMMAND, value: '`/get graderoles` - ' + t.HELP_GRADES_GET_GRADEROLES },
    { name: t.HELP_FIELD_COMMAND, value: '`/remove graderole` - ' + t.HELP_GRADES_REMOVE_GRADEROLE },
    { name: t.HELP_FIELD_USAGE, value: t.HELP_GRADES_USAGE },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_GRADES,
  optionValue: 'grades',
})