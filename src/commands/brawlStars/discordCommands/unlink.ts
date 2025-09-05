import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import { getProfile, unlink } from '../../../database/player';
import { checkRoleConditions } from '../../../utils/checkPerms';

export async function handleUnlinkProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let user = interaction.options.getUser('membre', false);
    if(!user) user = interaction.member.user;
    const member = await interaction.guild.members.fetch(user.id);
    const [permission, errorString] = await checkRoleConditions(member, interaction.member, false)
    if(!permission) return interaction.editReply(errorString);
    const profile = await getProfile(user, interaction.guild);
    if(!profile) return interaction.editReply(`❌ Le compte discord de ${user.username} sur le serveur ${interaction.guild.name} n'est déjà lié à aucun compte Brawl Stars.`);
    await unlink(user, interaction.guild);
    return interaction.editReply(`✅ Le compte discord de ${user.username} sur le serveur ${interaction.guild.name} n'est plus lié à aucun compte Brawl Stars.`);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('unlink')
    .setDescription('Dissocie votre compte Brawl Stars de votre compte discord sur ce serveur.')
    .addUserOption(option => 
      option.setName('membre')
        .setDescription('Le membre duquel délier le profil Brawl Stars')
        .setRequired(false)
    )