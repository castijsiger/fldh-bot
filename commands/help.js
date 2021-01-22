module.exports.run = async(bot,msg,args) => {
    var helpMessage = `Hey! I see you have found the help command :)!

Those are the commands you will be able to use:

**!coin-flip** -> Flips a coin (tails or head).
**!random-map** -> Chooses a random map. You can exclude maps like so: !random-map Factory, Woods.
**!russian-roulette** -> Chooses a random member on the server to die. MUahahahha
**!alive** -> Pings the server check if its up and running.`
    msg.author.sendMessage(helpMessage);
}

module.exports.help = {
    name: "help"
}