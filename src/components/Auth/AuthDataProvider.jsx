import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RouteLayout from "../../layout/Main/RouteLayout.jsx";
import AuthPageLayout from "../../layout/Auth/AuthPageLayout.jsx";

import SignIn from "../../views/Account/SignIn.jsx";

import { AuthContext } from "./AuthContext.jsx";

const AuthDataProvider = ({ children }) => {
  
  const prevAuth = window.localStorage.getItem("authenticated") || false;
  const prevAccessToken = window.localStorage.getItem("access_token") || null;
  const prevRefreshToken = window.localStorage.getItem("refresh_token") || null;
  const prevTokenType = window.localStorage.getItem("token_type") || null;
  const prevUser = window.localStorage.getItem("user") || null;

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [accessToken, setAccessToken] = useState(prevAccessToken);
  const [refreshToken, setRefreshToken] = useState(prevRefreshToken);
  const [tokenType, setTokenType] = useState(prevTokenType);
  const [user, setUser] = useState(prevUser);

  const clearStorage = () => {
    setAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
    setTokenType("");
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(
    () => {
      if (window.localStorage.getItem("authenticated") === null) {
        window.localStorage.setItem("authenticated", authenticated);
        window.location.reload();
      }

      window.localStorage.setItem("authenticated", authenticated);
      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("refresh_token", refreshToken);
      window.localStorage.setItem("token_type", tokenType);
      window.localStorage.setItem("user", user);
    },
    [authenticated, accessToken, refreshToken, tokenType, user]
  );

  const defaultContext = {
    clearStorage,
    authenticated,
    setAuthenticated,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    tokenType,
    setTokenType,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={defaultContext}>
    {
      (authenticated === "true")
      ?
      children
      :
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/sign-in" />
            </Route>
            <RouteLayout path="/sign-in" component={SignIn} layout={AuthPageLayout} />
            <Route component={SignIn} />
          </Switch>
        </BrowserRouter>
        <ToastContainer autoClose={false} />
      </div>
    }
    </AuthContext.Provider>
  );
};

export default AuthDataProvider;
