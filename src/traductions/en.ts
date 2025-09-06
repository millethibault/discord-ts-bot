import { GuildMember, Role, User } from "discord.js";
import { Traductions } from "./type";

export const traductions: Traductions = {
    ERROR_COMMAND_NOT_FOUND: `Command not found`,
    ERROR_LINKED_TO_YOUR_DISCORD_ACCOUNT: `❌ Error linked to your Discord account.`,
    ERROR_COMMAND_NOT_IN_GUILDCHANNEL: `❌ Commands can only be used in server channels.`,
    ABOUT_BOT: (botUser: User) =>
        `${botUser.username} is a Discord bot for managing Brawl Stars clubs.\n` +
        `It automatically updates server members based on their in-game profile: trophies reached, club, rank, nickname.\n` +
        `Feel free to add the bot to your server: [PLACEHOLDER]`,
    ERROR_SYNC_BOT: `Bot synchronization error`,
    AUDIT_DONE: (dbRolesLength: number, botMember: GuildMember) =>
        `Audit completed.\n${botMember} manages \`${dbRolesLength}\` roles.\n\n`,
    AUDIT_AUDITED_ROLES: (auditedDbRolesLength: number, botMember: GuildMember, roleList: string) =>
        `✅ \`${auditedDbRolesLength}\` ${
            auditedDbRolesLength > 1
                ? `roles managed by ${botMember} are compliant`
                : `role managed by ${botMember} is compliant`
        }: ${roleList}.\n\n`,
    AUDIT_NON_MANAGEABLE_ROLES: (
        nonManageableManagedRolesSize: number,
        botMember: GuildMember,
        botRole: Role,
        roleList: string
    ) =>
        `❌ \`${nonManageableManagedRolesSize}\` ${
            nonManageableManagedRolesSize > 1
                ? `roles are supposed to be managed by ${botMember} but are not`
                : `role is supposed to be managed by ${botMember} but is not`
        }: ${roleList}.\nMake sure these roles should be managed by ${botMember} and place them below the ${botRole} role in server settings if necessary.\n\n`,
    AUDIT_DANGEROUS_ROLES: (
        nonAuditedDbRolesLength: number,
        botMember: GuildMember,
        roleList: string
    ) =>
        `⚠️ \`${nonAuditedDbRolesLength}\` ${
            nonAuditedDbRolesLength > 1
                ? `roles managed by ${botMember} are non-compliant due to excessive permissions`
                : `role managed by ${botMember} is non-compliant due to excessive permissions`
        }:\n- ${roleList}.\nConsider manually auditing these roles as they may pose security or abuse risks.\n\n`,
    AUDIT_EXTREME_DANGER: "**‼️ WARNING: Some of your roles grant permissions without requiring moderator verification.\nRun the \`/set verify\` command immediately!**",
    YOU_CAN_SEE_LOG: "You can view a log of the bot's actions in the server settings -> Audit log.",
    HELP_CHOOSE_CATEGORY: "Choose a help category",
    HELP_CHOOSE_CATEGORY_MESSAGE: "📚 Here's the help menu. Select a category to learn more:",
    HELP_COMMAND_NOT_FOUND: `Help command not found.`,
    ERROR_MISSING_TAG_OR_QR: "❌ Please provide a Brawl Stars tag or a QR code!",
    ERROR_INVALID_QR_CODE: "❌ The provided QR code is invalid! You can find it by going to Friends → My QR in Brawl Stars.",
    ERROR_NO_TAG_PROVIDED: "❌ Please provide a Brawl Stars tag.",
    ERROR_PLAYER_NOT_FOUND: (tag) => `❌ Player tag \`${tag}\` was not found on Brawl Stars.`,
    LOG_TITLE: "📜 Role History",
    LOG_EMPTY: "No logs found.",
    LOG_ADDED: "+ Added",
    LOG_REMOVED: "- Removed",
    UNLINK_ALREADY_UNLINKED: (username, guildName) =>
        `❌ Discord account of ${username} on server ${guildName} is not linked to any Brawl Stars account.`,
    UNLINK_SUCCESS: (username, guildName) =>
        `✅ Discord account of ${username} on server ${guildName} is no longer linked to any Brawl Stars account.`,
    ERROR_BOT_MISSING_PERMISSION: "❌ I don't have permission to assign roles on this server!",
    ERROR_BOT_ROLE_TOO_LOW: (targetName, targetRole) =>
        `❌ I can't manage ${targetName} because their role is too high (${targetRole}).`,
    ERROR_USER_ROLE_TOO_LOW: (targetName, targetRole, executorRole) =>
        `❌ You are not authorized to manage ${targetName} because their role (${targetRole}) is equal to or higher than yours (${executorRole}).`,
    LINK_SUCCESS: (playerName, playerTag, username, guildName) =>
        `✅ Brawl Stars profile ${playerName} (\`${playerTag}\`) has been linked to Discord profile of ${username} on ${guildName}.`,
    LINK_PENDING_MODERATOR: (playerName, playerTag) =>
        `🔍 Profile found: ${playerName} (\`${playerTag}\`).\n⏳ Wait for a moderator to approve the link.`,
    LINK_TIMEOUT: `⏱️ Time expired. The profile link was not approved.`,
    LINK_APPROVED: (playerName, playerTag, username, guildName) =>
        `✅ Brawl Stars profile ${playerName} (\`${playerTag}\`) has been linked to Discord profile of ${username} on ${guildName}.`,
    LINK_REJECTED: `❌ The profile link was rejected by a moderator.`,
    LINK_NO_VALIDATION: `⏰ No moderator approved in time.`,
    NO_TROPHY_ROLE: "⚠️ No trophy roles have been created on this server.",
    TROPHY_ROLE_UPDATED: (removed, added) =>
        `🏆 Trophies updated: ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NO_GRADE_ROLE: "⚠️ No grade roles have been created on this server.",
    GRADE_ROLE_UPDATED: (removed, added) =>
        `🎖️ Grade updated: ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NO_CLUB_ROLE: "⚠️ No club roles have been created on this server.",
    CLUB_ROLE_UPDATED: (removed, added) =>
        `👥 Club updated: ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NAME_UPDATED: (newName) => `✏️ Name updated: ${newName}`,
    UPDATE_CLUB_NO_MATCH: (clubInput, guildName) =>
        `❌ No club is ${clubInput ? `registered` : `associated with \`${clubInput}\``} on server ${guildName}.`,
    UPDATE_CLUB_START: "✅ Server club update completed!\n\n",
    UPDATE_CLUB_NOT_FOUND: (clubName, clubTag) =>
        `❌ I couldn't find club ${clubName} (\`${clubTag}\`) on Brawl Stars!\n\n`,
    UPDATE_CLUB_MEMBERS_UPDATED: (emoji, countUpdated, clubName, countChecked, total) =>
        `${emoji} \`${countUpdated}\` member${countUpdated > 1 ? 's' : ''} of ${clubName} updated among \`${countChecked}/${total}\` registered on your server!\n\n`,
    UPDATE_CLUB_MEMBERS_ALREADY_UPDATED: (emoji, clubName, countChecked, total) =>
        `${emoji} All \`${countChecked}/${total}\` member${countChecked > 1 ? 's' : ''} of club ${clubName} registered on your server were already up to date!\n\n`,
    UPDATE_CLUB_ROLE_REMOVED: (count, roleName) =>
        `\`${count}\` member${count > 1 ? 's' : ''} lost the role ${roleName}.\n`,
    UPDATE_MEMBER_START: "✅ Discord profile update completed\n",
    UPDATE_MEMBER_NO_PROFILE: (nickname) =>
        `❌ ${nickname} has not yet registered their Brawl Stars tag.`,
    UPDATE_MEMBER_NOT_FOUND: (tag) =>
        `❌ Your profile \`${tag}\` was not found on Brawl Stars.`,
    UPDATE_MEMBER_ALL_UP_TO_DATE: (nickname) =>
        `All roles for ${nickname} were already up to date.\n`,
    UPDATE_MEMBER_NICKNAME_CHANGED: (oldName, newName) =>
        `✏️ Server nickname: ${oldName} ➡️ ${newName}`,
    ADD_CLUB_NOT_FOUND: (clubTag) =>
        `❌ Club tag \`${clubTag}\` was not found on Brawl Stars.`,
    ADD_CLUB_SUCCESS: (clubName, clubTag, guildName) =>
        `✅ Club ${clubName} (\`${clubTag}\`) has been added to server ${guildName}.`,
    AUTO_RENAME_ALREADY_ENABLED: "✅ Your server already automatically renames members during updates!",
    AUTO_RENAME_ALREADY_DISABLED: "❌ Your server already does not rename members during updates!",
    AUTO_RENAME_ENABLED: "✅ Your server will now automatically rename members during updates!",
    AUTO_RENAME_DISABLED: "❌ Your server will no longer rename members during updates!",
    SET_CLUB_ROLE_INVALID_ROLE: "❌ Please mention a valid role.",
    SET_CLUB_ROLE_MISSING_TAG: "❌ Please enter the club tag.",
    SET_CLUB_ROLE_NOT_FOUND: (clubTag) =>
        `❌ Club tag \`${clubTag}\` was not found on Brawl Stars.`,
    SET_CLUB_ROLE_SUCCESS: (clubName, roleName) =>
        `✅ The club ${clubName} has been linked to the role ${roleName}.`,
    SET_GRADE_ROLE_INVALID_ROLE: "❌ Please mention a valid role.",
    SET_GRADE_ROLE_INVALID_GRADE: "❌ Please mention a valid grade.",
    SET_GRADE_ROLE_SUCCESS: (gradeLabel, roleName) =>
        `✅ The grade ${gradeLabel} has been linked to the role ${roleName}.`,
    SET_TROPHY_ROLE_INVALID_ROLE: "❌ Please mention a valid role.",
    SET_TROPHY_ROLE_INVALID_TROPHIES: "❌ Please specify a valid number of trophies (0 < trophies < 1,000,000).",
    SET_TROPHY_ROLE_SUCCESS: (roleName, trophies) =>
        `✅ The role ${roleName} will be assigned to players exceeding ${trophies.toLocaleString()} 🏆`,
    VERIFY_ALREADY_ENABLED: "✅ Moderators already verify members during registration!",
    VERIFY_ALREADY_DISABLED: "❌ Moderators already do not verify members during registration!",
    VERIFY_ENABLED: "✅ Moderators will now verify members during registration!",
    VERIFY_DISABLE_WARNING:
        "⚠️ Warning, members will be able to register themselves and their roles may change accordingly.\n" +
        "Make sure no role managed by the bot grants excessive permissions before confirming.",
    VERIFY_DISABLED: "❌ Moderators will no longer verify members during registration.",
    VERIFY_CANCELLED: "✅ Okay, no changes will be made after all.",
    VERIFY_TIMEOUT: "⏱️ No changes made. Moderators will continue to verify members during registration.",
    REMOVE_CLUB_MISSING_TAG: "❌ Please enter a club tag.",
    REMOVE_CLUB_NOT_FOUND: (clubTag, guildName) =>
        `❌ The tag \`${clubTag}\` was not found in the list of clubs on server ${guildName}.`,
    REMOVE_CLUB_SUCCESS: (clubName, clubTag, guildName) =>
        `✅ The club ${clubName} (\`${clubTag}\`) has been removed from server ${guildName}.`,
    REMOVE_GRADE_ROLE_INVALID_GRADE: "❌ Please mention a valid grade.",
    REMOVE_GRADE_ROLE_ALREADY_REMOVED: (gradeLabel) =>
        `❌ The grade ${gradeLabel} was already not linked to any role!`,
    REMOVE_GRADE_ROLE_SUCCESS: (gradeLabel) =>
        `✅ The grade ${gradeLabel} is no longer linked to any role!`,
    REMOVE_TROPHY_ROLE_NOT_FOUND: (roleId, guildName) =>
        `❌ The tier ${roleId} was not found in the list of trophy roles on server ${guildName}.`,
    REMOVE_TROPHY_ROLE_SUCCESS: (trophies, roleId, guildName) =>
        `✅ The tier ${trophies}🏆 - <@&${roleId}> has been removed from server ${guildName}.`,
    GET_AUTO_RENAME_ENABLED: "✅ Your server automatically renames members during updates!",
    GET_AUTO_RENAME_DISABLED: "❌ Your server does not rename members during updates!",
    GET_CLUB_ROLE_EMPTY: (guildName) =>
        `❌ Server ${guildName} has not yet linked any club to a role.`,
    GET_CLUB_ROLE_LIST: (guildName, count, list) =>
        `✅ Server ${guildName} has ${count} club${count > 1 ? 's' : ''} linked to roles:\n${list}`,
    GET_CLUBS_EMPTY: (guildName) =>
        `❌ Server ${guildName} has not registered any club.`,
    GET_CLUBS_LIST: (guildName, count, list) =>
        `✅ Server ${guildName} has ${count} registered club${count > 1 ? 's' : ''}:\n${list}`,
    GET_GRADE_ROLE_EMPTY: (guildName) =>
        `❌ Server ${guildName} has not yet linked any grade to a role.`,
    GET_GRADE_ROLE_LIST: (guildName, president, vicePresident, senior, member) =>
        `✅ Server ${guildName} has linked the following grades to roles:\n` +
        `President: ${president}\n` +
        `Vice President: ${vicePresident}\n` +
        `Senior: ${senior}\n` +
        `Member: ${member}`,
    GET_TROPHY_ROLE_NOT_IN_GUILD: "❌ Commands can only be used in servers.",
    GET_TROPHY_ROLE_EMPTY: (guildName) =>
        `❌ Server ${guildName} has not yet linked any trophy count to a role.`,
    GET_TROPHY_ROLE_LIST: (guildName, list) =>
        `🏆 Server ${guildName} has linked the following grades to trophy tiers:\n${list}`,
    GET_VERIFY_ENABLED: "✅ Moderators verify members during registration!",
    GET_VERIFY_DISABLED: "❌ Moderators do not verify members during registration!",
    GET_PROFILE_MEMBER_NOT_FOUND: "❌ Member not found.",
    GET_PROFILE_NO_TAG: (nickname) => `❌ ${nickname} has not yet registered their Brawl Stars tag.`,
    GET_PROFILE_NOT_FOUND: (tag) => `❌ Player tag \`${tag}\` was not found on Brawl Stars.`,
    GET_PROFILE_HEADER: (username, guildName, playerName, playerTag) =>
        `The Brawl Stars profile linked to ${username} on ${guildName} is ${playerName} (\`${playerTag}\`).\n`,
    GET_PROFILE_TROPHIES_LINE: (trophies, status, role, removed) =>
        `${trophies}🏆 → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_CLUB_LINE: (clubName, clubTag, status, role, removed) =>
        `Club: ${clubName} (\`#${clubTag}\`) → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_GRADE_LINE: (grade, status, role, removed) =>
        `Grade: ${grade} → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_REMINDER_UPDATE: "Don't forget to update your roles 😉.",
    GET_PROFILE_REMINDER_UP_TO_DATE: (nicknameStatus) =>
        `Your profile is up to date${nicknameStatus ? "" : " (except for the nickname)"} 😉.`,
    LABEL_NONE: "None",
    LABEL_NO_ROLE: "No role",
    LABEL_PROFILE_OF: (playerName) => `📋 Profile of ${playerName}`,
    LABEL_TROPHIES: "🏆 Trophies",
    LABEL_CLUB: "👥 Club",
    LABEL_GRADE: "🎖️ Grade",
    HELP_FIELD_COMMAND: "Command",
    HELP_FIELD_USAGE: "Usage",
    HELP_CLUBS_DESCRIPTION: "Link your Brawl Stars clubs to your Discord server.",
    HELP_CLUBS_SET_CLUB: "Link a Brawl Stars club to your Discord server.",
    HELP_CLUBS_SET_CLUBROLE: "Link a Brawl Stars club to a role on your Discord server.",
    HELP_CLUBS_GET_CLUBS: "Returns the list of Brawl Stars clubs linked to the Discord server.",
    HELP_CLUBS_GET_CLUBROLES: "Returns the list of Brawl Stars clubs linked to roles on the server.",
    HELP_CLUBS_REMOVE_CLUB: "Unlinks a Brawl Stars club from the server and its associated role.",
    HELP_CLUBS_USAGE: "Discord members linked to their BS account have their club role updated automatically.",
    HELP_AUDIT_DESCRIPTION: "Ensure the security of your Discord server.",
    HELP_AUDIT_AUDIT: "Provides a bot permission audit to prevent role abuse.",
    HELP_AUDIT_LOGS: "Displays the history of role changes made by the bot.",
    HELP_CONFIG_DESCRIPTION: "Change the bot’s settings.",
    HELP_CONFIG_SET_VERIFY: "Enable/disable mandatory moderator verification before member registration.",
    HELP_CONFIG_GET_VERIFY: "Returns whether verification is enabled or not.",
    HELP_CONFIG_SET_AUTORENAME: "Enable/disable automatic renaming of members on the server.",
    HELP_CONFIG_GET_AUTORENAME: "Returns whether automatic renaming is enabled or not.",
    HELP_CATEGORY_CLUBS: "🧩 Clubs",
    HELP_CATEGORY_AUDIT: "📋 Audit",
    HELP_CATEGORY_CONFIG: "⚙️ Configuration",
    HELP_CATEGORY_GRADES: "🎖️ Grades",
    HELP_CATEGORY_PROFILE: "🔗 Profile",
    HELP_CATEGORY_TROPHIES: "🏆 Trophies",
    HELP_CATEGORY_UPDATE: "🔄 Update",
    HELP_GRADES_DESCRIPTION: "Assign roles to your club ranks on your Discord server.",
    HELP_GRADES_SET_GRADEROLE: "Link a Brawl Stars grade to a role.",
    HELP_GRADES_GET_GRADEROLES: "Returns the list of Brawl Stars grades linked to roles.",
    HELP_GRADES_REMOVE_GRADEROLE: "Unlinks a Brawl Stars grade from its role.",
    HELP_GRADES_USAGE: "Discord members linked to their BS account have their grade updated automatically when part of your clubs. It’s recommended not to give too many permissions to these roles, or to enable verification with `/verify`.",
    HELP_PROFILE_DESCRIPTION: "Link your Discord account to your Brawl Stars profile.",
    HELP_PROFILE_LINK: "Link a BS account to your Discord account.",
    HELP_PROFILE_UNLINK: "Unlink your BS account from Discord.",
    HELP_PROFILE_GET_PROFILE: "Returns player information for a server member.",
    HELP_PROFILE_USAGE: "Discord members linked to their BS account have their roles updated automatically.",
    HELP_TROPHIES_DESCRIPTION: "Link trophy tiers to roles.",
    HELP_TROPHIES_SET_TROPHYROLE: "Link a trophy tier to a role.",
    HELP_TROPHIES_GET_TROPHYROLES: "Returns the list of trophy tiers linked to roles.",
    HELP_TROPHIES_REMOVE_TROPHYROLE: "Unlink a trophy tier from its role.",
    HELP_TROPHIES_USAGE: "Discord members linked to their BS account have their trophy roles updated automatically.",
    HELP_UPDATE_DESCRIPTION: "Automatically update your members.",
    HELP_UPDATE_UPDATE: "Updates a server member's roles based on their Brawl Stars profile.",
    HELP_UPDATE_UPDATE_CLUB: "Updates the roles of all members in a Brawl Stars club.",
    LANG_ALREADY: `The language is already set to Engish 🇬🇧 !`,
    LANG_CHANGED: (from: string) => `The language has been changed from ${traductions.LANG_NAME_WITH_EMOJI(from)} to Engish 🇬🇧.`,
    LANG_NAME_WITH_EMOJI: (lang: string) => {
        if (lang === 'en') return `English 🇬🇧`;
        if (lang === 'fr') return `French 🇫🇷`;
        return `Unknown 🏳️`;
    },
    GET_LANG: `The language is set to Engish 🇬🇧 !`
}