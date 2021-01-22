module.exports.run = async(bot,msg,args) => {
    msg.channel.send("Lets see whose gonna die.")
    const list = bot.guilds.get("706146210876096645");

    setTimeout(() => {
    msg.channel.send("1...")
    }, 1000);

    setTimeout(() => {
    msg.channel.send("2...")
    }, 2000);

    setTimeout(() => {
    msg.channel.send("3...")
    }, 3000);

    setTimeout(()=> {
    //msg.channel.send(`${list.members.random().nickname} haha you're dead :D`);
    let members = Array.from(list.members);
    let randomMember = members[Math.floor(Math.random() * members.length)];
    msg.channel.send(`Hihihihi ${randomMember[1].user.username} you're dead :D piew piew.`);

    }, 4000)
}

module.exports.help = {
    name: "russian-roulette"
}