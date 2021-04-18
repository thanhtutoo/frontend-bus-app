import React from "react";

import Header from "./Header.jsx";
import Footer from "../Footer.jsx";

const MainPageLayout = ({ children, pageId, ...rest }) => {
  return (
    <div id={pageId}>
      <div className="progress-bar" style={{width: '100%' }}></div>
      <Header />
      {children}
      <Footer image="true" />
    </div>
  )
}

export default MainPageLayout;