import { AutocompleteInteraction, ChatInputCommandInteraction, Guild, GuildMember, REST, Routes, User } from 'discord.js';
import { config } from 'dotenv';
import { error } from 'console';
import { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } from '../../config/env';
import { client } from '../client';
import { handleBrawlerRanking, data as setBrawlerRankingData } from '../../commands/brawlStars/apiConnectionCommands/getBrawlerRanking';
import { handleAddClub, data as addClubData } from '../../commands/brawlStars/discordCommands/addClub';
import { handleGetClubs, data as getClubsData } from '../../commands/brawlStars/discordCommands/getClubs';
import { handleRemoveClub, data as removeClubData, autocomplete as autocompleteRemoveClub } from '../../commands/brawlStars/discordCommands/removeClub';
import { handleSetProfile, data as setProfileData } from '../../commands/brawlStars/discordCommands/setProfile';
import { handleGetProfile, data as getProfileData } from '../../commands/brawlStars/discordCommands/profile';
import { handleSetClubRole, data as setClubRoleData } from '../../commands/brawlStars/discordCommands/setClubRole';
import { handleGetClubRole, data as getClubRoleData } from '../../commands/brawlStars/discordCommands/getClubRole';
import { handleGetGradeRole, data as getGradeRoleData } from '../../commands/brawlStars/discordCommands/getGradeRoles';
import { handleSetGradeRole, data as setGradeRoleData } from '../../commands/brawlStars/discordCommands/setGradeRole';
import { handleSetTrophyRole , data as setTrophyRoleData} from '../../commands/brawlStars/discordCommands/setTrophyRole';
import { handleGetTrophyRole, data as getTrophyRoleData } from '../../commands/brawlStars/discordCommands/getTrophyRole';
import { handleUpdateMember, data as updateMemberData } from '../../commands/brawlStars/discordCommands/updateMember';

config();

const commands = [
    setBrawlerRankingData, 
    addClubData, 
    getClubsData, 
    removeClubData, 
    setProfileData, 
    getProfileData, 
    setClubRoleData, 
    getClubRoleData,
    getGradeRoleData,
    setGradeRoleData,
    setTrophyRoleData,
    getTrophyRoleData,
    updateMemberData
].map(data => data.toJSON());
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    if(!CLIENT_ID) throw error;
    console.log('Déploiement des commandes...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('✅ Commande déployées');
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
  }

  if (interaction.isChatInputCommand()) {
    await interaction.deferReply()
    // Gérer la commande slash
    if(!(interaction.user instanceof User)) return interaction.editReply(`❌ Erreur lié à votre compte discord.`);
    if(!(interaction.member instanceof GuildMember)) return interaction.editReply(`❌ Erreur lié à votre compte discord sur ce serveur.`);
    if(!(interaction.guild instanceof Guild)) return interaction.editReply(`❌ Les commandes ne sont utilisables que dans les serveurs.`);

    if (interaction.commandName === 'getbrawlerranking') {
        return handleBrawlerRanking(interaction);
    }

    if (interaction.commandName == 'addclub') {
        return handleAddClub(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'getclubs') {
        return handleGetClubs(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'removeclub') {
        return handleRemoveClub(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'setprofile') {
        return handleSetProfile(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember });
    }

    if (interaction.commandName === 'profile') {
        return handleGetProfile(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember });
    }

    if (interaction.commandName === 'setclubrole') {
        return handleSetClubRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'getclubroles') {
        return handleGetClubRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'getgraderoles') {
        return handleGetGradeRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'setgraderole') {
        return handleSetGradeRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'settrophyrole') {
        return handleSetTrophyRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'gettrophyroles') {
        return handleGetTrophyRole(interaction as ChatInputCommandInteraction & { guild: Guild });
    }

    if (interaction.commandName === 'updateprofile') {
        return handleUpdateMember(interaction as ChatInputCommandInteraction & { guild: Guild, member: GuildMember, user: User });
    }

    return interaction.editReply(`La commande n'a pas été trouvée`);

  }

  // Tu peux ajouter d'autres types ici (boutons, menus, etc.)
});