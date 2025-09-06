import { Logger } from './utils/logger';

/*
console.log = Logger.info;
console.warn = Logger.warn;
console.error = Logger.error;
*/

import { client } from './bot/client';
import './bot/events/ready';
import './bot/events/interactionCreate';
require('dotenv').config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

client.login(DISCORD_TOKEN);