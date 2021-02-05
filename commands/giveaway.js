const discord = require("discord.js");

module.exports.run = async(bot,message,args)=>{

    console.log("command is run :D")
    //!giveaway aantalSpelers tijd berichtjeTekst test test


    var item = "";
    var time;
    var winnerCount;

    
    if(!message.member.guild.roles.cache.find(role => role.name === "Giveaways")) return message.reply("You dont have the giveaways permission.");
 
    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(" ");

    if (!winnerCount) return message.reply("Didnt define the amount of winners");
    if (!time) return message.reply("Didn't define the duration of the giveaway");
    if (!item) return message.reply("Didn't define what you wer giving away");
 	
    const stated_duration_hours = message.content.split(' ')[1];
    const stated_duration_hours2 = stated_duration_hours.toLowerCase();
    if (stated_duration_hours2.includes('s')) {
        var time1 = 's';
    }
    if (stated_duration_hours2.includes('m')) {
        var time1 = 'm';
    }
    if (stated_duration_hours2.includes('h')) {
        var time1 = 'h';
    }
    if (stated_duration_hours2.includes('d')) {
        var time1 = 'd';
    }
    const stated_duration_hours3 = stated_duration_hours2.replace(time1, '');
    if (stated_duration_hours3 === '0') {
        message.channel.send('The duration has to be atleast one.');
    }
    if (isNaN(stated_duration_hours3)) {
        message.channel.send('The duration has to be a valid time variable.');
    }
    if (stated_duration_hours3 > 1) {
        var time3 = 's';
    }
    if (time === 's') {
        var actual_duration_hours = stated_duration_hours3 * 1000;
        var time2 = 'second';
    }
    if (time === 'm') {
        var actual_duration_hours = stated_duration_hours3 * 60000;
        var time2 = 'minute';
    }
    if (time === 'h') {
        var actual_duration_hours = stated_duration_hours3 * 3600000;
        var time2 = 'hour';
    }
    if (time === 'd') {
        var actual_duration_hours = stated_duration_hours3 * 86400000;
        var time2 = 'day';
    }	

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time *3600000));


    var giveawayEmbed = new discord.MessageEmbed()
        .setTitle("❤🎉❤ **GIVEAWAY** ❤🎉❤")
        .addField("Item",item)
        .addField("Hosted by:",message.author)
        .setDescription(`React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`)        
        .setTimestamp(dateEnd)
        .setFooter('Ends at');
        
        
    
    
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function () {

            var random = 0;
            var winners = [];
            var inList = false;

            var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

            for (let i = 0; i < peopleReacted.length; i++) {

                if(peopleReacted[i].id == bot.user.id){
                    peopleReacted.splice(i,1);
                    continue;
                }
                
                
            }

        if (peopleReacted.length == 0) {

            return message.channel.send("Nobody has participated in the giveaway.");
        }


        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random()* peopleReacted.length);

            for (let o = 0; o< winners.length; o++) {
                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
                
            }
            
            if(!inList){
                winners.push(peopleReacted[random]);
            }
            
        }

        for (let y = 0; y < winners.length; y++) {
            
            message.channel.send(`Congratulations: ${winners[y]} you have ${item} won from ${message.author}!`);
            
        }

    }, time *3600000)


}


module.exports.help = {
    name: "Giveaway",
    description: "Start a giveaway",
    usage: "!gstart"
}