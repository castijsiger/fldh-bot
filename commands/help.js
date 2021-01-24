const fs = require('fs');

module.exports.run = async(bot,msg,args) => {
    var helpMessage = `**Welcome**
Welcome to the help page of our discord!! 
    
I see you have found the help command

**Commands**
**| Usage | Description **
| ------- | ------------- 
`;
    fs.readdir("./commands", (err, files) => {
        if (err) console.log(err);
    
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
    
        if (jsFiles.length <= 0) {
            console.log("Kon geen files vinden!");
            return;
        }
    
        jsFiles.forEach((f,i)=>{
            console.log(" ik loop weer :)")
            var fileGet = require(`./${f}`);
       
            helpMessage = helpMessage.concat(`| **${fileGet.help.usage}** | ${fileGet.help.description}  \r\n`)
            console.log(helpMessage);
        })

        msg.author.send(helpMessage);
    });
}



module.exports.help = {
    name: "help",
    description: "List all commands :)",
    usage: "!ticket-open"
}