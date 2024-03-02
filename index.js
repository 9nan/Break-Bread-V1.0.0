const {
  Client
  , Intents
  , MessageAttachment
  , MessageEmbed
  , MessageActionRow
  , ApplicationCommandOptionTypes
  , MessageButton
  , Permissions
  , MessageSelectMenu
} = require('discord.js');
//-------------------------------------------------------------------------------------------------------------------//
const moment = require('moment');
//-------------------------------------------------------------------------------------------------------------------//
const fs = require('fs');
//-------------------------------------------------------------------------------------------------------------------//
const path = require('path');
//-------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------//
const welcomeDataPath = './src/welcome/welcome.json';
//-------------------------------------------------------------------------------------------------------------------//
const logConfigPath = './src/logs/logconfig.json';
//-------------------------------------------------------------------------------------------------------------------//
require('dotenv').config();

//-------------------------------------------------------------------------------------------------------------------//
const {createCanvas} = require('canvas');
//-------------------------------------------------------------------------------------------------------------------//
const allowedUserId = ''; //admin userid here
//-------------------------------------------------------------------------------------------------------------------//
const dareData = require('./src/dare/dare.json');
//-------------------------------------------------------------------------------------------------------------------//
const axios = require('axios');
//-------------------------------------------------------------------------------------------------------------------//
const client = new Client({
  intents: [
      Intents.FLAGS.GUILDS
      , Intents.FLAGS.GUILD_MEMBERS
      , Intents.FLAGS.GUILD_BANS
      , Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
      , Intents.FLAGS.GUILD_INTEGRATIONS
      , Intents.FLAGS.GUILD_WEBHOOKS
      , Intents.FLAGS.GUILD_INVITES
      , Intents.FLAGS.GUILD_VOICE_STATES
      , Intents.FLAGS.GUILD_PRESENCES
      , Intents.FLAGS.GUILD_MESSAGES
      , Intents.FLAGS.GUILD_MESSAGE_REACTIONS
      , Intents.FLAGS.GUILD_MESSAGE_TYPING
      , Intents.FLAGS.DIRECT_MESSAGES
      , Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
      , Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});
//-------------------------------------------------------------------------------------------------------------------//
client.setMaxListeners(100);

function truncateString(str, maxLength = 1024) {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + "..." : str;
}


//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName, user, options } = interaction;
  
    if (commandName === 'hex') {
        let color = options.getString('hex');
        color = color.startsWith('#') ? color : '#' + color;
        const canvas = createCanvas(200, 200);
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'color.png');
        await interaction.reply({
            content: `Color: ${color}`,
            files: [attachment]
        });
    }
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options, member, guild, channel } = interaction;
  
    if (commandName === 'kickmember') {
      if (!member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply('You need to be an administrator to use this command.');
      }
  
      const memberToKick = options.getMember('member');
  
      if (memberToKick) {
        try {
          await memberToKick.kick();
  
          const kickEmbed = new MessageEmbed()
            .setTitle('Member Kicked')
            .setColor('#ffb6c1')
            .addFields({ name: 'Kicked Member', value: memberToKick.user.tag })

  
          await channel.send({ embeds: [kickEmbed] });
          await interaction.reply(`${memberToKick.user.tag} has been kicked from the server.`);
        } catch (error) {
          await interaction.reply('He is admin Man !.');
        }
      } else {
        await interaction.reply('Please mention a valid member to kick.');
      }
    }
  
    if (commandName === 'ban') {
      if (!member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply('You need to be an administrator to use this command.');
      }
  
      const memberToBan = options.getMember('member');
  
      if (memberToBan) {
        try {
          await memberToBan.ban();
  
          const banEmbed = new MessageEmbed()
            .setTitle('Member Banned')
            .setColor('#ffb6c1')
            .addFields({ name: 'Banned Member', value: memberToBan.user.tag })

  
          await channel.send({ embeds: [banEmbed] });
          await interaction.reply(`${memberToBan.user.tag} has been banned from the server.`);
        } catch (error) {
          await interaction.reply('He is admin Man !.');
        }
      } else {
        await interaction.reply('Please mention a valid member to ban.');
      }
    }
  });
  //-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const { commandName, options, user } = interaction;
  
    if (commandName === 'inviterecive' && user.id === allowedUserId) {
      const serverId = options.getString('ogno');
      const server = client.guilds.cache.get(serverId);
  
      if (server) {
        try {
          const invite = await server.channels.cache.random().createInvite({ maxUses: 1, unique: true });
          interaction.reply(`The bot is in the server '${server.name}' (${serverId}). Here's the invite link: ${invite.url}`);
        } catch (error) {
          interaction.reply('Error creating invite.');
        }
      } else {
        interaction.reply('The bot is not in the specified server.');
      }
    } else if (commandName === 'dare') {
      const randomIndex = Math.floor(Math.random() * dareData.dares.length);
      const randomDare = dareData.dares[randomIndex];
      const { MessageEmbed } = require('discord.js');
      const emojis = ['😄', '🎉', '🔥', '🌟', '🎈']; // Add more emojis as needed
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Random Dare')
        .setDescription(`${randomEmoji} ${randomDare}`)
        .setFooter({ text: 'powered by "Break~Bread"' });

      await interaction.reply({ embeds: [embed] });
    }
  });
  //-------------------------------------------------------------------------------------------------------------------//
  client.once('ready', () => {
    client.user.setActivity('Ohio', { type: 'COMPETING' });
    client.user.setStatus('idle'); // Set the status to 'idle'
  });
  //-------------------------------------------------------------------------------------------------------------------//
  fs.readFile(logConfigPath, (err, data) => {
      if (err) {
          console.error('Error reading log configuration:', err);
      } else {
          const config = JSON.parse(data);
          client.logChannels = config.logChannels || {};
          
      }
  });
   

   //-------------------------------------------------------------------------------------------------------------------//
  client.guilds.cache.forEach(guild => {
      guild.commands.set(commands)
          .then(() => {
              console.log(`Slash commands registered in ${guild.name} (${guild.id})`);
          })
          .catch(error => {
              console.error(`Error registering slash commands in ${guild.name}:`, error);
          });
  });
 //-------------------------------------------------------------------------------------------------------------------//
 client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isCommand()) return;

    const member = interaction.member;
    if (!member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply('You need to have the ADMINISTRATOR role to use this command.');
      return;
    }

    const { commandName, options } = interaction;
    if (commandName === 'welcome') {
      const channelOption = options.get('channel');
      const channelId = channelOption.value;
      const guildId = interaction.guildId;

      // Assuming saveChannelId is a function that saves channelId to a database
      await saveChannelId(guildId, channelId);

      await interaction.reply(`Welcome channel set to <#${channelId}>`);
    } else if (commandName === 'welcomeoff') {
      const guildId = interaction.guildId;

      // Assuming saveChannelId is a function that saves channelId to a database
      await saveChannelId(guildId, null);

      await interaction.reply('Welcome messages turned off.');
    }
  } catch (error) {
    console.error(error);
    await interaction.reply('An error occurred while executing the command. Please try again later.');
  }
});
client.on('guildMemberAdd', async (member) => {
  const guildId = member.guild.id;
  const channelId = getChannelId(guildId);
  if (!channelId) return;
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(`Hey ${member.user.username}!, welcome to our server ${member.guild.name}`)
    .setDescription('Please read the rules and have fun!')
    .setColor('GREEN');
  try {
    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send welcome message:', error);
  }
});
function getChannelId(guildId) {
  try {
    const data = fs.existsSync(welcomeDataPath) ? JSON.parse(fs.readFileSync(welcomeDataPath)) : {};
    return data[guildId];
  } catch (error) {
    console.error('Failed to get welcome channel ID:', error);
    return null;
  }
}
function saveChannelId(guildId, channelId) {
  try {
    const data = fs.existsSync(welcomeDataPath) ? JSON.parse(fs.readFileSync(welcomeDataPath)) : {};
    data[guildId] = channelId;
    fs.writeFileSync(welcomeDataPath, JSON.stringify(data, null, 2));
   
  } catch (error) {
    console.error('Failed to save welcome channel ID:', error);
  }
}
 //-------------------------------------------------------------------------------------------------------------------//
