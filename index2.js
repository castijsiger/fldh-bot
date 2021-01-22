const discord = require("discord.js");

module.exports.run = async(bot,message,args)=>{

/// random woods, customs, factory, factory, interchange, shoreline

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

var options = ["woods","customs","factory","interchange","labs","shoreline"];

console.log(args);

args.forEach((map) => {
    var index = options.indexOf(map.toLowerCase());
    if(index != -1){
        options.splice(index, 1);
    }
    else{
        //stuur terug dat je verkeerd gespeld hebt :frowning:
    }
});

    var result = options[Math.floor(Math.random()*options.length)];

    if (result == "woods"){

        return message.channel.send(Lekker in de bossen. Je hebt ${capitalize(result)}!);

    } else if (result == "customs"){

        return message.channel.send(Leuk DORMS!! Je hebt ${capitalize(result)} gekozen!);


    } else if (result == "factory"){

        return message.channel.send(Geen werknemers in het brabantse fabriek! Schietze op ${capitalize(result)}!);


    } else if (result == "interchange"){

        return message.channel.send(Graphic card nodig?! Zoek ze op ${capitalize(result)}!);

    } else if (result == "labs"){

        return message.channel.send(Hackers nodig! Je vind ze op ${capitalize(result)}!);

    } else if (result == "shoreline"){

        return message.channel.send(Even chillen op resort! Bedjes liggen klaar op ${capitalize(result)}!);


    }


}