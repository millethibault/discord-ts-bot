import { ChatInputCommandInteraction, Guild, GuildMember, Message, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, StringSelectMenuInteraction, InteractionResponse } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
const helpDir = join(__dirname, './help');
const files = readdirSync(helpDir).filter(file => file.endsWith('.js') && file !== 'data.js');
const options = files.map(file => {
  const { helpMeta } = require(`${helpDir}/${file}`);
  return new StringSelectMenuOptionBuilder()
    .setLabel(helpMeta.label)
    .setValue(helpMeta.optionValue);
});
export async function handleHelpCommand(interaction: ChatInputCommandInteraction & { member: GuildMember; guild: Guild }): Promise<Message> {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('help_menu')
    .setPlaceholder('Choisis une catégorie d\'aide')
    .addOptions(options);

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
  return interaction.editReply({
    content: '📚 Voici le menu d\'aide. Sélectionne une catégorie pour en savoir plus :',
    components: [row]
  });
}

export async function changeHelpCommand(interaction: StringSelectMenuInteraction & { member: GuildMember; guild: Guild }): Promise<InteractionResponse> {
    const selected = interaction.values[0];
    const helpModulePath = './help/' + files.find(file => file === selected + `.js`);
    if(!helpModulePath) return interaction.reply(`Commande d'aide non trouvée.`);
    const { helpEmbed } = await import(helpModulePath);

    return interaction.reply({
        embeds: [helpEmbed],
        flags: ["Ephemeral"]
    });
}