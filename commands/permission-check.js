module.exports.run = async(bot,msg,args) => {
    var allowedToRunCommand= ['Chief Admin'];
    console.log(msg.member.highestRole);
    if(msg.member.highestRole.name !== "Chief Admin" && msg.member.highestRole.name !== "Kolonel - Senior Admin"){
        msg.channel.send("You dont have permissions to run this command");
    }
    else{
        msg.channel.send("I'll start looping through the members now... :)");
        const list = bot.guilds.get("706146210876096645");
        var giveawayRole = bot.guilds.get("706146210876096645").roles.find(role => role.name === "Giveaways");

        list.members.forEach(member => {
        var allowedGiveaways = ['Kolonel - Senior Admin','Chief Admin','Sherpa','Luitenant','Sergeant','Korporaal'];
        allowedGiveaways.forEach(value => {
            if(member.highestRole.name === value){
            found = true;
            msg.channel.send(`Added perm giveaways to ${member.nickname}`);
            member.addRole(giveawayRole).then((response)=>{
                console.log(response)
            }).catch(e => {
                console.log(e)
            });
            }

        })

        if(!found){
            msg.channel.send(`Removed perm giveaways from ${member.nickname}`);
            member.removeRole(giveawayRole)
        }
        })

        msg.channel.send("I'm done checking permissions. :)");
    }
}

module.exports.help = {
    name: "permission-check"
}