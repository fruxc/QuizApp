import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/signup/signup";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorBoundary from "./helper/Error";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar></Navbar> */}
        <ErrorBoundary>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="*" component={Dashboard} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
