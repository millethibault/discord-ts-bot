import { ChatInputCommandInteraction, Guild, GuildMember, Message } from 'discord.js';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { setProfile } from '../../../../database/player';
import { clearTag } from '../../../../BrawlStarsInterfaces/Utils/tag';

export async function handleSetProfile(interaction: ChatInputCommandInteraction & { member: GuildMember, guild: Guild}): Promise<Message> {
    let playerTag = interaction.options.getString('tag', true);
    if(!playerTag) return interaction.editReply(`Veuillez entrer votre tag de joueur ❌`);
    playerTag = clearTag(playerTag);

    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        await setProfile(interaction.member.user.id, player, interaction.guild.id);
        return interaction.editReply(`Votre profil Brawl Stars ${player.name} (\`${player.tag}\`) a été lié à votre profil discord sur ${interaction.guild.name} ✅`);
    })
    .catch(err => {
        console.log(err);
        return interaction.editReply(`Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}