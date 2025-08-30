import { Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { getProfile } from '../../../database/player';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleGetProfile(message: Message<true>): Promise<Message<true>> {
    const playerRow = await getProfile(message.author.id, message.guild.id);
    if(!playerRow) return message.channel.send(`Vous n'avez pas encore enregistré votre tag Brawl Stars ❌`);
    const playerTag = playerRow.playerTag;
    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        return message.channel.send(`Votre profil lié à votre compte sur ${message.guild.name} est ${player.name} (\`${player.tag}\`).\n Bien joué pour vos ${player.trophies}🏆`);
    })
    .catch(err => {
        console.log(err);
        return message.channel.send(`Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}