import React, { Component } from 'react'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import className from "classnames";
import { Link } from "react-router-dom";
import { FaMedal } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import Chart from "react-apexcharts";

const MATCH_DETAIL_QUERY = gql`
  query MatchQuery($gameId: String!) {
    match(gameId: $gameId) {
      basicGameData {
        vTeam {
          triCode
        }
        hTeam {
          triCode
        }
      }
      stats {
        vTeam {
          biggestLead
          pointsOffTurnovers
          totals {
            points
            fgm
            fga
            fgp
            ftm
            fta
            ftp
            tpm
            tpa
            tpp
            offReb
            defReb
            assists
            pFouls
            steals
            turnovers
            blocks
          }
          leaders {
            rebounds {
              value
              players {
                firstName
                lastName
              }
            }
            assists {
              value
              players {
                firstName
                lastName
              }
            }
            points {
              value
              players {
                firstName
                lastName
              }
            }
          }
        }
        hTeam {
          biggestLead
          pointsOffTurnovers
          totals {
            points
            fgm
            fga
            fgp
            ftm
            fta
            ftp
            tpm
            tpa
            tpp
            offReb
            defReb
            assists
            pFouls
            steals
            turnovers
            blocks
          }
          leaders {
            rebounds {
              value
              players {
                firstName
                lastName
              }
            }
            assists {
              value
              players {
                firstName
                lastName
              }
            }
            points {
              value
              players {
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  }
`;