// auto role
client.on('guildMemberAdd', (member) => {
    const roleId = '1068490336030179338'; // Role ID to assign
    const role = member.guild.roles.cache.get(roleId);
    if (role) {
      member.roles.add(role)
        .catch(console.error);
    }
  });
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => { //Avatar ,Membercount, Pingme      //
  if (!interaction.isCommand()) return;
  const {
      commandName
      , options
  } = interaction;
  // Command: avatar
  if (commandName === 'avatar') {
      const user = options.getUser('user');
      if (user) {
          const avatarURL = user.displayAvatarURL({
              format: 'png'
              , dynamic: true
              , size: 1024
          });
          const embed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle(`${user.username}'s Avatar`)
              .setImage(avatarURL)
              .setFooter({
                text: 'Avatar of ' + user.tag,
                iconURL: user.displayAvatarURL({
                    format: 'png',
                    dynamic: true
                })
            });
            
          await interaction.reply({
              embeds: [embed]
              , ephemeral: true
          });
      } else {
          await interaction.reply({
              content: 'User not found!'
          });
      }
      // Command: membercount
  } else if (commandName === 'membercount') {
      let totalMemberCount = 0;
      client.guilds.cache.forEach((guild) => {
          totalMemberCount += guild.memberCount;
      });
      const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Total Member Count')
          .setDescription(`Total members across all servers: ${totalMemberCount}`);
      await interaction.reply({
          embeds: [embed]
      });
      // Command: pingme
  } else if (commandName === 'pingme') {
    const embed = {
        color: 0x0099ff,
        description: 'Calculating ping... ⌛',
        footer: {
            text: 'Powered by Break~Bread 🍞'
        }
    };

    const reply = await interaction.reply({
        embeds: [embed],
        fetchReply: true
    });

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    embed.description = `✅ ${interaction.user.username}, your ping is ${ping}ms.`;
    await interaction.editReply({
        embeds: [embed]
    });
}



});
//-------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  if (commandName === 'whois') {
      const userId = options.getUser('user').id;
      const user = await client.users.fetch(userId);
      const member = interaction.guild.members.cache.get(userId);
      const boosted = member.premiumSince !== null;
      const accountCreated = moment(user.createdAt).format('LLLL');
      const serverJoined = moment(member.joinedAt).format('LLLL');
      const roles = member.roles.cache.filter(role => role.id !== interaction.guild.id).map(role => role.name);

      const embed = new MessageEmbed()
          .setTitle('User Information')
          .setColor('#7289DA')
          .setThumbnail(user.displayAvatarURL({
              format: 'png',
              size: 128,
              dynamic: true
          }))
          .addFields(
              { name: 'Username', value: `**${user.username}**`, inline: true },
              { name: 'Discriminator', value: `**#${user.discriminator}**`, inline: true },
              { name: 'User ID', value: `**${user.id}**`, inline: true },
              { name: '\u200B', value: '\u200B' },
              { name: 'Account Created', value: `📆 ${moment(user.createdAt).format('MMMM Do, YYYY')} (${moment(user.createdAt).fromNow()})`, inline: false },
              { name: 'Joined Server', value: `📆 ${moment(member.joinedAt).format('MMMM Do, YYYY')} (${moment(member.joinedAt).fromNow()})`, inline: false },
              { name: '\u200B', value: '\u200B' },
              { name: 'Roles', value: roles.length > 0 ? roles.join(', ') : 'None', inline: false }
          )
          .setFooter({ text: 'Powered by "Break~Bread"' })
          .setTimestamp();

      await interaction.reply({
          embeds: [embed]
      });
  }
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => { // Beta /anime
  if (interaction.isCommand() && interaction.commandName === 'anime') {
      const embed = new MessageEmbed()
          .setTitle('Anime Images !')
          .setDescription(`🌟 The \`/anime\` command allows you to receive amazing anime images!\n\n✨ Discover breathtaking artwork, fan-favorite characters, and stunning scenes from your favorite anime series.\n\nTo receive an anime image, simply use the \`/anime\` command. Each time you use the command, a new image will be sent to you.\n\nEnjoy the beauty of anime with just a command!\n\nHelp us reach our vote target of 1K votes to unlock even more features!`)
          .setColor('#FFC0CB');
      const row = new MessageActionRow()
          .addComponents(new MessageButton()
              .setLabel('Vote Now')
              .setStyle('LINK')
              .setURL('https://top.gg/bot/1109414621296738325'));
      await interaction.reply({
          embeds: [embed]
          , components: [row]
      });
  }
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  if (commandName === 'poll') {
  const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');
  if (!isAdmin) {
  await interaction.reply({ content: 'Only administrators can use this command.', ephemeral: true });
  return;
  }
  const question = options.getString('question');
  const duration = options.getInteger('duration');
  const pollEmbed = new MessageEmbed()
  .setColor('#ff9900')
  .setTitle('Poll')
  .setDescription(`**${question}**`)
  .setFooter({ text: 'Vote as per your answer.' })
  .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
  const pollActionRow = new MessageActionRow()
  .addComponents(
  new MessageButton().setCustomId('thumbsUp').setLabel('👍').setStyle('PRIMARY'),
  new MessageButton().setCustomId('thumbsDown').setLabel('👎').setStyle('PRIMARY')
  );
  const pollMessage = await interaction.reply({
  embeds: [pollEmbed],
  components: [pollActionRow],
  fetchReply: true
  });
  const endTime = Date.now() + Math.min(duration * 1000, 172800000);
  const collector = pollMessage.createMessageComponentCollector({
  componentType: 'BUTTON',
  time: duration * 1000
  });
  let votes = { thumbsUp: 0, thumbsDown: 0 };
  collector.on('collect', async (buttonInteraction) => {
  const customId = buttonInteraction.customId;
  votes[customId]++;
  await buttonInteraction.user.send(`Your vote for ${customId === 'thumbsUp' ? '👍' : '👎'} has been submitted!`);

  });
  collector.on('end', async () => {
  pollActionRow.components.forEach((component) => { component.setDisabled(true); });
  const totalVotes = votes.thumbsUp + votes.thumbsDown;
  const thumbsUpPercentage = ((votes.thumbsUp / totalVotes) * 100) || 0;
  const thumbsDownPercentage = ((votes.thumbsDown / totalVotes) * 100) || 0;
  const resultEmbed = new MessageEmbed()
  .setColor('#ff9900')
  .setTitle('Poll Result')
  .setDescription(`**${question}**`)
  .addFields(
  { name: '👍', value: `${votes.thumbsUp} votes (${thumbsUpPercentage.toFixed(2)}%)`, inline: true },
  { name: '👎', value: `${votes.thumbsDown} votes (${thumbsDownPercentage.toFixed(2)}%)`, inline: true }
  );
  await pollMessage.edit({
  embeds: [resultEmbed],
  components: [pollActionRow]
  });
  });
  const updateRemainingTime = () => {
  const remainingTime = endTime - Date.now();
  if (remainingTime <= 0) {
  collector.stop();
  return;
  }
  const days = Math.floor(remainingTime / 86400000);
  const hours = Math.floor((remainingTime % 86400000) / 3600000);
  const minutes = Math.floor((remainingTime % 3600000) / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const timeString = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  pollEmbed.setFooter({ text: `Vote as per your answer. Poll ends in ${timeString}` });
  pollMessage.edit({
  embeds: [pollEmbed],
  components: [pollActionRow]
  });
  };
  const updateInterval = setInterval(updateRemainingTime, 1000);
  collector.on('end', () => {
  clearInterval(updateInterval);
  });
  }
  });
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'announce') return;
  // Check if user has necessary permissions
  if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You need to be an administrator to use this command.');
  }
  const channel = interaction.options.getChannel('channel');
  const role = interaction.options.getRole('role');
  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description');
  const color = interaction.options.getString('color');
  const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description);
  try {
      await channel.send({
          content: role.toString()
          , embeds: [embed]
      });
      interaction.reply('Announcement sent successfully.');
  } catch (error) {
      console.error('Failed to send announcement:', error);
      interaction.reply('Failed to send announcement. Please try again later.');
  }
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const {
      commandName
      , options
  } = interaction;
  if (commandName === 'logenable') {
      const channelId = options.get('channel')
          .value;
      const logChannel = client.channels.cache.get(channelId);
      const guildId = interaction.guildId;
      const memberPermissions = interaction.member.permissions;
      if (!memberPermissions.has('ADMINISTRATOR')) {
          return sendResponse(interaction, 'You do not have permission to use this command.', true);
      }
      if (client.logChannels[guildId]) {
          const prevLogChannelId = client.logChannels[guildId];
          const prevLogChannel = client.channels.cache.get(prevLogChannelId);
          return sendResponse(interaction, `A logging channel is already selected. Please delete your previous logging channel (${prevLogChannel}) before setting a new one.`, true);
      }
      if (!logChannel) {
          return sendResponse(interaction, 'Invalid channel provided.', true);
      }
      client.logChannels[guildId] = channelId;
      saveLogChannels();
      return sendResponse(interaction, `Log channel set to ${logChannel.name}`, true);
  }
  if (commandName === 'logdisable') {
      const guildId = interaction.guildId;
      const memberPermissions = interaction.member.permissions;
      if (!memberPermissions.has('ADMINISTRATOR')) {
          return sendResponse(interaction, 'You do not have permission to use this command.', true);
      }
      delete client.logChannels[guildId];
      saveLogChannels();
      return sendResponse(interaction, 'Log channel disabled.', true);
  }
});
function sendResponse(interaction, content, ephemeral = false) {
  return interaction.reply({
      content
      , ephemeral
  , });
}
function saveLogChannels() {
  fs.writeFileSync(configFile, JSON.stringify(client.logChannels, null, 2));
}
//-------------------------------------------------------------------------------------------------------------------//
//msg edit
client.on('messageUpdate', (oldMessage, newMessage) => {
  // Skip processing if the author of the new message is the bot itself or if the new message was sent by a bot
  if (newMessage.author.id === client.user.id || newMessage.author.bot) return;
  const guildId = newMessage.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const member = newMessage.member;
  const memberAvatar = member ? member.user.displayAvatarURL({
      size: 128
  }) : '';
  const embed = new MessageEmbed()
      .setColor('#FF8000')
      .setTitle('Message Edited')
      .setDescription(`Message edited in <#${newMessage.channel.id}>`)
      .setAuthor({
        name: newMessage.author.tag,
        iconURL: memberAvatar
      })
      
      .addFields({
          name: 'Before'
          , value: oldMessage.content || '-'
      }, {
          name: 'After'
          , value: newMessage.content || '-'
      })
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('messageDelete', (message) => {
  // Ignore messages sent by bots
  if (message.author.bot) return;
  const guildId = message.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const memberAvatar = message.member ? message.member.user.displayAvatarURL({
      size: 128
  }) : '';
  const content = message.content || '*Message content not available.*';
  const embed = new MessageEmbed()
      .setColor('#ff9900')
      .setDescription(`**Message Deleted**\n**Author**: ${message.author.tag}\n**Content**:\n${content}`)
      .setTimestamp()
      .setAuthor({
        name: message.author.tag,
        iconURL: memberAvatar
      });
      
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Role Created
client.on('roleCreate', (role) => { //bugs
  const guildId = role.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const embed = new MessageEmbed()
      .setColor('#b3ffb3') // Light green color
      .setTitle('Role Created')
      .addFields({
          name: 'Name'
          , value: role.name
      }, {
          name: 'ID'
          , value: role.id
      })
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Role Deleted
client.on('roleDelete', (role) => {
  const guildId = role.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const embed = new MessageEmbed()
      .setColor('#ffb3b3') // Light red color
      .setTitle('Role Deleted')
      .addFields({
          name: 'Name'
          , value: role.name
      }, {
          name: 'ID'
          , value: role.id
      })
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Role Added to Member
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const guildId = oldMember.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  addedRoles.forEach(role => {
      const embed = new MessageEmbed()
          .setColor('#b3ffb3') // Light green color
          .setTitle('Role Added to Member')
          .addFields({
              name: 'Member'
              , value: newMember.user.tag
          }, {
              name: 'Role'
              , value: role.name
          })
          .setTimestamp();
      logChannel.send({
              embeds: [embed]
          })
          .catch((error) => {
              console.error('Error sending log message:', error);
          });
  });
});
//-------------------------------------------------------------------------------------------------------------------//
// Role Removed from Member
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const guildId = oldMember.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  removedRoles.forEach(role => {
      const embed = new MessageEmbed()
          .setColor('#ffb3b3') // Light red color
          .setTitle('Role Removed from Member')
          .addFields({
              name: 'Member'
              , value: newMember.user.tag
          }, {
              name: 'Role'
              , value: role.name
          })
          .setTimestamp();
      logChannel.send({
              embeds: [embed]
          })
          .catch((error) => {
              console.error('Error sending log message:', error);
          });
  });
});
//-------------------------------------------------------------------------------------------------------------------//
// Channel Created
client.on('channelCreate', (channel) => {
  const guildId = channel.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const channelTag = `<#${channel.id}>`;
  const embed = new MessageEmbed()
      .setColor('#e6ffe6') // Light green color
      .setTitle('Channel Created')
      .setDescription(`Channel: ${channelTag}`)
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Channel Deleted
client.on('channelDelete', (channel) => {
  const guildId = channel.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const channelName = channel.name;
  const embed = new MessageEmbed()
      .setColor('#ffe6e6') // Light red color
      .setTitle('Channel Deleted')
      .setDescription(`Channel: ${channelName}`)
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
client.on('channelUpdate', (oldChannel, newChannel) => {
  if (oldChannel.name !== newChannel.name) {
      const guildId = oldChannel.guild.id;
      const logChannelId = client.logChannels[guildId];
      if (!logChannelId) return;
      const logChannel = client.channels.cache.get(logChannelId);
      if (!logChannel) return;
      const embed = new MessageEmbed()
          .setColor('#ffffcc') // Light yellow color
          .setTitle('Channel Name Changed')
          .addFields({
              name: 'Old Name'
              , value: oldChannel.name
          }, {
              name: 'New Channel'
              , value: newChannel.toString()
          })
          .setTimestamp();
      logChannel.send({
              embeds: [embed]
          })
          .catch((error) => {
              console.error('Error sending log message:', error);
          });
  }
});
//-------------------------------------------------------------------------------------------------------------------//
// Nickname Changed
client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.nickname !== newMember.nickname) {
      const guildId = oldMember.guild.id;
      const logChannelId = client.logChannels[guildId];
      if (!logChannelId) return;
      const logChannel = client.channels.cache.get(logChannelId);
      if (!logChannel) return;
      const embed = new MessageEmbed()
          .setColor('#ffffcc') // Light yellow color
          .setTitle('Nickname Changed')
          .addFields({
              name: 'Member'
              , value: newMember.user.toString()
          }, {
              name: 'Old Nickname'
              , value: oldMember.nickname || 'None'
          }, {
              name: 'New Nickname'
              , value: newMember.nickname || 'None'
          })
          .setTimestamp();
      logChannel.send({
              embeds: [embed]
          })
          .catch((error) => {
              console.error('Error sending log message:', error);
          });
  }
});
//-------------------------------------------------------------------------------------------------------------------//
// Member Join
client.on('guildMemberAdd', (member) => {
  const guildId = member.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const embed = new MessageEmbed()
      .setColor('#e6ffe6') // Light green color
      .setTitle('Member Join')
      .setDescription(`Member: ${member.user.tag}`)
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Member Leave
client.on('guildMemberRemove', (member) => {
  const guildId = member.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const embed = new MessageEmbed()
      .setColor('#ffe6e6') // Light red color
      .setTitle('Member Leave')
      .setDescription(`Member: ${member.user.tag}`)
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
//-------------------------------------------------------------------------------------------------------------------//
// Member Banned
client.on('guildBanAdd', (ban) => {
  const guildId = ban.guild.id;
  const logChannelId = client.logChannels[guildId];
  if (!logChannelId) return;
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;
  const embed = new MessageEmbed()
      .setColor('#ffccff') // Light purple color
      .setTitle('Member Banned')
      .setDescription(`User: ${ban.user.tag}`)
      .addFields({
          name: 'Reason'
          , value: ban.reason || 'No reason provided'
      })
      .setTimestamp();
  logChannel.send({
          embeds: [embed]
      })
      .catch((error) => {
          console.error('Error sending log message:', error);
      });
});
function sendResponse(interaction, content) {
  const response = {
      type: 4
      , data: {
          content: content
      , }
  , };
  client.api.interactions(interaction.id, interaction.token)
      .callback.post({
          data: response
      , });
}
function saveLogChannels() {
  fs.writeFile(logConfigPath, JSON.stringify({
      logChannels: client.logChannels
  }), (err) => {
      if (err) {
          console.error('Error saving log channels:', err);
      } else {
          console.log('Log channels saved successfully.');
      }
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'calcu') return;
  await interaction.deferReply();

  const calculator = new Calculator(interaction);
  calculator.initialize();
});
class Calculator {
  constructor(interaction) {
    this.interaction = interaction;
    this.currentDisplay = '';
  }

  initialize() {
    const buttons = [
      ['1', '2', '3', '+'],
      ['4', '5', '6', '-'],
      ['7', '8', '9', '*'],
      ['0', 'C', '=', '/']
    ];

    const rows = buttons.map(row =>
      new MessageActionRow().addComponents(
        ...row.map(value => this.createButton(value))
      )
    );

    const embed = this.createEmbed();

    this.interaction.editReply({
      embeds: [embed],
      components: rows
    });

    const collector = this.createCollector();
    collector.on('collect', this.handleButtonClick.bind(this));
    collector.on('end', this.handleCollectorEnd.bind(this));
  }

  createButton(value) {
    return new MessageButton()
      .setCustomId(value)
      .setLabel(value)
      .setStyle(value === 'C' ? 'DANGER' : 'PRIMARY');
  }

  createEmbed() {
    return new MessageEmbed()
      .setTitle('Calculator')
      .setDescription(this.currentDisplay);
  }

  createCollector() {
    const filter = (i) => i.user.id === this.interaction.user.id;
    return this.interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000
    });
  }

  handleButtonClick(button) {
    if (button.customId === '=') {
      try {
        const result = eval(this.currentDisplay);
        this.currentDisplay = String(result);
      } catch (error) {
        this.currentDisplay = 'Error';
      }
    } else if (button.customId === 'C') {
      this.currentDisplay = '';
    } else {
      this.currentDisplay += button.customId;
    }

    this.updateDisplay();
    button.deferUpdate();
  }

  handleCollectorEnd() {
    this.interaction.editReply({
      content: '**Calculator** (Collector ended)',
      components: []
    });
  }

  updateDisplay() {
    const maxLength = 1024;
    let display = this.currentDisplay;
    if (display.length > maxLength) {
      display = display.substring(0, maxLength - 3) + '...';
    }

    const embed = this.createEmbed().setFooter({ text: 'Powered by Break~Bread' });

    this.interaction.editReply({
      embeds: [embed]
    });
  }
}
//-------------------------------------------------------------------------------------------------------------------//
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'catfact') {
      try {
          const response = await axios.get('https://catfact.ninja/fact');
          const fact = response.data.fact;
          const embed = new MessageEmbed()
              .setColor('#FFD700')
              .setTitle('🐱 Cat Fact')
              .setDescription(fact);
          await interaction.reply({
              embeds: [embed]
              , ephemeral: false
          , });
      } catch (error) {
          console.error(error);
          await interaction.reply({
              content: 'Failed to retrieve a cat fact. 😿'
              , ephemeral: false
          , });
      }
  }
});
//-------------------------------------------------------------------------------------------------------------------//
const os = require('os');
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const {
      commandName
  } = interaction;
  if (commandName === 'botinfo') {
      const totalMemory = os.totalmem() / 1024 / 1024 / 1024; // Convert bytes to GB
      const cpuSpeedHz = os.cpus()[0].speed / 1000000000; // Convert Hz to GHz
      const cpuSpeedGHz = cpuSpeedHz.toFixed(1); // Convert CPU speed to GHz with one decimal place
      let osName = os.platform();
      if (osName === 'win32' && parseFloat(os.release()) >= 10.0) {
          osName = 'win32';
      }
      const embed = {
          color: 0x0099ff
          , title: 'Bot Info'
          , fields: [{
              name: 'OS'
              , value: osName
          }, {
              name: 'Total Memory'
              , value: `32 GB`
          }, {
              name: 'CPU Speed'
              , value: `3.70 GHz`
          }, ]
      , };
      await interaction.reply({
          embeds: [embed]
      });
  }
});
//-------------------------------------------------------------------------------------------------------------------//
const autoroleDataPath = './src/autoroledata/autoroledata.json';
const autoroleData = {};
client.once('ready', () => {
  const commands = [{name: 'autoroleenable', description: 'Set the autorole for new members', options: [{name: 'role', type: 'ROLE', description: 'The role to be assigned to new members', required: true},]}, {name: 'autoroledisable', description: 'Disable autorole for new members'},];

  client.guilds.cache.forEach(guild => {
    guild.commands.set(commands).then(() => {}).catch(error => {});
  });
});
client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isCommand()) return;
    const { commandName, options, member, guildId } = interaction;
    if (commandName === 'autoroleenable') {
      if (!member.permissions.has('ADMINISTRATOR')) {
        await interaction.reply('You need to be an administrator on this server to use this command.');
        return;
      }

      const currentAutoroles = autoroleData[guildId] || [];
      if (currentAutoroles.length >= 5) {
        await interaction.reply('You can only set up to 5 autoroles per server.');
        return;
      }

      const roleId = options.get('role').value;

      if (currentAutoroles.includes(roleId)) {
        await interaction.reply('This role is already set as an autorole.');
        return;
      }

      saveRoleId(guildId, roleId);
      await interaction.reply(`Autorole set to <@&${roleId}>`);
    } else if (commandName === 'autoroledisable') {
      if (!member.permissions.has('ADMINISTRATOR')) {
        await interaction.reply('You need to be an administrator on this server to use this command.');
        return;
      }

      const success = disableAutorole(guildId);
      await interaction.reply(success ? 'Autorole disabled successfully!' : 'No autorole data found or failed to disable.');
    }
  } catch (error) {
    await interaction.reply('An error occurred while executing the command.');
  }
});
client.on('guildMemberAdd', async (member) => {
  const roleId = getRoleId(member.guild.id);
  if (!roleId) return;

  const role = member.guild.roles.cache.get(roleId);
  if (role) await member.roles.add(role).catch(error => {});
});
function getRoleId(guildId) {
  try {
    const data = fs.existsSync(autoroleDataPath) ? JSON.parse(fs.readFileSync(autoroleDataPath)) : {};
    return data[guildId];
  } catch (error) { return null; }
}
function saveRoleId(guildId, roleId) {
  try {
    const data = fs.existsSync(autoroleDataPath) ? JSON.parse(fs.readFileSync(autoroleDataPath)) : {};
    data[guildId] = data[guildId] || [];
    data[guildId].push(roleId);
    fs.writeFileSync(autoroleDataPath, JSON.stringify(data, null, 2));
    autoroleData[guildId] = data[guildId];
  } catch (error) {}
}
function disableAutorole(guildId) {
  try {
    const data = fs.existsSync(autoroleDataPath) ? JSON.parse(fs.readFileSync(autoroleDataPath)) : {};
    if (data[guildId]) {
      delete data[guildId];
      fs.writeFileSync(autoroleDataPath, JSON.stringify(data, null, 2));
      delete autoroleData[guildId];
      return true;
    } else return false;
  } catch (error) { return false; }
}
//-------------------------------------------------------------------------------------------------------------------//
const boostDataPath = './src/boostdata/boostdata.json';
client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isCommand()) return;

    const member = interaction.member;
    if (!member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply('You need to have the ADMINISTRATOR role to use this command.');
      return;
    }

    const { commandName, options } = interaction;
    if (commandName === 'boostchannel') {
      const channelOption = options.get('channel');
      const channelId = channelOption.value;
      const guildId = interaction.guildId;

      await saveBoostChannelId(guildId, channelId);

      await interaction.reply(`Boost channel set to <#${channelId}>`);
    } else if (commandName === 'boostchanneloff') {
      const guildId = interaction.guildId;

      await saveBoostChannelId(guildId, null);

      await interaction.reply('Boost messages turned off.');
    }
  } catch (error) {
    console.error(error);
    await interaction.reply('An error occurred while executing the command. Please try again later.');
  }
});
client.on('guildMemberBoost', async (member) => {
  const guildId = member.guild.id;
  const channelId = getBoostChannelId(guildId);
  if (!channelId) return;
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(`Thank you ${member.user.username} for boosting our server ${member.guild.name}`)
    .setDescription('We really appreciate your support!')
    .setColor('BLUE');
  try {
    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send boost thank you message:', error);
  }
});
function getBoostChannelId(guildId) {
  try {
    const data = fs.existsSync(boostDataPath) ? JSON.parse(fs.readFileSync(boostDataPath)) : {};
    return data[guildId];
  } catch (error) {
    console.error('Failed to get boost channel ID:', error);
    return null;
  }
}
function saveBoostChannelId(guildId, channelId) {
  try {
    const data = fs.existsSync(boostDataPath) ? JSON.parse(fs.readFileSync(boostDataPath)) : {};
    data[guildId] = channelId;
    fs.writeFileSync(boostDataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to save boost channel ID:', error);
  }
}
client.login(process.env.DISCORD_TOKEN);







client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'dev') {
    const userId = ''; // User ID for the profile picture
    const user = await client.users.fetch(userId);

    // Delete the original command message
    await interaction.deferReply();

    const embed = new MessageEmbed()
      .setTitle('Bot Developer Information')
      .setDescription(`This bot is created by "Itz_Nan".`)
      .setColor('#FFC0CB')
      .setThumbnail(user.avatarURL()); // Set the user's profile picture as the thumbnail

    await interaction.editReply({ embeds: [embed] });
  }
});








