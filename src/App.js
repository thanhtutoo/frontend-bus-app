import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./assets/scss/main.scss";

import ScrollToTop from "./components/ScrollToTop.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthDataProvider from "./components/Auth/AuthDataProvider.jsx";

import RouteLayout from "./layout/Main/RouteLayout.jsx";
import AuthPageLayout from "./layout/Auth/AuthPageLayout.jsx";

import MainPageLayout from "./layout/Main/MainPageLayout.jsx";

import Profile from "./views/Bus/Index.jsx";


import Terms from "./views/Terms.jsx";
import Privacy from "./views/Privacy.jsx";

import PageNotFound from "./views/Error/PageNotFound.jsx";
import BusArrivalInfo from "./views/Bus/BusArrivalInfo";

function App() {
  return (
    <AuthDataProvider>
        <div className="App">
          <BrowserRouter basename="/">
            <ScrollToTop />
            <Switch>
              <Route exact path="/">
                <Redirect to="/bus-stops" />
              </Route>

            
              <RouteLayout
                path="/bus-arrival-info/:id"
                component={BusArrivalInfo}
                layout={MainPageLayout}
                pageId="dashboard"
              />
             
              <RouteLayout
                path="/bus-stops"
                component={Profile}
                layout={MainPageLayout}
              /> 
              <RouteLayout
                path="/terms"
                component={Terms}
                layout={AuthPageLayout}
              />
              <RouteLayout
                path="/privacy-policy"
                component={Privacy}
                layout={AuthPageLayout}
              />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
          <ToastContainer autoClose={false} />
        </div>
    </AuthDataProvider>
  );
}

export default App;
