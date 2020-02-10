import React, { Component, Fragment } from "react";
import launcheMatch from '../queries/launchMatch'
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import LaunchMatch from './LaunchMatchs';
import Moment from 'react-moment';

export class Matchs extends Component {
         constructor(props) {
           super(props);
           this.state = {
             date: ""
           };
         }

         dateMatch() {
           let d = new Date();
           let month = String(d.getMonth() + 1);
           let day = String(d.getDate() - 1);
           const year = String(d.getFullYear());

           if (month.length < 2) month = "0" + month;
           if (day.length < 2) day = "0" + day;

           return `${day}/${month}/${year}`;
         }

         numMatch() {
           if (!this.props.launcheMatch.loading) {
             const matchs = this.props.launcheMatch.matchs;
             const num = matchs.length;
             return num;
           } else {
           }
           // let count = Object.keys(matchs).length
           // console.log(count);
         }

        startDate(){
          return this.dateMatch();
        }

         handleClick(event) {
           console.log(event.currentTarget.value);
          //  console.log("date = " + date);
          //  this.setState({
          //    dueDate: date
          //  });
          //  console.log("dueDate value = " + this.state.dueDate);
         }

         render() {
           let date = new Date();
           let month = String(date.getMonth() + 1);
           let day = String(date.getDate() - 1);
           const year = String(date.getFullYear());

           if (month.length < 2) month = "0" + month;
           if (day.length < 2) day = "0" + day;
           date = `${day}${month}${year}`;
           let dateString = `${day}/${month}/${year}`;
          let dateMoinsDeux = `${year}${month}${parseInt(day) - 1}`;
           let dateMoinsDeuxString = `${parseInt(day) - 1}/${month}/${year}`;
          let dateMoinsTroisString = `${parseInt(day) - 2}/${month}/${year}`;
          let dateMoinsTrois = `${year}${month}${parseInt(day) - 2}`;
          let datePlusUnString = `${parseInt(day) + 1}/${month}/${year}`;
          let datePlusUn = `${year}${month}${parseInt(day) + 1}`;

           return (
             <div>
               <h1 className="display-4 my-3">Matchs du {dateString}</h1>
               <div className="d-flex justify-content-around">
                 <h2>Nombre de matchs : {this.numMatch()}</h2>
                 <div className="">
                   <button
                     className="btn btn-primary mr-2"
                     onClick={() => this.setState({ date: dateMoinsDeux })}
                   >
                     {" "}
                     {dateMoinsDeuxString}
                   </button>
                   <button
                     className="btn btn-primary mr-2"
                     onClick={() => this.setState({ date: dateMoinsTrois })}
                   >
                     {" "}
                     {dateMoinsTroisString}
                   </button>
                   <button
                     className="btn btn-primary"
                     onClick={() => this.setState({ date: datePlusUn })}
                     >
                    {datePlusUnString}
                   </button>
                 </div>
               </div>
               {this.renderMatchs()}
             </div>
           );
         }

         renderMatchs() {
           if (!this.props.launcheMatch.loading) {
             return (
               <Fragment>
                 {this.props.launcheMatch.matchs.map(match => {
                   return <LaunchMatch key={match.gameId} match={match} />;
                 })}
               </Fragment>
             );
           } else {
           }
         }
       }

export default compose(graphql(launcheMatch, { name: "launcheMatch" }))(Matchs);