const targetBotId = ''; // Replace with your bot's user ID
client.on('messageCreate', (message) => {
  if (
    message.content.includes(`<@${targetBotId}>`) &&
    !message.mentions.roles.size &&
    !message.author.bot
  ) {
    const totalMembers = client.guilds.cache.reduce((acc, guild) => {
      return acc + guild.memberCount;
    }, 0);

    const embed = new MessageEmbed()
      .setTitle('About me')
      .setDescription(
        `Prepare to be amazed by "Break~Bread", the unparalleled moderation assistant meticulously crafted by the ingenious mind of Nan.jar#5476. With a sprinkle of development magic, BreakBread emerges as the beacon of excellence, poised to transcend your server's moderation experience to unprecedented levels of greatness! Get ready to embrace the future of moderation with BreakBread by your side.\n\nTotal Servers: ${client.guilds.cache.size}\nTotal Members Across Servers: ${totalMembers}`
      )
      .setColor('#e6ffe6');

    const joinButton = new MessageButton()
      .setLabel('Support')
      .setStyle('LINK')
      .setURL('https://discord.gg/qUvhGTkUJQ');

    const voteButton = new MessageButton()
      .setLabel('Vote')
      .setStyle('LINK')
      .setURL('https://top.gg/bot/1109414621296738325?s=0a7dee8c3ad1d');

    const row = new MessageActionRow().addComponents(joinButton, voteButton);

    message
      .reply({
        embeds: [embed],
        components: [row],
      })
      .catch(console.error);
  }
});




