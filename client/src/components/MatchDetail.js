import React, { Component } from 'react'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import className from "classnames";
import { Link } from "react-router-dom";
import { FaMedal } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import Chart from "react-apexcharts";
import TTFL from '../ttfl.png'

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
        activePlayers{
    firstName
    lastName
    points
    min
    min
    fgm
    fgp
    fga
    ftm
    fta
    ftp
    tpm
    tpa
    tpp
    totReb
    assists
    pFouls
    steals
    turnovers
    blocks
    turnovers
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
  // calculs TTFL
  const arrrayTtfl = data.match.stats.activePlayers;
  let firstByPoint = arrrayTtfl.find(o => o.lastName === lastName);
  let firstByRebound = arrrayTtfl.find(o => o.lastName === lastNameR);
  let firstByAssists = arrrayTtfl.find(o => o.lastName === lastNameP);
  let firstByPointH = arrrayTtfl.find(
    o =>
      o.lastName === data.match.stats.hTeam.leaders.points.players[0].lastName
  );
  let firstByReboundH = arrrayTtfl.find(
    o =>
      o.lastName === data.match.stats.hTeam.leaders.rebounds.players[0].lastName
  );
  let firstByAssistsH = arrrayTtfl.find(
    o =>
      o.lastName ===
      data.match.stats.hTeam.leaders.assists.players[0].lastName
  );


  const sortTtflByPointsV= () => {
  let arrayByPointsBonus =
    parseInt(firstByPoint.points) +
    parseInt(firstByPoint.totReb) +
    parseInt(firstByPoint.assists) +
    parseInt(firstByPoint.steals) +
    parseInt(firstByPoint.blocks) +
    parseInt(firstByPoint.fgm) +
    parseInt(firstByPoint.tpm) +
    parseInt(firstByPoint.ftm);
  let arrayByPointsMalus =
    parseInt(firstByPoint.turnovers) +
    parseInt(firstByPoint.fga - firstByPoint.fgm) +
    parseInt(firstByPoint.tpa - firstByPoint.tpm) +
    parseInt(firstByPoint.fta - firstByPoint.ftm)
    let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
    return ttflPointsPoints
  };
  const sortTtflByReboundsV = () => {
  let arrayByPointsBonus =
    parseInt(firstByRebound.points) +
    parseInt(firstByRebound.totReb) +
    parseInt(firstByRebound.assists) +
    parseInt(firstByRebound.steals) +
    parseInt(firstByRebound.blocks) +
    parseInt(firstByRebound.fgm) +
    parseInt(firstByRebound.tpm) +
    parseInt(firstByRebound.ftm);
  let arrayByPointsMalus =
    parseInt(firstByRebound.turnovers) +
    parseInt(firstByRebound.fga - firstByRebound.fgm) +
    parseInt(firstByRebound.tpa - firstByRebound.tpm) +
    parseInt(firstByRebound.fta - firstByRebound.ftm);
  let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
  return ttflPointsPoints;
  };
  const sortTtflByAssistsV = () => {
    let arrayByPointsBonus =
      parseInt(firstByAssists.points) +
      parseInt(firstByAssists.totReb) +
      parseInt(firstByAssists.assists) +
      parseInt(firstByAssists.steals) +
      parseInt(firstByAssists.blocks) +
      parseInt(firstByAssists.fgm) +
      parseInt(firstByAssists.tpm) +
      parseInt(firstByAssists.ftm);
    let arrayByPointsMalus =
      parseInt(firstByAssists.turnovers) +
      parseInt(firstByAssists.fga - firstByAssists.fgm) +
      parseInt(firstByAssists.tpa - firstByAssists.tpm) +
      parseInt(firstByAssists.fta - firstByAssists.ftm);
    let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
    return ttflPointsPoints;
  };
  const sortTtflByPointsH = () => {
    let arrayByPointsBonus =
      parseInt(firstByPointH.points) +
      parseInt(firstByPointH.totReb) +
      parseInt(firstByPointH.assists) +
      parseInt(firstByPointH.steals) +
      parseInt(firstByPointH.blocks) +
      parseInt(firstByPointH.fgm) +
      parseInt(firstByPointH.tpm) +
      parseInt(firstByPointH.ftm);
    let arrayByPointsMalus =
      parseInt(firstByPointH.turnovers) +
      parseInt(firstByPointH.fga - firstByPointH.fgm) +
      parseInt(firstByPointH.tpa - firstByPointH.tpm) +
      parseInt(firstByPointH.fta - firstByPointH.ftm);
    let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
    return ttflPointsPoints;
  };
  const sortTtflByReboundsH = () => {
    let arrayByPointsBonus =
      parseInt(firstByReboundH.points) +
      parseInt(firstByReboundH.totReb) +
      parseInt(firstByReboundH.assists) +
      parseInt(firstByReboundH.steals) +
      parseInt(firstByReboundH.blocks) +
      parseInt(firstByReboundH.fgm) +
      parseInt(firstByReboundH.tpm) +
      parseInt(firstByReboundH.ftm);
    let arrayByPointsMalus =
      parseInt(firstByReboundH.turnovers) +
      parseInt(firstByReboundH.fga - firstByReboundH.fgm) +
      parseInt(firstByReboundH.tpa - firstByReboundH.tpm) +
      parseInt(firstByReboundH.fta - firstByReboundH.ftm);
    let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
    return ttflPointsPoints;
  };
  const sortTtflByAssistsH = () => {
    let arrayByPointsBonus =
      parseInt(firstByAssistsH.points) +
      parseInt(firstByAssistsH.totReb) +
      parseInt(firstByAssistsH.assists) +
      parseInt(firstByAssistsH.steals) +
      parseInt(firstByAssistsH.blocks) +
      parseInt(firstByAssistsH.fgm) +
      parseInt(firstByAssistsH.tpm) +
      parseInt(firstByAssistsH.ftm);
    let arrayByPointsMalus =
      parseInt(firstByAssistsH.turnovers) +
      parseInt(firstByAssistsH.fga - firstByAssistsH.fgm) +
      parseInt(firstByAssistsH.tpa - firstByAssistsH.tpm) +
      parseInt(firstByAssistsH.fta - firstByAssistsH.ftm);
    let ttflPointsPoints = arrayByPointsBonus - arrayByPointsMalus;
    return ttflPointsPoints;
  };


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
            <div>
              <FaMedal style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs marqueurs pour{" "}
              <img src={URLV} alt="" style={{ width: 60 }} /> {firstName}{" "}
              {lastName} avec {value}pts
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByPointsV()}Pts
              </div>
            </div>
          </li>
          <li className="list-group-item mt-1">
            <div>
              <FaMedal style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs marqueurs pour{" "}
              <img src={URLH} alt="" style={{ width: 60 }} />
              {data.match.stats.hTeam.leaders.points.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.points.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.points.value} pts
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByPointsH()}Pts
              </div>
            </div>
          </li>
          <li className="list-group-item mt-1">
            <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs rebondeur pour{" "}
            <img src={URLV} alt="" style={{ width: 60 }} /> {firstNameR}{" "}
            {lastNameR} avec {valueR} rbds
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByReboundsV()}Pts
              </div>
            </div>
          </li>
          <li className="list-group-item mt-1">
            <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs rebondeur pour{" "}
            <img src={URLH} alt="" style={{ width: 60 }} />
            {data.match.stats.hTeam.leaders.rebounds.players[0].firstName}{" "}
            {data.match.stats.hTeam.leaders.rebounds.players[0].lastName} avec{" "}
            {data.match.stats.hTeam.leaders.rebounds.value} rbds
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByReboundsH()}Pts
              </div>
            </div>
          </li>
          <li className="list-group-item mt-1">
            <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs passeur pour{" "}
            <img src={URLV} alt="" style={{ width: 60 }} /> {firstNameP}{" "}
            {lastNameP} avec {valueP} asst
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByAssistsV()}Pts
              </div>
            </div>
          </li>
          <li className="list-group-item mt-1">
            <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
            Meilleurs passeur pour{" "}
            <img src={URLH} alt="" style={{ width: 60 }} />{" "}
            {data.match.stats.hTeam.leaders.assists.players[0].firstName}{" "}
            {data.match.stats.hTeam.leaders.assists.players[0].lastName} avec{" "}
            {data.match.stats.hTeam.leaders.assists.value} asst
            <div className="d-flex justify-content-end align-items-center">
              <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
              <div className="ml-1" style={{ textAlign: "center" }}>
                {sortTtflByAssistsH()}Pts
              </div>
            </div>
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
              <img src={URLV} alt="" style={{ width: 60 }} /> {firstName}{" "}
              {lastName} avec {value}
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByPointsV()}Pts
                </div>
              </div>
            </li>
            <li className="list-group-item mt-1">
              <FaMedal style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs marqueurs pour{" "}
              <img src={URLH} alt="" style={{ width: 60 }} />
              {data.match.stats.hTeam.leaders.points.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.points.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.points.value} pts
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByPointsH()}Pts
                </div>
              </div>
            </li>
            <li className="list-group-item mt-1">
              <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs rebondeur pour{" "}
              <img src={URLV} alt="" style={{ width: 60 }} /> {firstNameR}{" "}
              {lastNameR} avec {valueR} rbds
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByReboundsV()}Pts
                </div>
              </div>
            </li>
            <li className="list-group-item mt-1">
              <GiPodiumWinner style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs rebondeur pour{" "}
              <img src={URLH} alt="" style={{ width: 60 }} />{" "}
              {data.match.stats.hTeam.leaders.rebounds.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.rebounds.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.rebounds.value} rbds
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByReboundsH()}Pts
                </div>
              </div>
            </li>
            <li className="list-group-item mt-1">
              <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs passeur pour{" "}
              <img src={URLV} alt="" style={{ width: 60 }} /> {firstNameP}{" "}
              {lastNameP} avec {valueP} asst
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByAssistsV()}Pts
                </div>
              </div>
            </li>
            <li className="list-group-item mt-1">
              <FaUserFriends style={{ color: "orange", fontSize: "30px" }} />
              Meilleurs passeur pour{" "}
              <img src={URLH} alt="" style={{ width: 60 }} />{" "}
              {data.match.stats.hTeam.leaders.assists.players[0].firstName}{" "}
              {data.match.stats.hTeam.leaders.assists.players[0].lastName} avec{" "}
              {data.match.stats.hTeam.leaders.assists.value} asst
              <div className="d-flex justify-content-end align-items-center">
                <img className="Ttfl" src={TTFL} alt="" style={{ width: 50 }} />
                <div className="ml-1" style={{ textAlign: "center" }}>
                  {sortTtflByAssistsH()}pts
                </div>
              </div>
            </li>
          </ul>
          <Link to="/" className="btn btn-primary btn-lg mt-3 mb-3">
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
        <div>
            <TakeMatch gameId={gameId} />
          </div>
        </div>
    );
  }
}

export default MatchDetail
