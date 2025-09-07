import { SlashCommandBuilder } from 'discord.js';
import { traductions as tradFr } from '../../../traductions/fr';
import { traductions as tradEn } from '../../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription(tradEn.HELP_COMMAND_DESCRIPTION) // Description par défaut en anglais
  .setDescriptionLocalizations({
    fr: tradFr.HELP_COMMAND_DESCRIPTION,
    "en-GB": tradEn.HELP_COMMAND_DESCRIPTION,
    "en-US": tradEn.HELP_COMMAND_DESCRIPTION,
  });
