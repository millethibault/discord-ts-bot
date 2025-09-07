import { SlashCommandBuilder } from "discord.js";
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('get')
  .setDescription(tradEn.GET_COMMAND_DESCRIPTION)
  .setDescriptionLocalizations({
    fr: tradFr.GET_COMMAND_DESCRIPTION,
    "en-GB": tradEn.GET_COMMAND_DESCRIPTION,
    "en-US": tradEn.GET_COMMAND_DESCRIPTION
  })
  .addSubcommand(sub =>
    sub.setName('autorename')
      .setDescription(tradEn.GET_AUTORENAME_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_AUTORENAME_DESCRIPTION,
        "en-GB": tradEn.GET_AUTORENAME_DESCRIPTION,
        "en-US": tradEn.GET_AUTORENAME_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('verify')
      .setDescription(tradEn.GET_VERIFY_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_VERIFY_DESCRIPTION,
        "en-GB": tradEn.GET_VERIFY_DESCRIPTION,
        "en-US": tradEn.GET_VERIFY_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('clubroles')
      .setDescription(tradEn.GET_CLUBROLES_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_CLUBROLES_DESCRIPTION,
        "en-GB": tradEn.GET_CLUBROLES_DESCRIPTION,
        "en-US": tradEn.GET_CLUBROLES_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('clubs')
      .setDescription(tradEn.GET_CLUBS_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_CLUBS_DESCRIPTION,
        "en-GB": tradEn.GET_CLUBS_DESCRIPTION,
        "en-US": tradEn.GET_CLUBS_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('graderoles')
      .setDescription(tradEn.GET_GRADEROLES_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_GRADEROLES_DESCRIPTION,
        "en-GB": tradEn.GET_GRADEROLES_DESCRIPTION,
        "en-US": tradEn.GET_GRADEROLES_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('trophyroles')
      .setDescription(tradEn.GET_TROPHYROLES_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_TROPHYROLES_DESCRIPTION,
        "en-GB": tradEn.GET_TROPHYROLES_DESCRIPTION,
        "en-US": tradEn.GET_TROPHYROLES_DESCRIPTION
      })
  )
  .addSubcommand(sub =>
    sub.setName('profile')
      .setDescription(tradEn.GET_PROFILE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_PROFILE_DESCRIPTION,
        "en-GB": tradEn.GET_PROFILE_DESCRIPTION,
        "en-US": tradEn.GET_PROFILE_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('tag')
          .setDescription(tradEn.GET_PROFILE_OPTION_TAG_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.GET_PROFILE_OPTION_TAG_DESCRIPTION,
            "en-GB": tradEn.GET_PROFILE_OPTION_TAG_DESCRIPTION,
            "en-US": tradEn.GET_PROFILE_OPTION_TAG_DESCRIPTION
          })
          .setRequired(false)
      )
      .addUserOption(option =>
        option.setName('membre')
          .setDescription(tradEn.GET_PROFILE_OPTION_MEMBER_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.GET_PROFILE_OPTION_MEMBER_DESCRIPTION,
            "en-GB": tradEn.GET_PROFILE_OPTION_MEMBER_DESCRIPTION,
            "en-US": tradEn.GET_PROFILE_OPTION_MEMBER_DESCRIPTION
          })
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('lang')
      .setDescription(tradEn.GET_LANG_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.GET_LANG_DESCRIPTION,
        "en-GB": tradEn.GET_LANG_DESCRIPTION,
        "en-US": tradEn.GET_LANG_DESCRIPTION
      })
  )