function TakeMatch({gameId: gameId}) {
  const { loading, error, data } = useQuery(MATCH_DETAIL_QUERY, {
    variables: { gameId: gameId }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  // console.log(data.match.stats.vTeam.leaders.rebounds);
  const{biggestLead,pointsOffTurnovers}=data.match.stats.vTeam
  const { triCode } = data.match.basicGameData.vTeam;
  const { points } = data.match.stats.vTeam.totals;
  const { firstName, lastName } = data.match.stats.vTeam.leaders.points.players[0];
  const { value } = data.match.stats.vTeam.leaders.points;
  const valueR = data.match.stats.vTeam.leaders.rebounds.value;
  const valueP = data.match.stats.vTeam.leaders.assists.value;
  const firstNameR = data.match.stats.vTeam.leaders.rebounds.players[0].firstName;
  const lastNameR = data.match.stats.vTeam.leaders.rebounds.players[0].lastName;
  const firstNameP = data.match.stats.vTeam.leaders.assists.players[0].firstName;
  const lastNameP = data.match.stats.vTeam.leaders.assists.players[0].lastName;
  const URLV = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${triCode.toLowerCase()}.png`;
  const URLH = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${data.match.basicGameData.hTeam.triCode.toLowerCase()}.png`;
  // console.log(URLV);

    // console.log(points);
    if(points>data.match.stats.hTeam.totals.points){
    return (
      <div>
        <h1 className="display-4 my-3">
          <img src={URLV} alt="" style={{ width: 70 }} />
          {triCode} <strong>VS</strong> {data.match.basicGameData.hTeam.triCode}
          <img src={URLH} alt="" style={{ width: 70 }} />
        </h1>
        <h4 className="mb-3">Match Score</h4>
        <ul className="list-group">
          <div className="d-flex justify-content-around">
            <h2 className="text-success">{points}</h2>
            <h4 className="text-danger">
              {data.match.stats.hTeam.totals.points}
            </h4>
          </div>
          <li className="list-group-item mt-1">
            <FaMedal style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs marqueurs pour{" "}
            <img src={URLV} alt="" style={{ width: 55 }} /> {firstName}{" "}
            {lastName} avec {value}
            pts
          </li>
          <li className="list-group-item mt-1">
            <FaMedal style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs marqueurs pour{" "}
            <img src={URLH} alt="" style={{ width: 55 }} />
            {data.match.stats.hTeam.leaders.points.players[0].firstName}{" "}
            {data.match.stats.hTeam.leaders.points.players[0].lastName} avec{" "}
            {data.match.stats.hTeam.leaders.points.value} pts
          </li>
          <li className="list-group-item mt-1">
            <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs rebondeur pour{" "}
            <img src={URLV} alt="" style={{ width: 55 }} /> {firstNameR}{" "}
            {lastNameR} avec {valueR} rbds
          </li>
          <li className="list-group-item mt-1">
            <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs rebondeur pour{" "}
            <img src={URLH} alt="" style={{ width: 55 }} />
            {data.match.stats.hTeam.leaders.rebounds.players[0].firstName}{" "}
            {data.match.stats.hTeam.leaders.rebounds.players[0].lastName} avec{" "}
            {data.match.stats.hTeam.leaders.rebounds.value} rbds
          </li>
          <li className="list-group-item mt-1">
            <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs passeur pour{" "}
            <img src={URLV} alt="" style={{ width: 55 }} /> {firstNameP}{" "}
            {lastNameP} avec {valueP} asst
          </li>
          <li className="list-group-item mt-1">
            <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs passeur pour{" "}
            <img src={URLH} alt="" style={{ width: 55 }} /> {" "}
            {data.match.stats.hTeam.leaders.assists.players[0].firstName}{" "}
            {data.match.stats.hTeam.leaders.assists.players[0].lastName} avec{" "}
            {data.match.stats.hTeam.leaders.assists.value} asst
          </li>
        </ul>
        <Link to="/" className="btn btn-primary mt-3 mb-3">
          Back
        </Link>
      </div>
    );} else {
      return (
        <div>
          <h1 className="display-4 my-3">
            <img src={URLV} alt="" style={{ width: 70 }} />
            {triCode} <strong>VS</strong>{" "}
            {data.match.basicGameData.hTeam.triCode}
            <img src={URLH} alt="" style={{ width: 70 }} />
          </h1>
          <h4 className="mb-3">Match Score</h4>
          <ul className="list-group">
            <div className="d-flex justify-content-around">
              <h4 className="text-danger">{points}</h4>
              <h2 className="text-success">
                {data.match.stats.hTeam.totals.points}
              </h2>
            </div>
            <li className="list-group-item mt-1">
              <FaMedal style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs marqueurs pour{" "}
              <img src={URLV} alt="" style={{ width: 55 }} /> {" "}
              {firstName} {lastName} avec {value}
              pts
            </li>
            <li className="list-group-item mt-1">
              <FaMedal style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs marqueurs pour{" "}
              <img src={URLH} alt="" style={{ width: 55 }} />
              {data.match.stats.hTeam.leaders.points.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.points.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.points.value} pts
            </li>
            <li className="list-group-item mt-1">
              <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs rebondeur pour{" "}
              <img src={URLV} alt="" style={{ width: 55 }} /> {" "}
              {firstNameR} {lastNameR} avec {valueR} rbds
            </li>
            <li className="list-group-item mt-1">
              <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs rebondeur pour{" "}
              <img src={URLH} alt="" style={{ width: 55 }} /> {" "}
              {data.match.stats.hTeam.leaders.rebounds.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.rebounds.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.rebounds.value} rbds
            </li>
            <li className="list-group-item mt-1">
              <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs passeur pour{" "}
              <img src={URLV} alt="" style={{ width: 55 }} /> {firstNameP}{" "}
              {lastNameP} avec {valueP} asst
            </li>
            <li className="list-group-item mt-1">
              <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs passeur pour{" "}
              <img src={URLH} alt="" style={{ width: 55 }} /> {" "}
              {data.match.stats.hTeam.leaders.assists.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.assists.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.assists.value} asst
            </li>
          </ul>
          <Link to="/" className="btn btn-primary mt-3 mb-3">
            Back
          </Link>
        </div>
      );
    }
}
function UpdatePourcentageFieldsV({ gameId: gameId }) {
  // console.log(gameId);
  const { loading, error, data } = useQuery(MATCH_DETAIL_QUERY, {
    variables: { gameId: gameId }
  });
    if (loading) return null;
    if (error) return `Error! ${error}`;
        const options = {
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -20,
                  show: true,
                  color: "#888",
                  fontSize: "13px"
                },
                value: {
                  formatter: function(val) {
                    return val;
                  },
                  color: "#111",
                  fontSize: "30px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#ABE5A1"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: "round"
          },
          labels: ["Percent field"]
        };
  let name = data.match.basicGameData.vTeam.triCode
  let pourcentage = data.match.stats.vTeam.totals.fgp
  pourcentage = parseInt(pourcentage);
  const series = [pourcentage];
  const URLV = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${name.toLowerCase()}.png`;
  // console.log(data);
    return (
      <div className="graph">
        <img src={URLV} alt="" style={{width:90, textAlign:'center', marginLeft:'60px'}}/>
        <Chart options={options} series={series} type="radialBar" width="220" />
      </div>
    );
  //  this.setState({ seriesRadial: [pourcentage] });
}
function UpdatePourcentageFieldsH({ gameId: gameId }) {
  // console.log(gameId);
  const { loading, error, data } = useQuery(MATCH_DETAIL_QUERY, {
    variables: { gameId: gameId }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            formatter: function(val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Percent field"]
  };
  let name = data.match.basicGameData.hTeam.triCode;
  let pourcentage = data.match.stats.hTeam.totals.fgp;
  pourcentage = parseInt(pourcentage);
  const series = [pourcentage];
  const URLH = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${name.toLowerCase()}.png`;
  // console.log(data);
  return (
    <div>
      <img src={URLH} alt="" style={{ width: 90, textAlign: "center", marginLeft:'60px' }} />
      <Chart options={options} series={series} type="radialBar" width="220" />
    </div>
  );
  //  this.setState({ seriesRadial: [pourcentage] });
}
function UpdatePourcentage3pV({ gameId: gameId }) {
  // console.log(gameId);
  const { loading, error, data } = useQuery(MATCH_DETAIL_QUERY, {
    variables: { gameId: gameId }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            formatter: function(val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["3p field"]
  };
  console.log(data.match.stats);

  let name = data.match.basicGameData.vTeam.triCode;
  let three_attempt = data.match.stats.vTeam.totals.tpa;
  let three_marque = data.match.stats.vTeam.totals.tpm;
  three_attempt = parseInt(three_attempt);
  three_marque = parseInt(three_marque);
  let pourcentage = (three_marque / three_attempt)*100
  pourcentage = Math.round(pourcentage)
  // console.log(pourcentage)
  const series = [pourcentage];
  return (
    <div>
      <Chart options={options} series={series} type="radialBar" width="220" />
    </div>
  );
}

function UpdatePourcentage3pH({ gameId: gameId }) {
  // console.log(gameId);
  const { loading, error, data } = useQuery(MATCH_DETAIL_QUERY, {
    variables: { gameId: gameId }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            formatter: function(val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["3p field"]
  };
  let name = data.match.basicGameData.hTeam.triCode;
  let three_attempt = data.match.stats.hTeam.totals.tpa;
  let three_marque = data.match.stats.hTeam.totals.tpm;
  three_attempt = parseInt(three_attempt);
  three_marque = parseInt(three_marque);
  let pourcentage = (three_marque / three_attempt) * 100;
  pourcentage = Math.round(pourcentage);
  // console.log(pourcentage);
  const series = [pourcentage];
  return (
    <div>
      <Chart options={options} series={series} type="radialBar" width="220" />
    </div>
  );
}



export class MatchDetail extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }




  render() {
    const gameId = this.props.match.params.gameId;
    return (
      <div>
        <div className="col radial-chart d-flex justify-content-center">
          <UpdatePourcentageFieldsV gameId={gameId} />
          <UpdatePourcentageFieldsH gameId={gameId} />
        </div>
        <div className="col radial-chart d-flex justify-content-center">
          <UpdatePourcentage3pV gameId={gameId} />
          <UpdatePourcentage3pH gameId={gameId} />
        </div>
        <div className="row">
          <div className="col">
            <TakeMatch gameId={gameId} />
          </div>
          <div className="col">
            <h1>Coucou</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchDetail
