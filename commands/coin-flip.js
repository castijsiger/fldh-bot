module.exports.run = async(bot,msg,args) => {
    msg.channel.send(Math.round(Math.random()) == 1 ? "Head" : "Tails");
}

module.exports.help = {
    name: "coin-flip",
    description: "Flips a coin. Head or tails?",
    usage: "!coin-flip"
}