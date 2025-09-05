import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('Associe votre compte Brawl Stars à votre compte discord sur ce serveur.')
    .addAttachmentOption(option => 
      option.setName('qrcode')
      .setDescription('Un screen du QR code de votre profil disponible dans Amis -> Mon QR')
      .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Le tag de joueur, retrouvable sur votre profil Brawl Stars (inutile si QR Code)')
        .setRequired(false)
    )
    .addUserOption(option => 
      option.setName('membre')
        .setDescription('Le membre auquel lier le profil Brawl Stars')
        .setRequired(false)
    )