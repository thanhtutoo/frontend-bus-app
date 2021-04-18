import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../components/Auth/AuthContext.jsx";
import MainPageLayout from "./MainPageLayout.jsx";
import AppUtil from "../../AppUtil.jsx";

const RouteLayout = ({ component: Component, layout: Layout, pageId, ...rest }) => {

  let pageColor = "rgba(243, 244, 246, var(--tw-bg-opacity))";

  
  document.getElementById("root").style.backgroundColor=pageColor;

	const { authenticated } = useContext(AuthContext);

  Layout = Layout || MainPageLayout;

  if (authenticated) {
    return (
      <Route {...rest} render={matchProps => (
        <Layout isFluid={rest.isFluid}>
          <Component {...matchProps} isFluid={rest.isFluid} />
        </Layout>
      )} />
    )
  } else {
    return (
      <Redirect to="/sign-in" />
    )
  }
};

export default RouteLayout;