import { Message } from 'discord.js';

export function handleHello(message: Message<true>) {
  message.channel.send(`Hello from ${message.guild?.name} 👋`);
}