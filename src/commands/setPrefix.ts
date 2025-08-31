import { Message } from 'discord.js';
import { setPrefix } from '../database/prefix';

export async function handleSetPrefix(message: Message<true>) {
  const args = message.content.split(/\s+/);
  const newPrefix = args[1];
  if (!newPrefix) return;

  await setPrefix(message.guild!.id, newPrefix);
  message.channel.send(`✅ Préfixe mis à jour : \`${newPrefix}\``);
}

import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('setprefix')
  .setDescription('Définit un nouveau préfixe pour le serveur')
  .addStringOption(option =>
    option.setName('prefix')
      .setDescription('Le nouveau préfixe')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator); // optionnel