import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "antd";
import { Helmet } from "react-helmet";

import AppUtil from "../../AppUtil.jsx";
import AuthApi from "../../api/AuthApi.jsx";
import { AuthContext } from "../../components/Auth/AuthContext.jsx";

import CustomInput from "../../components/Form/CustomInput.jsx";
import CustomButton from "../../components/Button/CustomButton.jsx";

import logo from "../../assets/img/logo-black.svg";
import image1 from "../../assets/img/auth/1.png";
import image2 from "../../assets/img/auth/2.png";
import image3 from "../../assets/img/auth/3.png";

export default function SignIn() {
  let history = useHistory();

  const { authenticated, setAuthenticated, setAccessToken, setRefreshToken, setTokenType, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [mainLogo, setMainLogo] = useState("");

  const getQuery = (param) => {
    return (window.location.search.match(new RegExp('[?&]' + param + '=([^&]+)')) || [null])[1];
  }

  useEffect(() => {
    if (authenticated === "true") {
      history.push("/bus-stops");
    }

    let vid = getQuery("vid");
    if (vid === undefined) setMainLogo(logo);
  }, [setMainLogo, authenticated, history]);

  const handleSubmit = async values => {
    setLoading(true);

    AuthApi.auth(values.email, values.password).then(result => {
      setLoading(false);
      if (result.status !== 200) {
        AppUtil.toast("Email / Password is wrong", "error");
        return false;
      }

      let userData = result.data.data.results;
      console.log("userData");
      console.log(userData);
      setAuthenticated(true);
      setAccessToken(userData?.access_token);
      setRefreshToken(userData?.refresh_token);
      setTokenType(userData?.token_type);
      window.location.replace("/bus-stops");
    
    }, (error, type) => {
      console.log("error", error);
      setLoading(false);
    });
  };

  const handleFormError = error => {
    AppUtil.toast("Form error!", "error");
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Bus Service</title>
      </Helmet>
      <main className="container mx-auto w-3/5 mb-56">
       
        <div className="mt-14">
          <h2 className="font-head font-2 text-center mb-5">Welcome to Bus service</h2>
          <p className="font-sub text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className="grid gap-4 grid-cols-3 mt-28">
          <div className="col-span-2">
            <div className="flex items-center mb-2 p-2">
              <div className="w-1/5">
                <img src={image1} alt="" className="block mx-auto" />
              </div>
              <div>
                <h3 className="text-3xl text-gray-900 font-bold font-sub mb-3">Access to our trusted partners</h3>
                <p className="text-gray-700">
                  Browse through a wide variety of services provided by our trusted partners.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-2 p-2">
              <div className="w-1/5">
                <img src={image2} alt="" className="block mx-auto" />
              </div>
              <div>
                <h3 className="text-3xl text-gray-900 font-bold font-sub mb-3">Track your location prep</h3>
                <p className="text-gray-700">
                  Personalise your dashboard & never miss any updates of your relocation progress.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-2 p-2">
              <div className="w-1/5">
                <img src={image3} alt="" className="block mx-auto" />
              </div>
              <div>
                <h3 className="text-3xl text-gray-900 font-bold font-sub mb-3">Discover pocket friendly deals & offers</h3>
                <p className="text-gray-700">
                  Enjoy exclusive discounts and offers provided by our trusted partners.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-white p-5">
            <Form 
              onFinish={handleSubmit} 
              onFinishFailed={handleFormError}
              initialValues={{
                "email": "",
                "password": ""
              }}
            >
              <h3 className="font-bold mb-5">Login</h3>

              <div className="mb-6">
                <CustomInput label="Email address" type="email" name="email" placeholder="For eg. admin@gmail.com" required="true" />
              </div>

              <div className="mb-3">
                <CustomInput label="Password" type="password" name="password" required="true" />
              </div>

              <div className="mb-6">
                <Link to="/forgot-password" className="font-bold text-sm">
                  Forgot password?
                </Link>
              </div>

              <CustomButton
                htmlType="submit"
                loading={loading}
                className="float-right button-primary">
                Login
              </CustomButton>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}