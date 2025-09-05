import { ChatInputCommandInteraction, Guild, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, GuildChannel } from 'discord.js';
import { setVerify, getVerify } from '../../../../database/verify';

export async function handleSetVerify(interaction: ChatInputCommandInteraction & { guild: Guild, channel: GuildChannel }): Promise<Message> {
  const currentVerify = await getVerify(interaction.guild);
  const verify = interaction.options.getBoolean('verify', false) ?? !currentVerify;

  if (currentVerify === verify) {
    if (currentVerify)
      return interaction.editReply(`✅ Les modérateurs vérifient déjà les membres lors de leur enregistrement !`);
    else
      return interaction.editReply(`❌ Les modérateurs ne vérifient déjà pas les membres lors de leur enregistrement !`);
  }

  if (verify) {
    await setVerify(interaction.guild, verify);
    return interaction.editReply(`✅ Les modérateurs vérifieront désormais les membres lors de leur enregistrement !`);
  }

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('confirm-disable')
      .setLabel('Valider')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('cancel-disable')
      .setLabel('Annuler')
      .setStyle(ButtonStyle.Secondary)
  );

  const reply = await interaction.editReply({
    content:
      `⚠️ Attention, les membres pourront s'enregistrer eux-mêmes et leurs rôles pourraient changer en conséquence.\n` +
      `Soyez sûrs qu'aucun rôle géré par le bot ne donne de permission trop importante avant de valider.`,
    components: [row],
  });

    try {
    const confirmation = await reply.awaitMessageComponent({
        componentType: ComponentType.Button,
        time: 15000,
        filter: (i) => i.user.id === interaction.user.id,
    });

    if (confirmation.customId === 'confirm-disable') {
        await confirmation.deferUpdate();
        await setVerify(interaction.guild, verify);
        return confirmation.editReply({
        content: `❌ Les modérateurs ne vérifieront désormais plus les membres lors de leur enregistrement.`,
        components: [],
        });
    } else {
        await confirmation.deferUpdate();
        return confirmation.editReply({
        content: `✅ Ok, on ne change rien finalement.`,
        components: [],
        });
    }
    } catch (error) {
        console.log(error)
    return interaction.editReply({
        content: '⏱️ Aucune modification effectuée. Les modérateurs vérifieront toujours les membres lors de leur enregistrement.',
        components: [],
    });
    }
}
