import { ChatInputCommandInteraction, Guild, Message, Role } from 'discord.js';
import { setAutoRename, getAutoRename } from '../../../../database/autoRename';

export async function handleSetAutoRename(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
    const currentAutoRename = await getAutoRename(interaction.guild);
    const autoRename = interaction.options.getBoolean('rename', false) ?? !currentAutoRename;
    if(currentAutoRename == autoRename) {
        if(currentAutoRename) return interaction.editReply(`✅ Votre serveur renomme déjà automatiquement les membres du serveur lors de la mise à jour !`);
        if(!currentAutoRename) return interaction.editReply(`❌ Votre serveur ne renomme déjà pas les membres du serveur lors de la mise à jour !`);
    };
    await setAutoRename(interaction.guild, autoRename)
    if(autoRename) return interaction.editReply(`✅ Votre serveur renomme désormais automatiquement les membres du serveur lors de la mise à jour !`)
    else return interaction.editReply(`❌ Votre serveur ne renommera plus les membres du serveur lors de la mise à jour !`);
}