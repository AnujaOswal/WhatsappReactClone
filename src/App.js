import React,{useState} from "react";
import "./Sidebar.css";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import {useStateValue} from "./StateProvider";

function App() {
  const [ {user} ,setUser] = useStateValue(null);


  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat /> 
                {/* <h1>Home Screen</h1> */}
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
