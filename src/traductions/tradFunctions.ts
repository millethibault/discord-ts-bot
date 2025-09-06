import { Guild } from 'discord.js';
import { Traductions } from './type';
import { getLang } from '../database/lang';

export async function getTraductions(guild: Guild): Promise<Traductions> {
    const lang = await getLang(guild);
    const helpModulePath = `./${lang}.js`;
    const module = await import(helpModulePath) as { traductions: Traductions };
    const traductions = module.traductions;
    return traductions;
}