client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'servercount') {
    const serverCount = client.guilds.cache.size;

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Server Count')
      .setDescription(`The bot is currently joined in ${serverCount} servers.`);

    await interaction.reply({
      embeds: [embed]
    });
  }
});



console.log("//-------------------------------------------------------------------------------------------------------------------//");
console.log('/kickmember registered!');
console.log('/banmember registered!');
console.log('/servercount registered!');
console.log('/Calcu registered!');
console.log('/Uptime registered!');
console.log('/catfact registered!');
console.log('/botinfo registered!');
console.log('/dare registered!');
console.log('/avatar registered!');
console.log('/inviterecive registered!');
console.log('/announce registered!');
console.log('/whois registered!');
console.log('/welcome registered!');
console.log('/welcomeoff registered!');
console.log('/membercount registered!');
console.log('/anime registered!');
console.log('/dev registered!');
console.log('/poll registered!');
console.log('/pingme registered!');
console.log('/logenable registered!');
console.log('/logdisable registered!');
console.log('/boostchannel registered!');
console.log('/boostchanneloff registered!');
console.log('/autoroleenable registered!');
console.log('/autoroledisable registered!');
  const registerCommands = require('./commands');
  registerCommands(client);
  //-------------------------------------------------------------------------------------------------------------------//////
 // #Define constants and variables
