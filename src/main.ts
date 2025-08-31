import { Logger } from './utils/logger';

/*
console.log = Logger.info;
console.warn = Logger.warn;
console.error = Logger.error;
*/

import { client } from './bot/client';
import './bot/events/ready';
import './bot/events/messageCreate';
import './bot/events/interactionCreate';
import { DISCORD_TOKEN } from './config/env';


client.login(DISCORD_TOKEN);