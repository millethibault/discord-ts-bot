import { Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { setProfile } from '../../../database/player';
import { clearTag } from '../../../BrawlStarsInterfaces/Utils/tag';

export async function handleSetProfile(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    let playerTag = args[1];
    if(!playerTag) return message.channel.send(`Veuillez entrer votre tag de joueur ❌`);
    playerTag = clearTag(args[1]);

    return bsapi.getPlayerData(playerTag)
    .then(async player => {
        await setProfile(message.author.id, player, message.guild.id);
        return message.channel.send(`Votre profil Brawl Stars ${player.name} (\`${player.tag}\`) a été lié à votre profil discord sur ${message.guild.name} ✅`);
    })
    .catch(err => {
        console.log(err);
        return message.channel.send(`Le tag de joueur \`${playerTag}\` n'a été trouvé sur Brawl Stars ❌`);
    });
}