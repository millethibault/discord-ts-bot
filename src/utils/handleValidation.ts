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
  GuildChannel,
} from 'discord.js';
import { getVerify } from '../database/verify';
import { link } from '../database/player';
import { Player } from '../interfaces/brawlStarsInterfaces/player';
import { getTraductions } from '../traductions/tradFunctions';

export async function handleLink(
  interaction: ChatInputCommandInteraction & {
    guild: Guild;
    member: GuildMember;
    channel: GuildChannel;
  },
  user: User,
  player: Player
) {
  const traductions = await getTraductions(interaction.guild);
  const verify = await getVerify(interaction.guild);

  if (!verify || interaction.member.permissions.has('ManageRoles')) {
    await link(user, player, interaction.guild);
    return interaction.editReply(
      traductions.LINK_SUCCESS(player.name, player.tag, user.displayName, interaction.guild.name)
    );
  }

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
    content: traductions.LINK_PENDING_MODERATOR(player.name, player.tag),
    components: [row],
  });

  try {
    const confirmation = await interaction.channel.awaitMessageComponent({
      componentType: ComponentType.Button,
      time: 24 * 3600 * 1000,
      filter: (i) =>
        i.user.id !== interaction.user.id &&
        i.memberPermissions?.has(PermissionFlagsBits.ManageRoles),
    });

    await confirmation.deferUpdate();

    if (confirmation.customId === 'approve-link') {
      await link(user, player, interaction.guild);
      return confirmation.editReply({
        content: traductions.LINK_APPROVED(player.name, player.tag, user.displayName, interaction.guild.name),
        components: [],
      });
    } else {
      return confirmation.editReply({
        content: traductions.LINK_REJECTED,
        components: [],
      });
    }
  } catch (error) {
    return interaction.editReply({
      content: traductions.LINK_NO_VALIDATION,
      components: [],
    });
  }
}
