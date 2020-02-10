import React from "react";
import "./App.css";
import Logo from "./logo.png";
import Matchs from "./components/Matchs";
import MatchDetail from "./components/MatchDetail";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={Logo}
            alt="Nba App"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={Matchs} />
          <Route exact path="/match/:gameId" component={MatchDetail} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
