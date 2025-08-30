import { Message } from 'discord.js';
import { setPrefix } from '../database/prefix';

export async function handleSetPrefix(message: Message<true>) {
  const args = message.content.split(' ');
  const newPrefix = args[1];
  if (!newPrefix) return;

  await setPrefix(message.guild!.id, newPrefix);
  message.channel.send(`✅ Préfixe mis à jour : \`${newPrefix}\``);
}
