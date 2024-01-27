import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "ReduxStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormBg } from "../components/FormBg";

export const Register = () => {
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
  

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(registerUser({userData, navigate}));
  };

  return(
    <FormBg
      username={username}
      password={password}
      onChange={onChange}
      actionCall={onRegisterSubmit}
      slogan="Signup for free to get started today"
      btnText="Register"
    />
  )



};
