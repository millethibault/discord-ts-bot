import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription(tradEn.REMOVE_COMMAND_DESCRIPTION)
  .setDescriptionLocalizations({
    fr: tradFr.REMOVE_COMMAND_DESCRIPTION,
    "en-GB": tradEn.REMOVE_COMMAND_DESCRIPTION,
    "en-US": tradEn.REMOVE_COMMAND_DESCRIPTION
  })
  .addSubcommand(sub =>
    sub.setName('club')
      .setDescription(tradEn.REMOVE_CLUB_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.REMOVE_CLUB_DESCRIPTION,
        "en-GB": tradEn.REMOVE_CLUB_DESCRIPTION,
        "en-US": tradEn.REMOVE_CLUB_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('club')
          .setDescription(tradEn.REMOVE_CLUB_OPTION_CLUB_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.REMOVE_CLUB_OPTION_CLUB_DESCRIPTION,
            "en-GB": tradEn.REMOVE_CLUB_OPTION_CLUB_DESCRIPTION,
            "en-US": tradEn.REMOVE_CLUB_OPTION_CLUB_DESCRIPTION
          })
          .setRequired(true)
          .setAutocomplete(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('trophyrole')
      .setDescription(tradEn.REMOVE_TROPHYROLE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.REMOVE_TROPHYROLE_DESCRIPTION,
        "en-GB": tradEn.REMOVE_TROPHYROLE_DESCRIPTION,
        "en-US": tradEn.REMOVE_TROPHYROLE_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('palier')
          .setDescription(tradEn.REMOVE_TROPHYROLE_OPTION_PALIER_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.REMOVE_TROPHYROLE_OPTION_PALIER_DESCRIPTION,
            "en-GB": tradEn.REMOVE_TROPHYROLE_OPTION_PALIER_DESCRIPTION,
            "en-US": tradEn.REMOVE_TROPHYROLE_OPTION_PALIER_DESCRIPTION
          })
          .setRequired(true)
          .setAutocomplete(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('graderole')
      .setDescription(tradEn.REMOVE_GRADEROLE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.REMOVE_GRADEROLE_DESCRIPTION,
        "en-GB": tradEn.REMOVE_GRADEROLE_DESCRIPTION,
        "en-US": tradEn.REMOVE_GRADEROLE_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('grade')
          .setDescription(tradEn.REMOVE_GRADEROLE_OPTION_GRADE_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.REMOVE_GRADEROLE_OPTION_GRADE_DESCRIPTION,
            "en-GB": tradEn.REMOVE_GRADEROLE_OPTION_GRADE_DESCRIPTION,
            "en-US": tradEn.REMOVE_GRADEROLE_OPTION_GRADE_DESCRIPTION
          })
          .setRequired(true)
          .setChoices(
            { name: 'Président', value: 'president' },
            { name: 'Vice-Président', value: 'vicePresident' },
            { name: 'Sénior', value: 'senior' },
            { name: 'Membre', value: 'member' }
          )
      )
  )

.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)