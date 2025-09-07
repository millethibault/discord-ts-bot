import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  Message,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
  StringSelectMenuInteraction,
  InteractionResponse
} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { getTraductions } from '../../traductions/tradFunctions';

const helpDir = join(__dirname, './help');
const files = readdirSync(helpDir).filter(file => file.endsWith('.js') && file !== 'data.js');

export async function handleHelpCommand(
  interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }
): Promise<Message> {
  const traductions = await getTraductions(interaction.guild);

  const options = files.map(file => {
    const { helpMeta } = require(`${helpDir}/${file}`);
    const meta = helpMeta(traductions); // ✅ injection de traductions
    return new StringSelectMenuOptionBuilder()
      .setLabel(meta.label)
      .setValue(meta.optionValue);
  });

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('help_menu')
    .setPlaceholder(traductions.HELP_CHOOSE_CATEGORY)
    .addOptions(options);

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

  return interaction.editReply({
    content: traductions.HELP_CHOOSE_CATEGORY_MESSAGE,
    components: [row]
  });
}

export async function changeHelpCommand(
  interaction: StringSelectMenuInteraction & { member: GuildMember; guild: Guild }
): Promise<InteractionResponse> {
  const traductions = await getTraductions(interaction.guild);
  const selected = interaction.values[0];
  const helpModulePath = './help/' + files.find(file => file === selected + `.js`);
  if (!helpModulePath) return interaction.reply(traductions.HELP_COMMAND_NOT_FOUND);

  const { helpEmbed } = await import(helpModulePath);
  const embed = helpEmbed(traductions); // ✅ injection de traductions

  return interaction.reply({
    embeds: [embed],
    flags: ["Ephemeral"]
  });
}
