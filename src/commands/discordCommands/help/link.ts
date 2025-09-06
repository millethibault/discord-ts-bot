import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_PROFILE,
  description: t.HELP_PROFILE_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/link` - ' + t.HELP_PROFILE_LINK },
    { name: t.HELP_FIELD_COMMAND, value: '`/unlink` - ' + t.HELP_PROFILE_UNLINK },
    { name: t.HELP_FIELD_COMMAND, value: '`/get profile` - ' + t.HELP_PROFILE_GET_PROFILE },
    { name: t.HELP_FIELD_USAGE, value: t.HELP_PROFILE_USAGE },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_PROFILE,
  optionValue: 'link',
});