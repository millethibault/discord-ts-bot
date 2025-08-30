import { Message, Role } from 'discord.js';
import { setTrophyRole } from '../../../database/trophyRole';

export async function handleSetTrophyRole(message: Message<true>): Promise<Message<true>> {
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`❌ Veuillez mentionner le rôle à attribuer aux présidents de vos clubs.`);
    const args = message.content.toLowerCase().split(/\s+/);
    const joined = args.join(' ');
    const cleaned = joined.replace(/<@!?&?\d+>/g, '');

    // nombre suivi de "k" -> *1000
    const match = cleaned.match(/(\d[\d\s]*)(?:\s*k)?/);

    let trophies = NaN;
    if (match) {
        const raw = match[1].replace(/\s+/g, ''); // "20 000" → "20000"
        trophies = parseInt(raw);

        const kMatch = cleaned.match(new RegExp(`${match[1]}\\s*k`));
        if (kMatch) {
            trophies *= 1000;
        }
    }
    if(isNaN(trophies)) return message.channel.send(`❌ Veuillez préciser le nombre de trophées nécessaires à l'obtention de ce rôle.`);
    if(trophies < 0 || trophies > 1000000) return message.channel.send(`❌ Veuillez préciser un nombre de trophées valide (0 < trophées < 1 000 000).`);
    await setTrophyRole(message.guild, roleMention, trophies);
    return message.channel.send(`Le rôle ${roleMention} sera attribué aux joueurs dépassant les ${trophies.toLocaleString()} 🏆`);
}