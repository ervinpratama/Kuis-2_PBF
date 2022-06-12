import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Mahasiswas from "./components/mahasiswas";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Show from "./components/Show";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Mahasiswas} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/show/:id' component={Show} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
