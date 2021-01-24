const config = require('../config.json');
const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    const categoryID = config.TicketGroup;
    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketExists = false;
    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            ticketExists = true;

            message.reply("This ticket has already been made.");

            return;
        }

    });

    if (ticketExists){
        return;
    }

    var embed = new Discord.MessageEmbed()

    .setTitle("Hi " + message.author.username)
    .setFooter("Ticket will be created");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase()+"-"+ userDiscriminator, {type:'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x =>x.name ===`@everyone`),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id,{
                        VIEW_CHANNEL: true,
                        create_instant_invite:true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTION: true
                    });
                    var embedParent = new Discord.MessageEmbed()
                        .setTitle(`Hi ${message.author.username}`)
                        .setDescription("Post your complaint/feedback/question.");

                    settedParent.send(embedParent);  
                }
            );
        }
    );
}

module.exports.help = {
    name: "ticket-open",
    description: "You can use this command to create a ticket.",
    usage: "!ticket-open"
}