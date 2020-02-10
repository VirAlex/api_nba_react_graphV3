import gql from "graphql-tag";


export default gql`
{
    matchs {
      gameId
        vTeam{
          triCode,
          score
        }
        hTeam{
          triCode,
          score
        }
    }
  }
`;
