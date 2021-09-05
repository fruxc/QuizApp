import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import ErrorBoundary from "./helper/Error";
import CreateQuiz from "./components/create-quiz/CreateQuiz";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/add-quiz" component={CreateQuiz} />
            <Route exact path="*" component={Dashboard} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
