import { ChatInputCommandInteraction, Guild, Message } from 'discord.js';
import { getVerify } from '../../../../database/verify';

export async function handleGetVerify(interaction: ChatInputCommandInteraction & { guild: Guild}): Promise<Message> {
    const verify = await getVerify(interaction.guild);
    if(verify) return interaction.editReply(`✅ Les modérateurs vérifient les membres lors de leur enregistrement !`)
    else return interaction.editReply(`❌ Les modérateurs ne vérifient pas les membres lors de leur enregistrement!`);   
}