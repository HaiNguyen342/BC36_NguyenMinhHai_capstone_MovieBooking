import React from "react";
import { Outlet } from "react-router-dom";
import styles from './Auth.module.css'

//Layout cho Authen
const Auth = () => {
  return (
    <div className={styles.auth__background}>
      <Outlet />
    </div>
  );
};

export default Auth;
