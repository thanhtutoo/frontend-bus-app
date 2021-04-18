import ApiUtil from "./ApiUtil.jsx";

const AuthApi = {

  auth: async (email, password) => {
    return await ApiUtil.call("login", {
      email: email,
      password: password,
      grant_type: "password"
    }, "post");
  },


  refreshToken: async (token) => {
    return false;
  },


}

export default AuthApi;
