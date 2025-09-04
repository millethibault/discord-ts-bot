import { CommandInteraction, Client, GuildMember, ChatInputCommandInteraction } from 'discord.js';
import { client } from '../bot/client';

type CheckResult = [boolean, string];

export async function checkRoleConditions(
  interaction: ChatInputCommandInteraction,
  hardCheck: boolean=true
): Promise<CheckResult> {
  if (!interaction.guild) {
    return [false, "❌ Cette commande doit être utilisée dans un serveur."];
  }
  if(!client.user) return [false, "❌ Problème de synchronisation du bot"];

  // Récupère le bot en tant que membre du serveur
  const botMember = await interaction.guild.members.fetch(client.user!.id);
  if (!botMember.permissions.has('ManageRoles') && hardCheck) {
    return [false, "❌ Je n'ai pas la permission d'attribuer des rôles sur ce serveur !"];
  }

  // Récupère le membre ciblé (optionnel)
  const user = interaction.options.getUser('membre');
  let member: GuildMember;
  if (user) {
    member = await interaction.guild.members.fetch(user.id);
  } else {
    member = interaction.member as GuildMember;
  }

  // Vérifie la hiérarchie des rôles du bot vs. membre ciblé
  if (botMember.roles.highest.position <= member.roles.highest.position && hardCheck) {
    return [
      false,
      `❌ Je ne peux pas gérer ${member.displayName} car son rôle est trop élevé (${member.roles.highest.name}).`
    ];
  }

  // Vérifie la hiérarchie des rôles de l'utilisateur vs. membre ciblé (sauf si c'est lui-même)
  const executor = interaction.member as GuildMember;
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
