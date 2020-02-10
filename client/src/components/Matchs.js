import React, { Component, Fragment } from "react";
import launcheMatch from '../queries/launchMatch'
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import LaunchMatch from './LaunchMatchs'

export class Matchs extends Component {

    dateMatch(){
        let d = new Date()
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate() - 1);
        const year = String(d.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return `${day}/${month}/${year}`;
      }

      numMatch(){
        if (!this.props.launcheMatch.loading){
        const matchs = this.props.launcheMatch.matchs;
        const num = matchs.length;
          return num
        }else{

        }
        // let count = Object.keys(matchs).length
        // console.log(count);

      }


         render() {
           return (
             <div>
               <h1 className="display-4 my-3">Matchs du {this.dateMatch()}</h1>
               <h2>Nombre de matchs : {this.numMatch()}</h2>
               {this.renderMatchs()}
             </div>
           );
         }

         renderMatchs() {
           if (!this.props.launcheMatch.loading) {
             return (
               <Fragment>
                 {this.props.launcheMatch.matchs.map(match => {
                   return (
                     <LaunchMatch key={match.gameId} match={match} />
                   );
                 })}
               </Fragment>
             );
           } else {
           }
         }
       }

export default compose(graphql(launcheMatch, { name: "launcheMatch" }))(Matchs);
