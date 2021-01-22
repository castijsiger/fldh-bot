module.exports.run = async(bot,msg,args) => {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    console.log(`message = ${msg}`);
    let maps = ["woods","reserve","interchange","customs","factory","shoreline","labs"];
    
    args.forEach((map) => {
        var index = maps.indexOf(map.toLowerCase());
        if(index != -1){
            maps.splice(index, 1);
        }
        else{
            //stuur terug dat je verkeerd gespeld hebt :frowning:
        }
    });
    
    let chosenMap = maps[Math.floor(Math.random() * maps.length)]

    switch(chosenMap){
        case "woods":
            return msg.channel.send(`A nice walk through the woods. I have chosen ${capitalize(chosenMap)} !`);
        case "customs":
            return msg.channel.send(`Nice DORMS!! I have chosen ${capitalize(chosenMap)}!`);
        case "factory":
            return msg.channel.send(`No employees in the German factory, shoot them all at ${capitalize(chosenMap)}!`);
        case "interchange":
            return msg.channel.send(`Need a Graphics card? A tetris perhaps?! Go find them on ${capitalize(chosenMap)}!`);
        case "labs":
            return msg.channel.send(`Wanna get killed by angry 12 year olds, that needs a third party program to win? You can find them on ${capitalize(chosenMap)}!`);
        case "shoreline":
            return msg.channel.send(`Chilling in the resort? Laying down on the beds. Lets go sleep at ${capitalize(chosenMap)}!`);
    }
}

module.exports.help = {
    name: "random-map"
}