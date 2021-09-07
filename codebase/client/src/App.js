import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Quiz from "./components/quiz/Quiz";
import Leaderboard from "./components/leaderboard/Leaderboard";
import ErrorBoundary from "./helper/Error";
import CreateQuiz from "./components/quiz/quiz-crud/CreateQuiz";
import { getUser } from "./services/UserService";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddQuestion from "./components/quiz/question-crud/AddQuestion";
import Profile from "./components/profile/Profile";

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authStateChanged();
  }, []);
  const authStateChanged = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      setUserAuthenticated(true);
      const response = await getUser();
      setUser(response.message);
    } else {
      setUserAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar user={user} authState={authStateChanged} />
        <ToastContainer />
        <ErrorBoundary>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Dashboard
                  user={user}
                  authenticated={userAuthenticated}
                  {...props}
                />
              )}
            />
            {userAuthenticated ? (
              <Switch>
                <Route exact path="/quiz" component={Quiz} />
                <Route exact path="/add-quiz" component={CreateQuiz} />
                <Route exact path="/add-question" component={AddQuestion} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
            )}
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};
export default App;
