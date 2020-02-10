const axios = require("axios");


function formattedDate(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate() - 1);
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return (`${year}${month}${day}`);
}

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const NumGamesType = new GraphQLObjectType({
  name: "Matchs",
  fields: () => ({
    gameId: { type: GraphQLString },
    vTeam: { type: vTeamType },
    hTeam: { type: hTeamType }
  })
});

const vTeamType = new GraphQLObjectType({
  name: "vTeam",
  fields: () => ({
    triCode: { type: GraphQLString },
    score: { type: GraphQLString }
  })
});

const hTeamType = new GraphQLObjectType({
  name: "hTeam",
  fields: () => ({
    triCode: { type: GraphQLString },
    score: { type: GraphQLString }
  })
});

//Stats

const detailType = new GraphQLObjectType({
  name: "detail",
  fields: () => ({
    basicGameData: { type: gameStatType },
    stats: { type: statType }
  })
});

const gameStatType = new GraphQLObjectType({
  name: "InfoGame",
  fields: () => ({
    vTeam: { type: infoVteamType },
    hTeam: { type: infoHteamType }
  })
});

const infoVteamType = new GraphQLObjectType({
  name: "InfoVisitor",
  fields: () => ({
    triCode: { type: GraphQLString },
  })
});

const infoHteamType = new GraphQLObjectType({
  name: "InfoHost",
  fields: () => ({
    triCode: { type: GraphQLString },
  })
});


const statType = new GraphQLObjectType({
  name: "stat",
  fields: () => ({
    vTeam: { type: vTeamstatType },
    hTeam: { type: hTeamstatType },
    activePlayers: { type: new GraphQLList(activePlayersType) }
  })
});

const activePlayersType = new GraphQLObjectType({
  name: "activePlayersArray",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    points: { type: GraphQLString },
    min: { type: GraphQLString },
    min: { type: GraphQLString },
    fgm: { type: GraphQLString },
    fgp: { type: GraphQLString },
    fga: { type: GraphQLString },
    ftm: { type: GraphQLString },
    fta: { type: GraphQLString },
    ftp: { type: GraphQLString },
    tpm: { type: GraphQLString },
    tpa: { type: GraphQLString },
    tpp: { type: GraphQLString },
    totReb: { type: GraphQLString },
    assists: { type: GraphQLString },
    pFouls: { type: GraphQLString },
    steals: { type: GraphQLString },
    turnovers: { type: GraphQLString },
    blocks: { type: GraphQLString },
    turnovers: { type: GraphQLString }
  })
});

const vTeamstatType = new GraphQLObjectType({
  name: "vTeamstat",
  fields: () => ({
    biggestLead: { type: GraphQLString },
    pointsOffTurnovers: { type: GraphQLString },
    totals: { type: totalsType },
    leaders: { type: leadersType }
  })
});

const hTeamstatType = new GraphQLObjectType({
  name: "hTeamstat",
  fields: () => ({
    biggestLead: { type: GraphQLString },
    pointsOffTurnovers: { type: GraphQLString },
    totals: { type: totalsType },
    leaders: { type: leadersType }
  })
});

const leadersType = new GraphQLObjectType({
  name: "leaderStat",
  fields: () => ({
    points: { type: pointsLeaderType },
    rebounds: { type: reboundsLeaderType },
    assists: { type: assistsLeaderType }
  })
});

const pointsLeaderType = new GraphQLObjectType({
  name: "leaderPoint",
  fields: () => ({
    value: { type: GraphQLString },
    players: { type: new GraphQLList(LeaderPlayerType) }
  })
});

const reboundsLeaderType = new GraphQLObjectType({
  name: "leaderRebounds",
  fields: () => ({
    value: { type: GraphQLString },
    players: { type: new GraphQLList(LeaderPlayerType) }
  })
});

const assistsLeaderType = new GraphQLObjectType({
  name: "leaderAssist",
  fields: () => ({
    value: { type: GraphQLString },
    players: { type: new GraphQLList(LeaderPlayerType) }
  })
});

const LeaderPlayerType = new GraphQLObjectType({
  name: "PlayerLeaderPointDetail",
  fields: () => ({
    personId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
});



const totalsType = new GraphQLObjectType({
  name: "totals",
  fields: () => ({
    points: { type: GraphQLString },
    fgm: { type: GraphQLString },
    fga: { type: GraphQLString },
    fgp: { type: GraphQLString },
    ftm: { type: GraphQLString },
    fta: { type: GraphQLString },
    ftp: { type: GraphQLString },
    tpm: { type: GraphQLString },
    tpa: { type: GraphQLString },
    tpp: { type: GraphQLString },
    offReb: { type: GraphQLString },
    defReb: { type: GraphQLString },
    assists: { type: GraphQLString },
    pFouls: { type: GraphQLString },
    steals: { type: GraphQLString },
    turnovers: { type: GraphQLString },
    blocks: { type: GraphQLString },
  })
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    matchs: {
      type: new GraphQLList(NumGamesType),
      resolve(parentValue, args) {
        return axios
          .get(
            `http://data.nba.net/10s/prod/v1/${formattedDate()}/scoreboard.json`
          )
          .then(response => response.data.games);
      }
    },
    match: {
      type: detailType,
      args: {
        gameId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .get(
            `http://data.nba.net/10s/prod/v1/${formattedDate()}/${
            args.gameId
            }_boxscore.json`
          )
          .then(response => response.data);
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});

