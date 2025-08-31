import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { getProfile } from '../../../database/player';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleGetProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let playerTag = interaction.options.getString('tag', false);
    if(!playerTag) {
        const playerRow = await getProfile(interaction.member.user, interaction.guild);
        if(!playerRow) return interaction.editReply(`Vous n'avez pas encore enregistré votre tag Brawl Stars ❌`);
        playerTag = playerRow.playerTag;
    }
    if(!playerTag) return interaction.editReply(`Veuillez indiquer le tag d'un joueur Brawl Stars ❌`);
    
    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        return interaction.editReply(`Votre profil lié à votre compte sur ${interaction.guild.name} est ${player.name} (\`${player.tag}\`).\n Bien joué pour vos ${player.trophies}🏆`);
    })
    .catch(err => {
        console.log(err);
        return interaction.editReply(`Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}
import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('profile')
  .setDescription('Affiche votre profile Brawl Stars ou celui de quelqu\'un d\'autre.')
  .addStringOption(option => 
    option.setName('tag')
    .setDescription('Le tag du joueur Brawl Stars')
    .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);