const CHANNEL_ID = '1153157901817491486';
const TIMER_INTERVAL = 10000;
let timerInterval, timerMessage;

// When the client is ready
client.once('ready', () => {
  const channel = client.channels.cache.get(CHANNEL_ID);

  if (channel) {
    sendTimerMessage(channel);
    startTimer(channel);
  } else {
    console.error(`Channel with ID ${CHANNEL_ID} not found.`);
  }
});

// Send an initial timer message
function sendTimerMessage(channel) {
  const embed = new MessageEmbed()
    .setColor(0x0099ff)
    .setTitle('System Usage')
    .setDescription('Initializing...')
    .addFields({ name: 'Used Memory', value: 'Calculating...' });

  channel.send({ embeds: [embed] })
    .then(message => {
      timerMessage = message;
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}

// Start the timer to update system usage
function startTimer(channel) {
  timerInterval = setInterval(() => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemoryGB = (totalMemory - freeMemory) / (1024 * 1024 * 1024);

    const embed = new MessageEmbed()
      .setColor(0x0099ff)
      .setTitle('System Usage')
      .setDescription('Updating...')
      .addFields({ name: 'Used Memory', value: `${usedMemoryGB.toFixed(2)} GB` });

    if (timerMessage) {
      timerMessage.edit({ embeds: [embed] })
        .catch(error => {
          console.error('Error editing message:', error);
        });
    } else {
      clearInterval(timerInterval);
      console.error('Timer message not found.');
    }
  }, TIMER_INTERVAL);
}
