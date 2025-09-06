import { GuildMember } from 'discord.js';
import { client } from '../bot/client';
import { getTraductions } from '../traductions/tradFunctions';

type CheckResult = [boolean, string];

export async function checkRoleConditions(
  member: GuildMember,
  executor: GuildMember,
  hardCheck: boolean = true,
  updateAll: boolean = false
): Promise<CheckResult> {
  const traductions = await getTraductions(member.guild);

  if (!member.guild) return [false, traductions.ERROR_COMMAND_NOT_IN_GUILDCHANNEL];
  if (!client.user) return [false, traductions.ERROR_SYNC_BOT];

  const botMember = await member.guild.members.fetch(client.user.id);

  if (!botMember.permissions.has('ManageRoles') && hardCheck) {
    return [false, traductions.ERROR_BOT_MISSING_PERMISSION];
  }

  if (botMember.roles.highest.position <= member.roles.highest.position && hardCheck) {
    return [
      false,
      traductions.ERROR_BOT_ROLE_TOO_LOW(member.displayName, member.roles.highest.name)
    ];
  }

  if (
    executor.roles.highest.position <= member.roles.highest.position &&
    member.id !== executor.id
  ) {
    return [
      false,
      traductions.ERROR_USER_ROLE_TOO_LOW(
        member.displayName,
        member.roles.highest.name,
        executor.roles.highest.name
      )
    ];
  }

  return [true, ""];
}
