import React from "react";

import Footer from "../Footer.jsx";

const AuthPageLayout = ({ children, ...rest }) => {
  return (
    <div>
	    {children}
	    <Footer />
    </div>
  )
}

export default AuthPageLayout;
