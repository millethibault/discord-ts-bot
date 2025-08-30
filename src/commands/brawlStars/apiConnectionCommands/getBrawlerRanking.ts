import { Message } from 'discord.js';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';

export function handleBrawlerRanking(message: Message<true>): Promise<Message<true>> {
    const args = message.content.split(/\s+/);
    const brawler = args[1];
    const countryCode = args[2];
    let limit = args[3] ? parseInt(args[3]) : 200;

    if(!brawler) return message.channel.send(`Veuillez entrer le nom d'un brawler ❌`);
    if(isNaN(limit)) return message.channel.send(`Veuillez entrer comme limite un nombre entier ❌`);

    return bsapi.getBrawlerRankings(brawler, countryCode, limit)
    .then(ranking => {
        console.log(JSON.stringify(ranking, null, 2))
        if(countryCode && ranking.length == 0) return message.channel.send(`Veuillez entrer un code pays valide ❌`);
        return message.channel.send(`Le classement a été loggé ! 😉 Le meilleur joueur de ${brawler.toLocaleLowerCase()} est ${ranking[0].name} avec ${ranking[0].trophies} 🏆`);
    })
    .catch(err => {
        console.log(err);
        return message.channel.send(`Une erreur est survenue lors de la récupération du classement ❌`);
    });
}