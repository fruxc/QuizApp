import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './components/login/Login';
import LoginNext from './components/login/LoginNext';
import Home from './components/home/Home';
import ErrorBoundary from './helper/Error';

export default function App() {

  return (
    <div>
        <BrowserRouter>
          {/* <Navbar></Navbar> */}
          <ErrorBoundary>
                <Switch>
                    <Route   exact path="/login"     component={Login}/>
                    <Route   exact path="/home"      component={Home} />                  
                    
                    <Route   exact path="*"          component={LoginNext} />
                </Switch>
          </ErrorBoundary>
        </BrowserRouter>

    </div>
  )
}
