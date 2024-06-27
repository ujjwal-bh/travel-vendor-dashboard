import React, { useEffect, useState } from "react";
import "./login.css";
import PlainInput from "../../components/UI/PlainInput/PlainInput";
import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import Footer from "../../components/Core/Footer/Footer";
import { useLoginMutation } from "../../services/api";
// import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

const Login = () => {
  const {verifyLogin} = useGlobalContext()
  
  const [loginMessage, setLoginMessage] = useState({ status: "", msg: "" });
  const [login, {data, error, isSuccess, isLoading, isFetching }] =
    useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    await login({ username, password });

  };


  useEffect(() => {
    error &&
      setLoginMessage({
        status: "error",
        msg: error?.data?.message
      });
    isSuccess && setLoginMessage({ status: "success", msg: "success" });
  }, [error, isSuccess]);

  useEffect(() => {
    if (loginMessage.status.length > 0) {
      setTimeout(() => {
        setLoginMessage({ status: "", msg: "" });
      }, 3000);
    }
  }, [loginMessage]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("token", data?.token)
      localStorage.setItem("refreshToken", data?.refreshToken)
      setTimeout(() => {
        verifyLogin()
      }, 1000);
    }
  }, [isSuccess]);


  return (
    <>
      <div className="login-top-strip primary-bg h1 font-bold light-900 p-x-xl">
        Bims
      </div>
      <div className="login-outer">
        <div className="login-wrapper">
          {loginMessage?.msg?.length > 0 && (
            <div className={`login-message ${loginMessage.status} p-s light-900 m-y-m`}>
              {loginMessage.msg}
            </div>
          )}
          <div className="login-title">
            <Title size="h2" weight="semibold">
              Vendor Login
            </Title>
          </div>
          <form className="login-form" onSubmit={handleLoginClick}>
            <div className="form-control">
              <div className="login-form-label h5 dark-500">Username</div>
              <PlainInput
                placeholder="Enter your username"
                value={username}
                onchange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <div className="login-form-label h5 dark-500">Password</div>
              <PlainInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onchange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <Button
                color="primary"
                type="filled"
                size="default"
                className={`login-form-btn ${
                  (isFetching || isLoading || isSuccess) && "disabled"
                }`}
                disabled={isFetching || isLoading || isSuccess ? true : false}
              >
                {isLoading || isFetching ? "Loading" : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer type="normal"/>
    </>
  );
};

export default Login;
