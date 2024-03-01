
const colorChoices = [{
    name: 'Red'
    , value: 'FF0000'
  }, {
    name: 'Blue'
    , value: '0000FF'
  }, {
    name: 'Green'
    , value: '00FF00'
  }, {
    name: 'Yellow'
    , value: 'FFFF00'
  }, {
    name: 'Orange'
    , value: 'FFA500'
  }, {
    name: 'Purple'
    , value: '800080'
  }, {
    name: 'Pink'
    , value: 'FFC0CB'
  }, {
    name: 'Cyan'
    , value: '00FFFF'
  }, {
    name: 'Magenta'
    , value: 'FF00FF'
  }, {
    name: 'Lime'
    , value: '00FF00'
  }, {
    name: 'Teal'
    , value: '008080'
  }, {
    name: 'Indigo'
    , value: '4B0082'
  }, {
    name: 'Silver'
    , value: 'C0C0C0'
  }, {
    name: 'Gold'
    , value: 'FFD700'
  }, {
    name: 'Brown'
    , value: 'A52A2A'
  }, {
    name: 'Maroon'
    , value: '800000'
  }, {
    name: 'Navy'
    , value: '000080'
  }, {
    name: 'Olive'
    , value: '808000'
  }, {
    name: 'Gray'
    , value: '808080'
  }];
  module.exports = async (client) => {
    client.once('ready', async () => {
        const commands = [
         

           {
                name: 'logenable',
                description: 'Enable logging in a channel',
                options: [
                  {
                    name: 'channel',
                 description: 'The channel to set as the log channel',
                 type: 'CHANNEL',
                 required: true,
                },
             ],
           },
           {
             name: 'autoroleenable',
             description: 'Set the autorole for new members',
             options: [
               {
                 name: 'role',
                 type: 'ROLE',
                 description: 'The role to be assigned to new members',
                 required: true,
               },
             ],
           },
           {
             name: 'autoroledisable',
             description: 'Disable autorole for new members',
           },
           {
              name: 'logdisable',
              description: 'Disable logging in the current channel',
           },
           {
             name: 'calcu',
             description: 'Your personal calculator',
           },
           {
             name: 'servercount',
             description: 'Total number of servers the bot is handling',
           },
           {
             name: 'botinfo',
             description: 'Shows the Bot Information',
           },
           {
             name: 'kickmember',
             description: 'Kick a member',
             options: [
               {
                 name: 'member',
                 description: 'The member to kick',
                 type: 'USER',
                 required: true,
               },
             ],
           },
           {
             name: 'dare',
             description: 'Get a random dare',
           },
           {
             name: 'welcomeoff',
             description: 'turn off welcome message',
           },
           {
             name: 'ban',
             description: 'Ban a member',
             options: [
               {
                 name: 'member',
                 description: 'The member to ban',
                 type: 'USER',
                 required: true,
               },
             ],
           },
           {
             name: 'catfact',
             description: 'Retrieve a random cat fact',
           },
           {
             name: 'boostchanneloff',
             description: 'turn off the current boost channel',
           },
           {
             name: 'avatar',
             description: 'Get the avatar of a tagged user',
             options: [
               {
                 name: 'user',
                 description: 'The user to retrieve the avatar for',
                 type: 'USER',
                 required: true,
               },
             ],
           },
           {
             name: 'inviterecive',
             description: 'Get the name and invite link of a server by providing its ID.',
             options: [
               {
                 name: 'ogno',
                 description: 'The ID of the server.',
                 type: 'STRING',
                 required: true,
               },
             ],
           },
           {
             name: 'announce',
             description: 'Announce a message in a channel',
             options: [
               {
                 name: 'channel',
                 description: 'The channel to send the announcement',
                 type: 'CHANNEL',
                 required: true,
               },
               {
                 name: 'role',
                 description: 'The role to tag in the announcement',
                 type: 'ROLE',
                 required: true,
               },
               {
                 name: 'title',
                 description: 'The title of the announcement',
                 type: 'STRING',
                 required: true,
               },
               {
                 name: 'description',
                 description: 'The description of the announcement',
                 type: 'STRING',
                 required: true,
               },
               {
                 name: 'color',
                 description: 'The color of the announcement',
                 type: 'STRING',
                 required: true,
                 choices: colorChoices,
               },
             ],
           },
           {
             name: 'whois',
             description: 'Get information about a user',
             options: [
               {
                 name: 'user',
                 type: 'USER',
                 description: 'The user to get information about',
                 required: true,
               },
             ],
           },
           {
             name: 'boostchannel',
             description: 'Set up the channel for Boost info !',
             options: [
               {
                 name: 'channel',
                 type: 'CHANNEL',
                 description: 'The channel to send welcome messages',
                 required: true,
               },
             ],
           },
           {
             name: 'welcome',
             description: 'Set up the channel for welcome messages',
             options: [
               {
                 name: 'channel',
                 type: 'CHANNEL',
                 description: 'The channel to send welcome messages',
                 required: true,
               },
             ],
           },
           {
             name: 'membercount',
             description: 'Get the total member count of all servers',
           },
           {
             name: 'anime',
             description: 'Get some random Anime',
           },
           {
             name: 'dev',
             description: 'Get info about Dev',
           },
           {
             name: 'poll',
             description: 'Create a poll with a question and duration',
             options: [
               {
                 name: 'question',
                 description: 'The question for the poll',
                 type: 'STRING',
                 required: true,
               },
               {
                 name: 'duration',
                 description: 'The duration of the poll in seconds (valid for up to 2 days)',
                 type: 'INTEGER',
                 required: true,
               },
             ],
           },
           {
             name: 'pingme',
             description: 'Get your ping',
           },
           






        ];

        await client.application.commands.set(commands);
    });
};





