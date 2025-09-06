import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_CLUBS,
  description: t.HELP_CLUBS_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/set club` - ' + t.HELP_CLUBS_SET_CLUB },
    { name: t.HELP_FIELD_COMMAND, value: '`/set clubrole` - ' + t.HELP_CLUBS_SET_CLUBROLE },
    { name: t.HELP_FIELD_COMMAND, value: '`/get clubs` - ' + t.HELP_CLUBS_GET_CLUBS },
    { name: t.HELP_FIELD_COMMAND, value: '`/get clubroles` - ' + t.HELP_CLUBS_GET_CLUBROLES },
    { name: t.HELP_FIELD_COMMAND, value: '`/remove club` - ' + t.HELP_CLUBS_REMOVE_CLUB },
    { name: t.HELP_FIELD_USAGE, value: t.HELP_CLUBS_USAGE },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_CLUBS,
  optionValue: 'clubs',
});
