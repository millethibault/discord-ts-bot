import { APIEmbed } from 'discord.js';
import { Traductions } from '../../../traductions/type';

export const helpEmbed = (t: Traductions): APIEmbed => ({
  title: t.HELP_CATEGORY_AUDIT,
  description: t.HELP_AUDIT_DESCRIPTION,
  fields: [
    { name: t.HELP_FIELD_COMMAND, value: '`/audit` - ' + t.HELP_AUDIT_AUDIT },
    { name: t.HELP_FIELD_COMMAND, value: '`/logs` - ' + t.HELP_AUDIT_LOGS },
  ],
  color: 0x00AEFF,
});

export const helpMeta = (t: Traductions) => ({
  label: t.HELP_CATEGORY_AUDIT,
  optionValue: 'audit',
});
