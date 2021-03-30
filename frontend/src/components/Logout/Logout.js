import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UsernameContext } from "../../context";
import { Spinner } from "react-bootstrap";
import "./Logout.css";

const Logout = () => {
  const [, setUsername] = useContext(UsernameContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    sendLogout(setRedirect);
    setUsername("");
  }, []);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="logoutWrap">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

const sendLogout = async (setRedirect) => {
  await fetch("/logout");
  setRedirect(true);
};

export default Logout;
