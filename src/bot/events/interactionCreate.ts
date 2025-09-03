import { AutocompleteInteraction, ChatInputCommandInteraction, Guild, GuildMember, REST, Routes, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, User } from 'discord.js';
import { config } from 'dotenv';
import { error } from 'console';
import { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, DEPLOY_COMMANDS } from '../../config/env';
import { client } from '../client';
import { handleAddClub } from '../../commands/brawlStars/discordCommands/set/addClub';
import { handleGetClubs } from '../../commands/brawlStars/discordCommands/get/getClubs';
import { handleRemoveClub, autocomplete as autocompleteRemoveClub } from '../../commands/brawlStars/discordCommands/remove/removeClub';
import { handleSetProfile } from '../../commands/brawlStars/discordCommands/set/setProfile';
import { handleGetProfile } from '../../commands/brawlStars/discordCommands/get/profile';
import { handleSetClubRole } from '../../commands/brawlStars/discordCommands/set/setClubRole';
import { handleGetClubRole } from '../../commands/brawlStars/discordCommands/get/getClubRole';
import { handleGetGradeRole } from '../../commands/brawlStars/discordCommands/get/getGradeRoles';
import { handleSetGradeRole } from '../../commands/brawlStars/discordCommands/set/setGradeRole';
import { handleSetTrophyRole } from '../../commands/brawlStars/discordCommands/set/setTrophyRole';
import { handleGetTrophyRole } from '../../commands/brawlStars/discordCommands/get/getTrophyRole';
import { handleUpdateMember, data as updateMemberData } from '../../commands/brawlStars/discordCommands/update/updateMember';
import { handleRemoveTrophyRole, autocomplete as autocompleteRemoveTrophyRole } from '../../commands/brawlStars/discordCommands/remove/removeTrophyRole';
import { handleSetAutoRename } from '../../commands/brawlStars/discordCommands/set/setAutoRename';
import { handleGetAutoRename } from '../../commands/brawlStars/discordCommands/get/getAutoRename';
import { handleAudit, data as auditData } from '../../commands/brawlStars/discordCommands/audit';
import { data as setData } from '../../commands/brawlStars/discordCommands/set';
import { data as getData } from '../../commands/brawlStars/discordCommands/get';
import { data as removeData } from '../../commands/brawlStars/discordCommands/remove';
import { handleRemoveGradeRole } from '../../commands/brawlStars/discordCommands/remove/removeGradeRole';

config();

const commands = [
    updateMemberData,
    auditData,
    setData,
    getData,
    removeData
].map(data => data.toJSON());
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    if(!CLIENT_ID) throw error;
    console.log('Déploiement des commandes...');
    if(DEPLOY_COMMANDS == 'global') {
        await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: [] }
        );
        await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands }
        );
        console.log('✅ Commandes déployées en global');
    }
    else if(DEPLOY_COMMANDS == 'local') {
        const existingCommands = await rest.get(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
        );
        await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands }
        );
        console.log('✅ Commandes déployées en local');
    }
    else console.log('❌ Comandes non déployées')
  } catch (error) {
    console.error('❌ Erreur de déploiement', error);
  }
})();

client.on('interactionCreate', async interaction => {
    
  if (interaction.isAutocomplete()) {
    const auto = interaction as AutocompleteInteraction;

    if (auto.commandName === 'removeclub') {
        if(!(interaction.guild instanceof Guild)) return;
        return autocompleteRemoveClub(auto as AutocompleteInteraction & { guild: Guild});
    }

    if (auto.commandName === 'removetrophyrole') {
        if(!(interaction.guild instanceof Guild)) return;
        return autocompleteRemoveTrophyRole(auto as AutocompleteInteraction & { guild: Guild});
    }
  }

  if (interaction.isChatInputCommand()) try {
    await interaction.deferReply()
    // Gérer la commande slash
    if(!(interaction.user instanceof User)) return interaction.editReply(`❌ Erreur lié à votre compte discord.`);
    if(!(interaction.member instanceof GuildMember)) return interaction.editReply(`❌ Erreur lié à votre compte discord sur ce serveur.`);
    if(!(interaction.guild instanceof Guild)) return interaction.editReply(`❌ Les commandes ne sont utilisables que dans les serveurs.`);

    const group = interaction.commandName;

    if (interaction.commandName === 'updateprofile') return handleUpdateMember(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember, user: User });
    if (interaction.commandName === 'audit') return handleAudit(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember });

    const sub = interaction.options.getSubcommand();

    if(group === 'set') {
        if (sub === 'profile') return handleSetProfile(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember });
        if (sub === 'clubrole') return handleSetClubRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'graderole') return handleSetGradeRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'trophyrole') return handleSetTrophyRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'autorename') return handleSetAutoRename(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'club') return handleAddClub(interaction as ChatInputCommandInteraction & { guild: Guild });
    }
    
    if(group === 'get') {
        if (sub === 'profile') return handleGetProfile(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember });
        if (sub === 'clubs') return handleGetClubs(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'clubroles') return handleGetClubRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'graderoles') return handleGetGradeRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'trophyroles') return handleGetTrophyRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'autorename') return handleGetAutoRename(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if(group === 'remove') {
        if (sub === 'graderole') return handleRemoveGradeRole(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'club') return handleRemoveClub(interaction as ChatInputCommandInteraction & { guild: Guild });
        if (sub === 'trophyrole') return handleRemoveTrophyRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }
  }
  catch {
    return interaction.editReply(`La commande n'a pas été trouvée`);
  }
});