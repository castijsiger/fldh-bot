const fs = require('fs');

module.exports.run = async(bot,msg,args, client) => {
    var tournamentMessage = `Tournament :O`;

    console.log(args);
    switch(args[0]){
        case "start":
            var tournamentName = args[1];
            let tournamentStartTime = args[2];
            let tournamentDuration = args[3];

            var object = {
                name: tournamentName,
                startTime: tournamentStartTime,
                duration: tournamentDuration,
                started: false
            }; 
            
            

            client.db().collection('tournament').insertOne(object);

            //days
            console.log(tournamentStartTime);
            console.log(tournamentDuration);
            msg.channel.send(`Tournament wil start in ${tournamentStartTime}`);
            var durationTillStart = this.getDuration(tournamentStartTime);
            var durationTournament = this.getDuration(tournamentDuration);
            console.log(durationTillStart);
            console.log(durationTournament);

            //start timeout
            setTimeout(()=>{
                msg.channel.send(`Tournament has begon!`);
                client.db().collection('tournament').updateOne({name: tournamentName}, {$set:  {started: true}});

                setTimeout(() => {
                    client.db().collection("tournament_participants").find({name: tournamentName}).sort({points:-1}).toArray(function(err, result){    
                        if(err) throw err;

                        console.log(`Top: ${result} `);
                        msg.channel.send(`Tournament ended, ${result[0].username} has won the tournament!`);
                    });
                   
                },tournamentDuration * 1000);
                
            }, durationTillStart * 1000);
            break;
        case "join":
            var tournamentName = args[1];
            var object = {
                name: tournamentName,
                username: msg.author.username,
                points: 0
            }; 
            
            client.db().collection('tournament_participants').insertOne(object);
            msg.channel.send(`${msg.author.username} has joined ${tournamentName}`);
            break;
        case "points":
            client.db().collection('tournament_participants').findOne({name: args[1], username: msg.author.username}, function(err, result) {
                if (err) throw err;
                
                console.log(`result points`, result);
                pointsUpdated = parseInt(result.points) + parseInt(args[2]);
                client.db().collection('tournament_participants').updateOne({username: msg.author.username, name: args[1]}, {$set:  {points: pointsUpdated}});
                msg.channel.send(`${msg.author.username} has added ${args[2]} points`)
            });
           
            break;
    }
}

module.exports.getDuration = (str) => {
    if(str.indexOf("d") > 0){
        console.log("d found.");
        var returnValue = str.substr(0,str.indexOf("d")) * 60 * 60 * 24;
    }
    //hours
    else if(str.indexOf("h") > 0){
        console.log("h found.");
        var returnValue = str.substr(0, str.indexOf("h")) * 60 * 60;
    }
    //minutes
    else if(str.indexOf("m") > 0){
        console.log("m found.");
        var returnValue = str.substr(0, str.indexOf("m")) * 60;
    }
    //seconds
    else{
        console.log(duration);
        var returnValue = str;
    }
    return returnValue;
}


module.exports.help = {
    name: "tournament",
    description: "List all commands :)",
    usage: "!tournament"
}