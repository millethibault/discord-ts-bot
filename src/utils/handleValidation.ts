import {
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
  PermissionFlagsBits,
  Guild,
  User,
  GuildMember,
} from 'discord.js';
import { getVerify } from '../database/verify';
import { setProfile } from '../database/player';
import { Player } from '../interfaces/brawlStarsInterfaces/player';

export async function handleLink(interaction: ChatInputCommandInteraction & {guild: Guild, member: GuildMember}, user: User, player: Player) {
  const verify = await getVerify(interaction.guild);

  if (!verify || interaction.member.permissions.has('ManageRoles')) {
    await setProfile(user.id, player, interaction.guild.id);
    return interaction.editReply(
      `Le profil Brawl Stars ${player.name} (\`${player.tag}\`) a été lié au profil Discord de ${user.displayName} sur ${interaction.guild.name} ✅`
    );
  }

  // ⚠️ Vérification requise par un modérateur
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('approve-link')
      .setLabel('Valider')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('reject-link')
      .setLabel('Refuser')
      .setStyle(ButtonStyle.Danger)
  );

  await interaction.editReply({
    content: `🔍 Profil trouvé : ${player.name} (\`${player.tag}\`).\n⏳ Attendez qu’un modérateur valide la liaison.`,
    components: [row],
  });

  try {
    const confirmation = await interaction.channel?.awaitMessageComponent({
      componentType: ComponentType.Button,
      time: 24 * 3600 * 1000, // 24h
      filter: (i) =>
        i.user.id !== interaction.user.id &&
        i.memberPermissions?.has(PermissionFlagsBits.ManageRoles),
    });

    if (!confirmation) {
      return interaction.editReply({
        content: `⏱️ Temps écoulé. La liaison du profil n’a pas été validée.`,
        components: [],
      });
    }

    await confirmation.deferUpdate();

    if (confirmation.customId === 'approve-link') {
      await setProfile(user.id, player, interaction.guild.id);
      return confirmation.editReply({
        content: `✅ Le profil Brawl Stars ${player.name} (\`${player.tag}\`) a été lié au profil Discord de ${user.displayName} sur ${interaction.guild.name}.`,
        components: [],
      });
    } else {
      return confirmation.editReply({
        content: `❌ La liaison du profil a été refusée par un modérateur.`,
        components: [],
      });
    }
  } catch (error) {
    return interaction.editReply({
      content: `⏰ Aucun modérateur n’a validé à temps.`,
      components: [],
    });
  }
}
