import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('update')
  .setDescription(tradEn.UPDATE_COMMAND_DESCRIPTION)
  .setDescriptionLocalizations({
    fr: tradFr.UPDATE_COMMAND_DESCRIPTION,
    "en-GB": tradEn.UPDATE_COMMAND_DESCRIPTION,
    "en-US": tradEn.UPDATE_COMMAND_DESCRIPTION
  })
  .addSubcommand(sub =>
    sub.setName('profile')
      .setDescription(tradEn.UPDATE_PROFILE_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.UPDATE_PROFILE_DESCRIPTION,
        "en-GB": tradEn.UPDATE_PROFILE_DESCRIPTION,
        "en-US": tradEn.UPDATE_PROFILE_DESCRIPTION
      })
      .addUserOption(option =>
        option.setName('membre')
          .setDescription(tradEn.UPDATE_PROFILE_OPTION_MEMBER_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.UPDATE_PROFILE_OPTION_MEMBER_DESCRIPTION,
            "en-GB": tradEn.UPDATE_PROFILE_OPTION_MEMBER_DESCRIPTION,
            "en-US": tradEn.UPDATE_PROFILE_OPTION_MEMBER_DESCRIPTION
          })
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('club')
      .setDescription(tradEn.UPDATE_CLUB_DESCRIPTION)
      .setDescriptionLocalizations({
        fr: tradFr.UPDATE_CLUB_DESCRIPTION,
        "en-GB": tradEn.UPDATE_CLUB_DESCRIPTION,
        "en-US": tradEn.UPDATE_CLUB_DESCRIPTION
      })
      .addStringOption(option =>
        option.setName('club')
          .setDescription(tradEn.UPDATE_CLUB_OPTION_CLUB_DESCRIPTION)
          .setDescriptionLocalizations({
            fr: tradFr.UPDATE_CLUB_OPTION_CLUB_DESCRIPTION,
            "en-GB": tradEn.UPDATE_CLUB_OPTION_CLUB_DESCRIPTION,
            "en-US": tradEn.UPDATE_CLUB_OPTION_CLUB_DESCRIPTION
          })
          .setRequired(false)
          .setAutocomplete(true)
      )
  )

.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)