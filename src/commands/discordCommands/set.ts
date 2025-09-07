import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('set')
  .setDescription(tradEn.SET_COMMAND_DESCRIPTION)
  .setDescriptionLocalizations({
    fr: tradFr.SET_COMMAND_DESCRIPTION,
    "en-GB": tradEn.SET_COMMAND_DESCRIPTION,
    "en-US": tradEn.SET_COMMAND_DESCRIPTION
  })
  .addSubcommand(sub =>
    sub.setName('graderole')
      .setDescription(tradEn.SET_GRADEROLE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.SET_GRADEROLE_DESCRIPTION,
        "en-GB": tradEn.SET_GRADEROLE_DESCRIPTION,
        "en-US": tradEn.SET_GRADEROLE_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('grade')
          .setDescription(tradEn.SET_GRADEROLE_OPTION_GRADE_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_GRADEROLE_OPTION_GRADE_DESCRIPTION,
            "en-GB": tradEn.SET_GRADEROLE_OPTION_GRADE_DESCRIPTION,
            "en-US": tradEn.SET_GRADEROLE_OPTION_GRADE_DESCRIPTION
          })
          .setRequired(true)
          .setChoices(
            { name: 'Président', value: 'president' },
            { name: 'Vice-Président', value: 'vicePresident' },
            { name: 'Sénior', value: 'senior' },
            { name: 'Membre', value: 'member' }
          )
      )
      .addRoleOption(option =>
        option.setName('role')
          .setDescription(tradEn.SET_GRADEROLE_OPTION_ROLE_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_GRADEROLE_OPTION_ROLE_DESCRIPTION,
            "en-GB": tradEn.SET_GRADEROLE_OPTION_ROLE_DESCRIPTION,
            "en-US": tradEn.SET_GRADEROLE_OPTION_ROLE_DESCRIPTION
          })
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('trophyrole')
      .setDescription(tradEn.SET_TROPHYROLE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.SET_TROPHYROLE_DESCRIPTION,
        "en-GB": tradEn.SET_TROPHYROLE_DESCRIPTION,
        "en-US": tradEn.SET_TROPHYROLE_DESCRIPTION
      })
      .addIntegerOption(option =>
        option.setName('trophies')
          .setDescription(tradEn.SET_TROPHYROLE_OPTION_TROPHIES_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_TROPHYROLE_OPTION_TROPHIES_DESCRIPTION,
            "en-GB": tradEn.SET_TROPHYROLE_OPTION_TROPHIES_DESCRIPTION,
            "en-US": tradEn.SET_TROPHYROLE_OPTION_TROPHIES_DESCRIPTION
          })
          .setRequired(true)
      )
      .addRoleOption(option =>
        option.setName('role')
          .setDescription(tradEn.SET_TROPHYROLE_OPTION_ROLE_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_TROPHYROLE_OPTION_ROLE_DESCRIPTION,
            "en-GB": tradEn.SET_TROPHYROLE_OPTION_ROLE_DESCRIPTION,
            "en-US": tradEn.SET_TROPHYROLE_OPTION_ROLE_DESCRIPTION
          })
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('clubrole')
      .setDescription(tradEn.SET_CLUBROLE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.SET_CLUBROLE_DESCRIPTION,
        "en-GB": tradEn.SET_CLUBROLE_DESCRIPTION,
        "en-US": tradEn.SET_CLUBROLE_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('tag')
          .setDescription(tradEn.SET_CLUBROLE_OPTION_TAG_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_CLUBROLE_OPTION_TAG_DESCRIPTION,
            "en-GB": tradEn.SET_CLUBROLE_OPTION_TAG_DESCRIPTION,
            "en-US": tradEn.SET_CLUBROLE_OPTION_TAG_DESCRIPTION
          })
          .setRequired(true)
      )
      .addRoleOption(option =>
        option.setName('role')
          .setDescription(tradEn.SET_CLUBROLE_OPTION_ROLE_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_CLUBROLE_OPTION_ROLE_DESCRIPTION,
            "en-GB": tradEn.SET_CLUBROLE_OPTION_ROLE_DESCRIPTION,
            "en-US": tradEn.SET_CLUBROLE_OPTION_ROLE_DESCRIPTION
          })
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('autorename')
      .setDescription(tradEn.SET_AUTORENAME_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.SET_AUTORENAME_DESCRIPTION,
        "en-GB": tradEn.SET_AUTORENAME_DESCRIPTION,
        "en-US": tradEn.SET_AUTORENAME_DESCRIPTION
      })
      .addBooleanOption(option =>
        option.setName('rename')
          .setDescription(tradEn.SET_AUTORENAME_OPTION_RENAME_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.SET_AUTORENAME_OPTION_RENAME_DESCRIPTION,
            "en-GB": tradEn.SET_AUTORENAME_OPTION_RENAME_DESCRIPTION,
            "en-US": tradEn.SET_AUTORENAME_OPTION_RENAME_DESCRIPTION
          })
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
  sub.setName('verify')
    .setDescription(tradEn.SET_VERIFY_DESCRIPTION)
    .setDescriptionLocalizations({
      fr: tradFr.SET_VERIFY_DESCRIPTION,
      "en-GB": tradEn.SET_VERIFY_DESCRIPTION,
      "en-US": tradEn.SET_VERIFY_DESCRIPTION
    })
    .addBooleanOption(option =>
      option.setName('verify')
        .setDescription(tradEn.SET_VERIFY_OPTION_VERIFY_DESCRIPTION)
        .setDescriptionLocalizations({
          fr: tradFr.SET_VERIFY_OPTION_VERIFY_DESCRIPTION,
          "en-GB": tradEn.SET_VERIFY_OPTION_VERIFY_DESCRIPTION,
          "en-US": tradEn.SET_VERIFY_OPTION_VERIFY_DESCRIPTION
        })
        .setRequired(false)
    )
)
.addSubcommand(sub =>
  sub.setName('club')
    .setDescription(tradEn.SET_CLUB_DESCRIPTION)
    .setDescriptionLocalizations({
      fr: tradFr.SET_CLUB_DESCRIPTION,
      "en-GB": tradEn.SET_CLUB_DESCRIPTION,
      "en-US": tradEn.SET_CLUB_DESCRIPTION
    })
    .addStringOption(option =>
      option.setName('tag')
        .setDescription(tradEn.SET_CLUB_OPTION_TAG_DESCRIPTION)
        .setDescriptionLocalizations({
          fr: tradFr.SET_CLUB_OPTION_TAG_DESCRIPTION,
          "en-GB": tradEn.SET_CLUB_OPTION_TAG_DESCRIPTION,
          "en-US": tradEn.SET_CLUB_OPTION_TAG_DESCRIPTION
        })
        .setRequired(true)
    )
)
.addSubcommand(sub =>
  sub.setName('lang')
    .setDescription(tradEn.SET_LANG_DESCRIPTION)
    .setDescriptionLocalizations({
      fr: tradFr.SET_LANG_DESCRIPTION,
      "en-GB": tradEn.SET_LANG_DESCRIPTION,
      "en-US": tradEn.SET_LANG_DESCRIPTION
    })
    .addStringOption(option =>
      option.setName('lang')
        .setDescription(tradEn.SET_LANG_OPTION_LANG_DESCRIPTION)
        .setDescriptionLocalizations({
          fr: tradFr.SET_LANG_OPTION_LANG_DESCRIPTION,
          "en-GB": tradEn.SET_LANG_OPTION_LANG_DESCRIPTION,
          "en-US": tradEn.SET_LANG_OPTION_LANG_DESCRIPTION
        })
        .setRequired(true)
        .setChoices(
          { name: 'Français 🇫🇷', value: 'fr' },
          { name: 'English 🇬🇧', value: 'en' }
        )
    )
)
.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)