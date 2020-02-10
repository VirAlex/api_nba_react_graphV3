import React from 'react';
import { Link } from 'react-router-dom'
import { FaBasketballBall } from "react-icons/fa";


export default function LaunchMatchs({ match: { vTeam, gameId, hTeam}}){
    const URLV = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${vTeam.triCode.toLowerCase()}.png`
    const URLH = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${hTeam.triCode.toLowerCase()}.png`;
    console.log(URL);


  return (
    <div className="card card-body mb-2">
      <div className="row align-items-center">
        <div className="col">
          <h3>Match:</h3>
          <span>
            <h4>
              <img src={URLV} alt="" style={{ width: 70 }} />
              {vTeam.triCode} <strong>VS</strong> {hTeam.triCode}
              <img src={URLH} alt="" style={{ width: 70 }} />
            </h4>
          </span>
        </div>
        <div className="col-md-5">
          <h3>
            {vTeam.score} <FaBasketballBall style={{color: "orange"}}/> {hTeam.score}
          </h3>
        </div>
        <div className="col-md-1">
          <Link to={`/match/${gameId}`} className="btn btn-info">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
