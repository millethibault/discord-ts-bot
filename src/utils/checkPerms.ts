import { CommandInteraction, Client, GuildMember, ChatInputCommandInteraction } from 'discord.js';
import { client } from '../bot/client';

type CheckResult = [boolean, string];

export async function checkRoleConditions(
  member: GuildMember,
  executor: GuildMember,
  hardCheck: boolean=true,
  updateAll: boolean=false
): Promise<CheckResult> {
  if (!member.guild) {
    return [false, "❌ Cette commande doit être utilisée dans un serveur."];
  }
  if(!client.user) return [false, "❌ Problème de synchronisation du bot"];

  // Récupère le bot en tant que membre du serveur
  const botMember = await member.guild.members.fetch(client.user!.id);
  if (!botMember.permissions.has('ManageRoles') && hardCheck) {
    return [false, "❌ Je n'ai pas la permission d'attribuer des rôles sur ce serveur !"];
  }

  // Vérifie la hiérarchie des rôles du bot vs. membre ciblé
  if (botMember.roles.highest.position <= member.roles.highest.position && !updateAll) {
    return [
      false,
      `❌ Je ne peux pas gérer ${member.displayName} car son rôle est trop élevé (${member.roles.highest.name}).`
    ];
  }

  // Vérifie la hiérarchie des rôles de l'utilisateur vs. membre ciblé (sauf si c'est lui-même)
  if (
    executor.roles.highest.position <= member.roles.highest.position &&
    member.id !== executor.id
  ) {
    return [
      false,
      `❌ Vous n'êtes pas autorisé à gérer ${member.displayName} car son rôle (${member.roles.highest.name}) est égal ou supérieur au vôtre (${executor.roles.highest.name}).`
    ];
  }

  return [true, ""];
}
