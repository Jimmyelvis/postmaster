import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "ReduxStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormBg } from "../components/FormBg";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(loginUser({ userData, navigate }));
  };

  return(
    <FormBg
      username={username}
      password={password}
      onChange={onChange}
      actionCall={onLoginSubmit}
      slogan="Already Have an Account, go ahead and log in"
      btnText="Login"
    />
  )



};
