import { GuildMember, Role, User } from "discord.js";
import { Traductions } from "./type";

export const traductions: Traductions = {
    ERROR_COMMAND_NOT_FOUND: `La commande n'a pas été trouvée`,
    ERROR_LINKED_TO_YOUR_DISCORD_ACCOUNT: `❌ Erreur lié à votre compte discord.`,
    ERROR_COMMAND_NOT_IN_GUILDCHANNEL: `❌ Les commandes ne sont utilisables que dans les salons de serveurs.sqdfqdsfqdf`,
    ABOUT_BOT: (botUser:User) => 
        `${botUser.username} est un bot discord de gestion de clubs Brawl Stars.\n` +
        `Il permet de mettre à jour automatiquement les membres du serveur en fonction de leur profil en jeu : trophées atteints, club, grade, pseudo.\n` +
        `N'hésitez pas à ajouter le bot à votre serveur : [PLACEHOLDER]`,
    ERROR_SYNC_BOT: `Erreur de synchronisation du bot`,
    AUDIT_DONE: (dbRolesLength: number, botMember:GuildMember) =>
        `Audit effectué.\n${botMember} gère \`${dbRolesLength}\` rôles.\n\n`,
    AUDIT_AUDITED_ROLES: (auditedDbRolesLength: number, botMember:GuildMember, roleList:string ) =>
    `✅ \`${auditedDbRolesLength}\` ${
      auditedDbRolesLength > 1
        ? `rôles gérés par ${botMember} sont conformes`
        : `rôle géré par ${botMember} est conforme`
    } : ${roleList}.\n\n`,
    AUDIT_NON_MANAGEABLE_ROLES: (
       nonManageableManagedRolesSize: number,
        botMember: GuildMember,
        botRole: Role,
        roleList: string
    ) =>
        `❌ \`${nonManageableManagedRolesSize}\` ${
        nonManageableManagedRolesSize > 1
            ? `rôles sont censés être gérés par ${botMember} mais ne le sont pas`
            : `rôle est censé être géré par ${botMember} mais ne l'est pas`
        } : ${roleList}.\nPensez à vérifier que ces rôles doivent être gérés par ${botMember} et à les placer en dessous du rôle ${botRole} dans les paramètres du serveur le cas échéant.\n\n`,

    AUDIT_DANGEROUS_ROLES: (
        nonAuditedDbRolesLength: number,
        botMember: GuildMember,
        roleList: string
    ) =>
        `⚠️ \`${nonAuditedDbRolesLength}\` ${
        nonAuditedDbRolesLength > 1
            ? `rôles gérés par ${botMember} sont non conformes car ils possèdent trop de permissions`
            : `rôle géré par ${botMember} est non conforme car il possède trop de permissions`
        } :\n- ${roleList}.\nPensez à auditer manuellement ces rôles qui peuvent poser des risques de sécurité ou de contournement.\n\n`,
    AUDIT_EXTREME_DANGER: "**‼️ ATTENTION : Certains de vos rôles donnent des permissions tandis que vos membres n'ont pas à être vérifiés par un modérateur pour les acquérir.\nExécutez immédiatement la commande \`/set verify\` !**",
    YOU_CAN_SEE_LOG: "Vous pouvez voir un log des acions du bot das les paramètres du serveur -> Logs du serveur (Audit log en anglais).",
    HELP_CHOOSE_CATEGORY: "Choisis une catégorie d'aide",
    HELP_CHOOSE_CATEGORY_MESSAGE: "📚 Voici le menu d'aide. Sélectionne une catégorie pour en savoir plus :",
    HELP_COMMAND_NOT_FOUND: `Commande d'aide non trouvée.`,
    ERROR_MISSING_TAG_OR_QR: "❌ Veuillez fournir un tag Brawl Stars ou bien un QR code !",
    ERROR_INVALID_QR_CODE: "❌ Le QR code fourni n’est pas valide ! Retrouvez-le en allant dans Amis → Mon QR sur Brawl Stars.",
    ERROR_NO_TAG_PROVIDED: "❌ Veuillez fournir un tag Brawl Stars.",
    ERROR_PLAYER_NOT_FOUND: (tag) => `❌ Le tag de joueur \`${tag}\` n’a pas été trouvé sur Brawl Stars.`,
    LOG_TITLE: "📜 Historique des rôles",
    LOG_EMPTY: "Aucun log trouvé.",
    LOG_ADDED: "+ Ajouté",
    LOG_REMOVED: "- Retiré",
    UNLINK_ALREADY_UNLINKED: (username, guildName) =>
        `❌ Le compte Discord de ${username} sur le serveur ${guildName} n'est lié à aucun compte Brawl Stars.`,
    UNLINK_SUCCESS: (username, guildName) =>
        `✅ Le compte Discord de ${username} sur le serveur ${guildName} n'est plus lié à aucun compte Brawl Stars.`,
    ERROR_BOT_MISSING_PERMISSION: "❌ Je n'ai pas la permission d'attribuer des rôles sur ce serveur !",
    ERROR_BOT_ROLE_TOO_LOW: (targetName, targetRole) =>
        `❌ Je ne peux pas gérer ${targetName} car son rôle est trop élevé (${targetRole}).`,
    ERROR_USER_ROLE_TOO_LOW: (targetName, targetRole, executorRole) =>
        `❌ Vous n'êtes pas autorisé à gérer ${targetName} car son rôle (${targetRole}) est égal ou supérieur au vôtre (${executorRole}).`,
    LINK_SUCCESS: (playerName, playerTag, username, guildName) =>
    `✅ Le profil Brawl Stars ${playerName} (\`${playerTag}\`) a été lié au profil Discord de ${username} sur ${guildName}.`,
    LINK_PENDING_MODERATOR: (playerName, playerTag) =>
        `🔍 Profil trouvé : ${playerName} (\`${playerTag}\`).\n⏳ Attendez qu’un modérateur valide la liaison.`,
    LINK_TIMEOUT: `⏱️ Temps écoulé. La liaison du profil n’a pas été validée.`,
    LINK_APPROVED: (playerName, playerTag, username, guildName) =>
        `✅ Le profil Brawl Stars ${playerName} (\`${playerTag}\`) a été lié au profil Discord de ${username} sur ${guildName}.`,
    LINK_REJECTED: `❌ La liaison du profil a été refusée par un modérateur.`,
    LINK_NO_VALIDATION: `⏰ Aucun modérateur n’a validé à temps.`,
    NO_TROPHY_ROLE: "⚠️ Aucun rôle de trophées n'a été créé sur ce serveur.",
    TROPHY_ROLE_UPDATED: (removed, added) =>
        `🏆 Trophées mis à jour : ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NO_GRADE_ROLE: "⚠️ Aucun rôle de grade n'a été créé sur ce serveur.",
    GRADE_ROLE_UPDATED: (removed, added) =>
        `🎖️ Grade mis à jour : ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NO_CLUB_ROLE: "⚠️ Aucun rôle de club n'a été créé sur ce serveur.",
    CLUB_ROLE_UPDATED: (removed, added) =>
        `👥 Club mis à jour : ${removed ? `${removed} ➡️ ` : ''}${added}`,
    NAME_UPDATED: (newName) => `✏️ Nom mis à jour : ${newName}`,
    UPDATE_CLUB_NO_MATCH: (clubInput, guildName) =>
        `❌ Aucun club n'est ${clubInput ? `enregistré` : `associé à \`${clubInput}\``} sur le serveur ${guildName}.`,
    UPDATE_CLUB_START: "✅ Mise à jour des clubs du serveur effectuée !\n\n",
    UPDATE_CLUB_NOT_FOUND: (clubName, clubTag) =>
        `❌ Je n'ai pas trouvé le club ${clubName} (\`${clubTag}\`) sur Brawl Stars !\n\n`,
    UPDATE_CLUB_MEMBERS_UPDATED: (emoji, countUpdated, clubName, countChecked, total) =>
        `${emoji} \`${countUpdated}\` membre${countUpdated > 1 ? 's' : ''} de ${clubName} mis à jour parmi les \`${countChecked}/${total}\` enregistrés sur votre serveur !\n\n`,
    UPDATE_CLUB_MEMBERS_ALREADY_UPDATED: (emoji, clubName, countChecked, total) =>
        `${emoji} Les \`${countChecked}/${total}\` membre${countChecked > 1 ? 's' : ''} du club ${clubName} enregistrés sur votre serveur étaient déjà tous à jour !\n\n`,
    UPDATE_CLUB_ROLE_REMOVED: (count, roleName) =>
        `\`${count}\` membre${count > 1 ? 's' : ''} ont perdu le rôle ${roleName}.\n`,
    UPDATE_MEMBER_START: "✅ Mise à jour du profil Discord effectuée\n",
    UPDATE_MEMBER_NO_PROFILE: (nickname) =>
        `❌ ${nickname} n'a pas encore enregistré son tag Brawl Stars.`,
    UPDATE_MEMBER_NOT_FOUND: (tag) =>
        `❌ Votre profil \`${tag}\` n'a pas été trouvé sur Brawl Stars.`,
    UPDATE_MEMBER_ALL_UP_TO_DATE: (nickname) =>
        `Tous les rôles de ${nickname} étaient déjà à jour.\n`,
    UPDATE_MEMBER_NICKNAME_CHANGED: (oldName, newName) =>
        `✏️ Pseudo sur le serveur : ${oldName} ➡️ ${newName}`,
    ADD_CLUB_NOT_FOUND: (clubTag) =>
        `❌ Le tag de club \`${clubTag}\` n'a pas été trouvé sur Brawl Stars.`,
    ADD_CLUB_SUCCESS: (clubName, clubTag, guildName) =>
        `✅ Le club ${clubName} (\`${clubTag}\`) a été ajouté au serveur ${guildName}.`,
    AUTO_RENAME_ALREADY_ENABLED: "✅ Votre serveur renomme déjà automatiquement les membres du serveur lors de la mise à jour !",
    AUTO_RENAME_ALREADY_DISABLED: "❌ Votre serveur ne renomme déjà pas les membres du serveur lors de la mise à jour !",
    AUTO_RENAME_ENABLED: "✅ Votre serveur renomme désormais automatiquement les membres du serveur lors de la mise à jour !",
    AUTO_RENAME_DISABLED: "❌ Votre serveur ne renommera plus les membres du serveur lors de la mise à jour !",
    SET_CLUB_ROLE_INVALID_ROLE: "❌ Veuillez mentionner un rôle valide.",
    SET_CLUB_ROLE_MISSING_TAG: "❌ Veuillez entrer le tag de club.",
    SET_CLUB_ROLE_NOT_FOUND: (clubTag) =>
        `❌ Le tag de club \`${clubTag}\` n'a pas été trouvé sur Brawl Stars.`,
    SET_CLUB_ROLE_SUCCESS: (clubName, roleName) =>
        `✅ Le club ${clubName} a été associé au rôle ${roleName}.`,
    SET_GRADE_ROLE_INVALID_ROLE: "❌ Veuillez mentionner un rôle valide.",
    SET_GRADE_ROLE_INVALID_GRADE: "❌ Veuillez mentionner un grade valide.",
    SET_GRADE_ROLE_SUCCESS: (gradeLabel, roleName) =>
        `✅ Le grade ${gradeLabel} a été associé au rôle ${roleName}.`,
    SET_TROPHY_ROLE_INVALID_ROLE: "❌ Veuillez mentionner un rôle valide.",
    SET_TROPHY_ROLE_INVALID_TROPHIES: "❌ Veuillez préciser un nombre de trophées valide (0 < trophées < 1 000 000).",
    SET_TROPHY_ROLE_SUCCESS: (roleName, trophies) =>
        `✅ Le rôle ${roleName} sera attribué aux joueurs dépassant les ${trophies.toLocaleString()} 🏆`,
    VERIFY_ALREADY_ENABLED: "✅ Les modérateurs vérifient déjà les membres lors de leur enregistrement !",
    VERIFY_ALREADY_DISABLED: "❌ Les modérateurs ne vérifient déjà pas les membres lors de leur enregistrement !",
    VERIFY_ENABLED: "✅ Les modérateurs vérifieront désormais les membres lors de leur enregistrement !",
    VERIFY_DISABLE_WARNING:
        "⚠️ Attention, les membres pourront s'enregistrer eux-mêmes et leurs rôles pourraient changer en conséquence.\n" +
        "Soyez sûrs qu'aucun rôle géré par le bot ne donne de permission trop importante avant de valider.",
    VERIFY_DISABLED: "❌ Les modérateurs ne vérifieront désormais plus les membres lors de leur enregistrement.",
    VERIFY_CANCELLED: "✅ Ok, on ne change rien finalement.",
    VERIFY_TIMEOUT: "⏱️ Aucune modification effectuée. Les modérateurs vérifieront toujours les membres lors de leur enregistrement.",
    REMOVE_CLUB_MISSING_TAG: "❌ Veuillez entrer le tag d'un club.",
    REMOVE_CLUB_NOT_FOUND: (clubTag, guildName) =>
        `❌ Le tag \`${clubTag}\` n'a pas été trouvé dans la liste des clubs du serveur ${guildName}.`,
    REMOVE_CLUB_SUCCESS: (clubName, clubTag, guildName) =>
        `✅ Le club ${clubName} (\`${clubTag}\`) a été supprimé du serveur ${guildName}.`,
    REMOVE_GRADE_ROLE_INVALID_GRADE: "❌ Veuillez mentionner un grade valide.",
    REMOVE_GRADE_ROLE_ALREADY_REMOVED: (gradeLabel) =>
        `❌ Le grade ${gradeLabel} n'était déjà attribué à aucun rôle !`,
    REMOVE_GRADE_ROLE_SUCCESS: (gradeLabel) =>
        `✅ Le grade ${gradeLabel} n'est désormais plus lié à aucun rôle !`,
    REMOVE_TROPHY_ROLE_NOT_FOUND: (roleId, guildName) =>
        `❌ Le palier ${roleId} n'a pas été trouvé dans la liste des rôles paliers du serveur ${guildName}.`,
    REMOVE_TROPHY_ROLE_SUCCESS: (trophies, roleId, guildName) =>
        `✅ Le palier ${trophies}🏆 - <@&${roleId}> a été supprimé du serveur ${guildName}.`,
    GET_AUTO_RENAME_ENABLED: "✅ Votre serveur renomme les membres du serveur lors de la mise à jour !",
    GET_AUTO_RENAME_DISABLED: "❌ Votre serveur ne renomme pas les membres du serveur lors de la mise à jour !",
    GET_CLUB_ROLE_EMPTY: (guildName) =>
        `❌ Le serveur ${guildName} n'a pas encore associé de club à un rôle.`,
    GET_CLUB_ROLE_LIST: (guildName, count, list) =>
        `✅ Le serveur ${guildName} a ${count} club${count > 1 ? 's' : ''} associé${count > 1 ? 's' : ''} à des rôles :\n${list}`,
    GET_CLUBS_EMPTY: (guildName) =>
        `❌ Le serveur ${guildName} n'a pas enregistré de club.`,
    GET_CLUBS_LIST: (guildName, count, list) =>
        `✅ Le serveur ${guildName} a ${count} club${count > 1 ? 's' : ''} enregistré${count > 1 ? 's' : ''} :\n${list}`,
    GET_GRADE_ROLE_EMPTY: (guildName) =>
        `❌ Le serveur ${guildName} n'a pas encore associé de poste à un rôle.`,
    GET_GRADE_ROLE_LIST: (guildName, president, vicePresident, senior, member) =>
        `✅ Le serveur ${guildName} a associé les grades suivants à des rôles :\n` +
        `Président : ${president}\n` +
        `Vice-Président : ${vicePresident}\n` +
        `Sénior : ${senior}\n` +
        `Membre : ${member}`,
    GET_TROPHY_ROLE_NOT_IN_GUILD: "❌ Les commandes ne sont utilisables que dans les serveurs.",
    GET_TROPHY_ROLE_EMPTY: (guildName) =>
        `❌ Le serveur ${guildName} n'a pas encore associé de nombre de trophées à un rôle.`,
    GET_TROPHY_ROLE_LIST: (guildName, list) =>
        `🏆 Le serveur ${guildName} a associé les grades suivants à des paliers de trophées :\n${list}`,
    GET_VERIFY_ENABLED: "✅ Les modérateurs vérifient les membres lors de leur enregistrement !",
    GET_VERIFY_DISABLED: "❌ Les modérateurs ne vérifient pas les membres lors de leur enregistrement !",
    GET_PROFILE_MEMBER_NOT_FOUND: "❌ Membre introuvable.",
    GET_PROFILE_NO_TAG: (nickname) => `❌ ${nickname} n'a pas encore enregistré son tag Brawl Stars.`,
    GET_PROFILE_NOT_FOUND: (tag) => `❌ Le tag de joueur \`${tag}\` n'a pas été trouvé sur Brawl Stars.`,
    GET_PROFILE_HEADER: (username, guildName, playerName, playerTag) =>
        `Le profil Brawl Stars lié à ${username} sur ${guildName} est ${playerName} (\`${playerTag}\`).\n`,
    GET_PROFILE_TROPHIES_LINE: (trophies, status, role, removed) =>
        `${trophies}🏆 → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_CLUB_LINE: (clubName, clubTag, status, role, removed) =>
        `Club : ${clubName} (\`#${clubTag}\`) → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_GRADE_LINE: (grade, status, role, removed) =>
        `Grade : ${grade} → ${status} ${role ?? traductions.LABEL_NO_ROLE} ${removed}`,
    GET_PROFILE_REMINDER_UPDATE: "Pensez à mettre vos rôles à jour 😉.",
    GET_PROFILE_REMINDER_UP_TO_DATE: (nicknameStatus) =>
        `Votre profil est à jour${nicknameStatus ? "" : " (sauf le pseudo)"} 😉.`,
    LABEL_NONE: "Aucun",
    LABEL_NO_ROLE: "Aucun rôle",
    LABEL_PROFILE_OF: (playerName) => `📋 Profil de ${playerName}`,
    LABEL_TROPHIES: "🏆 Trophées",
    LABEL_CLUB: "👥 Club",
    LABEL_GRADE: "🎖️ Grade",
    HELP_FIELD_COMMAND: "Commande",
    HELP_FIELD_USAGE: "Utilisation",
    HELP_CLUBS_DESCRIPTION: "Associez vos clubs Brawl Stars à votre serveur Discord.",
    HELP_CLUBS_SET_CLUB: "Lie un club Brawl Stars à votre serveur Discord.",
    HELP_CLUBS_SET_CLUBROLE: "Associe un club Brawl Stars à un rôle sur votre serveur Discord.",
    HELP_CLUBS_GET_CLUBS: "Renvoie la liste des clubs Brawl Stars liés au serveur Discord.",
    HELP_CLUBS_GET_CLUBROLES: "Renvoie la liste des clubs Brawl Stars associés à un rôle sur le serveur.",
    HELP_CLUBS_REMOVE_CLUB: "Dissocie un club Brawl Stars du serveur et du rôle qui lui était associé.",
    HELP_CLUBS_USAGE: "Les membres Discord reliés à leur compte BS ont leur rôle de club mis à jour automatiquement.",
    HELP_AUDIT_DESCRIPTION: "Assurez la sécurité de votre serveur Discord.",
    HELP_AUDIT_AUDIT: "Fournit un audit des autorisations du bot pour éviter les abus de rôle.",
    HELP_AUDIT_LOGS: "Affiche l'historique des changements de rôles effectués par le bot.",
    HELP_CONFIG_DESCRIPTION: "Changez les paramètres du bot.",
    HELP_CONFIG_SET_VERIFY: "Active/désactive la vérification obligatoire par les modérateurs avant l'enregistrement d'un membre.",
    HELP_CONFIG_GET_VERIFY: "Renvoie si la vérification est activée ou non.",
    HELP_CONFIG_SET_AUTORENAME: "Active/désactive le renommage automatique des membres sur le serveur.",
    HELP_CONFIG_GET_AUTORENAME: "Renvoie si le renommage automatique est activé ou non.",
    HELP_CATEGORY_CLUBS: "🧩 Clubs",
    HELP_CATEGORY_AUDIT: "📋 Audit",
    HELP_CATEGORY_CONFIG: "⚙️ Configuration",
    HELP_CATEGORY_GRADES: "🎖️ Grades",
    HELP_CATEGORY_PROFILE: "🔗 Profil",
    HELP_CATEGORY_TROPHIES: "🏆 Trophées",
    HELP_CATEGORY_UPDATE: "🔄 Mise à jour",
    HELP_GRADES_DESCRIPTION: "Donnez aux gradés de vos clubs un rôle sur votre serveur Discord.",
    HELP_GRADES_SET_GRADEROLE: "Associe un grade Brawl Stars à un rôle.",
    HELP_GRADES_GET_GRADEROLES: "Renvoie la liste des grades Brawl Stars associés à un rôle.",
    HELP_GRADES_REMOVE_GRADEROLE: "Dissocie un grade Brawl Stars de son rôle.",
    HELP_GRADES_USAGE: "Les membres Discord reliés à leur compte BS ont leur grade mis à jour automatiquement lorsqu'ils font partie de vos clans. Il est conseillé de ne pas donner trop de permissions à ces rôles, ou bien d'activer la vérification avec `/verify`.",
    HELP_PROFILE_DESCRIPTION: "Associez votre compte Discord à votre profil Brawl Stars.",
    HELP_PROFILE_LINK: "Lie un compte BS à votre compte Discord.",
    HELP_PROFILE_UNLINK: "Délie ton compte BS de Discord.",
    HELP_PROFILE_GET_PROFILE: "Renvoie les informations de joueur d'un membre du serveur.",
    HELP_PROFILE_USAGE: "Les membres Discord reliés à leur compte BS ont leurs rôles mis à jour automatiquement.",
    HELP_TROPHIES_DESCRIPTION: "Associez des paliers de trophées à des rôles.",
    HELP_TROPHIES_SET_TROPHYROLE: "Associe un palier de trophées à un rôle.",
    HELP_TROPHIES_GET_TROPHYROLES: "Renvoie la liste des paliers de trophées associés à un rôle.",
    HELP_TROPHIES_REMOVE_TROPHYROLE: "Dissocie un palier de trophées de son rôle.",
    HELP_TROPHIES_USAGE: "Les membres Discord reliés à leur compte BS ont leur rôle de trophées mis à jour automatiquement.",
    HELP_UPDATE_DESCRIPTION: "Mettez vos membres à jour automatiquement.",
    HELP_UPDATE_UPDATE: "Met à jour les rôles d'un membre du serveur selon son profil Brawl Stars.",
    HELP_UPDATE_UPDATE_CLUB: "Met à jour les rôles de tous les membres d'un club Brawl Stars.",
    LANG_ALREADY:`La langue est déjà en Français 🇫🇷 !`, 
    LANG_CHANGED: (from:string) => `La langue a été changée du ${traductions.LANG_NAME_WITH_EMOJI(from)} au Français 🇫🇷.` ,
    LANG_NAME_WITH_EMOJI: (lang:string) => {
        if(lang == 'en') return `Anglais 🇬🇧`;
        if(lang == 'fr') return `Français 🇫🇷`;
        return `Inconnu 🏳️`
    },
    GET_LANG: `La langue est en Français 🇫🇷 !`
}