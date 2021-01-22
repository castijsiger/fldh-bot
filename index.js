require('dotenv').config();
const Discord = require('discord.js');
const {MongoClient} = require('mongodb');
const config = require('./config.json');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bllyu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

bot.login(TOKEN);

bot.on('ready', () => {
  client.connect();
  console.info(`Logged in as ${bot.user.tag}!`);
}); 

bot.on('voiceStateUpdate', (oldState, newState) => {
  let ranks = config.Ranks;
  let userRank =  ranks.find(r => r.name == newState.highestRole.name);
  const userLogsChannel = bot.channels.find(c => c.id == config.UserLogsChannel);
  const congratulationChannel = bot.channels.find(c => c.id == config.CongratulationsChannel);

  if(oldState.speaking !== newState.speaking){
    console.log(`Attribute speaking changed`);
  }
  else if(oldState.mute !== newState.mute){
    console.log(`muting changed`);
  }
  else if(oldState.selfDeaf !== newState.selfDeaf){
    console.log('self deaf changed');
  }
  else if(oldState.selfMute !== newState.selfMute){
    console.log('self mute changed');
  }
  else if(oldState.serverDeaf !== newState.serverDeaf){
    console.log('server deafened')
  }
  else if(oldState.serverMute !== newState.serverMute){
    console.log('server muted')
  }
  else if(oldState.speaking !== newState.speaking){
    console.log('speaking changed')
  }
  else{
    //find user
    client.db().collection('member_activity').find({name: newState.user.id}).toArray(function(err, result){
      console.log(newState.user);
      if(err) throw err;
      if(result.length > 0){
        const newCount = result[0].channelsJoined + 1;
        
        ranks.forEach(rank => {
          if(rank.channelsJoined){
            if(rank.channelsJoined < newCount){
              //if the rank you would get is higher than what you are now give rank :D
              if(rank.level > userRank.level){
                newState.addRole(newState.guild.roles.find(role => role.name === rank.name));
                newState.removeRole(newState.guild.roles.find(role => role.name === userRank.name));
                congratulationChannel.send(`${newState.nickname} has achieved the role of ${rank.name}!!! CONGRATULATIONSSS!! :) `);
                userLogsChannel.send(`${newState.nickname} has achieved the role of ${rank.name} by joining ${rank.channelsJoined}!!!`);
              }
            }
          }
        })

        console.log(`${newState.user.username} has joined ${result[0].channelsJoined} amount of channels`);
        client.db().collection('member_activity').updateOne({name: newState.user.id}, {$set:  {channelsJoined: newCount, username: newState.user.username}});
      }
      else{
        const object = {
          name:newState.user.id, 
          channelsJoined: 1,
          username: newState.user.username
        };
        console.log(`${newState.user.username} has joined his first channel whoep whoep`);
        userLogsChannel.send(`${newState.user.username} has joined his first channel whoep whoep`);
        client.db().collection('member_activity').insertOne(object);
      }
    });
    console.log(`${newState.user.username} joined the channel cause all above has failed.`);
  }
});

bot.on('message', msg => {
  
  if(msg.content.startsWith('!random-map')){
    let message = msg.toString();
    console.log(`message = ${message}`);
    let params = message.split(" ");
    let maps = ["Woods","Reserve","Interchange","Customs","Factory","Shoreline","Labs"];

    if(params[1]){
      let excludedMaps = params[1].split(",");
      msg.channel.send(`Maps excluded : ${excludedMaps}`);

      excludedMaps.forEach((map) => {
        var index = maps.indexOf(map);
        if (index !== -1) {
          maps.splice(index, 1);
        
        }
        else{
          msg.channel.send(`Make sure your write all maps that you want to include with a capital and correctly. Options: Woods, Reserve, Interchange, Customs, Factory, Shoreline, Labs`);
        }
      })
    }
   
  
    msg.channel.send(maps[Math.floor(Math.random() * maps.length)]);
    
  }

  if(msg.content.startsWith('!russian-roulette')){
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

  if(msg.content.startsWith('!alive')){
    msg.channel.send("Yes im alive what about you :D?");
  }

  if(msg.content.startsWith('!permission-check')){
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
});

bot.on('guildMemberUpdate', (oldMember, newMember) =>{
  //load in all ranks
  const ranks = config.Ranks;

  //select the properties of the users highest rank.
  const rank = ranks.find(r => r.name == newMember.highestRole.name);
  console.log(`gevonden rank ${rank.name}`);

  const userLogsChannel = bot.channels.find(c => c.id == config.UserLogsChannel);

 

  //if name has been changed.
  if(oldMember.nickname !== newMember.nickname){
    //get the role we want to change someone into after namechange.
    var roleAfterNameChange = newMember.guild.roles.find(role => role.name === config.RankAfterNameChange);
    var startRole = newMember.guild.roles.find(role => role.name === config.DefaultRole);

    //get the rank from the config
    var rankAfterNameChangeFromConfig = ranks.find(r => r.name === config.RankAfterNameChange);

    //the regex we want ito change people into.
    var regex = /\([a-zA-Z]+\) [a-zA-Z0-9]+/;
    
    //if the new nickname fits the regex
    if(regex.test(newMember.nickname)){
      //if the rank after name change is higher than your current level.
      console.log(`${rankAfterNameChangeFromConfig.level} rank : ${rank.level}`);
      if(rankAfterNameChangeFromConfig.level > rank.level){
        //send a message to the channel :)
        userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname} and has now received the ${rankAfterNameChangeFromConfig.name} role.`);
        newMember.addRole(roleAfterNameChange);
        newMember.removeRole(startRole);
      }
      else{
        //only write that someone has changed his/her name :)
        userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname}, no change to the roles has occured. He already was ${rankAfterNameChangeFromConfig.name}`);
      }
    }
    //nickname doesnt fit the policies
    else{
      //check if you could lose your rank
      if(rankAfterNameChangeFromConfig.level <= rank.level){
        userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname} and has now lost the ${rankAfterNameChangeFromConfig.name} role. Changed his name to something thats not valid.`)
        //send message someone is probably failing.     
        newMember.addRole(startRole);
        newMember.removeRole(roleAfterNameChange);
      }
      else{
        //send message someone is probably failing
        userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname}, seems that he made a mistake and is still lower than ${rankAfterNameChangeFromConfig.name} .`)
      }
    }
  }
  
  //get the give away role from ranks config
  var giveawayRoleFrom = ranks.find(r => r.name == config.GiveawayFrom);

  //get role givewaways on user
  var giveAwayRoleOnMember = newMember.roles.find(r => r.name =="Giveaways");

  var giveawayRole = newMember.guild.roles.find(role => role.name === "Giveaways");
  //if someone doesnt have the give away role yet
  if(!giveAwayRoleOnMember){
    if(rank.level >= giveawayRoleFrom.level){
      newMember.addRole(giveawayRole);
      userLogsChannel.send(`${newMember.nickname} has received the giveaway role.`);
    }
  }
})

bot.on("guildMemberAdd", function(member){
  console.log(`a user joins a guild: ${member.tag}`);
});