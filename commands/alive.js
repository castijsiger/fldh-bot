module.exports.run = async(bot,msg,args) => {
    msg.channel.send("Yes im alive what about you :D?");
}

module.exports.help = {
    name: "alive",
    description: "This is a test to see if the discord bot is up and running.",
    usage: "!alive"
}