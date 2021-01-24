const config = require('../config.json');
const Discord = require('discord.js');

module.exports.run = async(bot,message,args)=>{

    const categoryID = config.TicketGroup;

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply("You are not allowed to do this.");

    if(message.channel.parentID == categoryID){
        message.channel.delete();

        //Create embed.
        var embedCreateTicket = new Discord.MessageEmbed()
        .setTitle("Ticket," +message.channel.name)
        .setDescription("The ticket has been resolved")
        .setFooter("Ticket resolved");

        // channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.id == config.TicketLogChannel);
        if (!ticketChannel) return message.reply("Channel doesnt exist");

        ticketChannel.send(embedCreateTicket);
    } else{
        message.channel.send("Please execute this command.");

    }
}

module.exports.help = {
    name: "ticket-close",
    description: "This ticket is used by admins to close tickets.",
    usage: "!ticket-close"
}