import { Message, Role } from 'discord.js';
import { setMember, setPresident, setSenior, setVicePresident } from '../../../database/gradeRole';

export async function handleSetGradeRole(message: Message<true>): Promise<Message<true>> {
    const args = message.content.toLowerCase().split(/\s+/);
    if(args.join(' ').includes('vice pr')) return handleSetVicePresident(message);
    if(args.find(arg => arg.includes('pre') || arg.includes('pré'))) return handleSetPresident(message);
    if(args.find(arg => ['senior', 'sénior', 'ainé', 'elder', 'aîné'].includes(arg))) return handleSetSenior(message);
    if(args.find(arg => arg.includes('mem'))) return handleSetMember(message);
    return message.channel.send(`Veuillez préciser un grade parmi \`President\`, \`Vice President\`, \`Senior\`, \`Membre\``);

}

export async function handleSetPresident(message: Message<true>): Promise<Message<true>> {
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`Veuillez mentionner le rôle à attribuer aux présidents de vos clubs ❌`);
    await setPresident(message.guild, roleMention);
    return message.channel.send(`Le grade Président a été associé au rôle ${roleMention.name} ✅`);
}

export async function handleSetVicePresident(message: Message<true>): Promise<Message<true>> {
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`Veuillez mentionner le rôle à attribuer aux vice-présidents de vos clubs ❌`);
    await setVicePresident(message.guild, roleMention);
    return message.channel.send(`Le grade Vice-Président a été associé au rôle ${roleMention.name} ✅`);
}

export async function handleSetSenior(message: Message<true>): Promise<Message<true>> {
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`Veuillez mentionner le rôle à attribuer aux séniors de vos clubs ❌`);
    await setSenior(message.guild, roleMention);
    return message.channel.send(`Le grade Sénior a été associé au rôle ${roleMention.name} ✅`);
}

export async function handleSetMember(message: Message<true>): Promise<Message<true>> {
    const roleMention = message.mentions.roles.first();
    if (!roleMention) return message.channel.send(`Veuillez mentionner le rôle à attribuer aux membres de vos clubs ❌`);
    await setMember(message.guild, roleMention);
    return message.channel.send(`Le grade Membre a été associé au rôle ${roleMention.name} ✅`);
}