import React, { useState, useContext } from 'react'
import classes from "./SignIn.module.css"

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from './../../Utility/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from './../../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';


function Auth() {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })


  const[{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  
  const navStateData = useLocation();


// console.log(user);


const authHandler=async(e)=>{
e.preventDefault();
console.log(e.target.name);
if (e.target.name == "signin"){
  //firebase auth
  setLoading({...loading, signIn:true})
  signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
    // console.log(userInfo);
    dispatch({
      type:Type.SET_USER,
      user:userInfo.user,
    });
    setLoading({ ...loading, signIn: false });
    navigate(navStateData?.state?.redirect || "/");
  })
  .catch((err)=>{
    setError(err.message);
    setLoading({ ...loading, signIn: false })
  })


} else {
  setLoading({ ...loading, signUp: true });
  createUserWithEmailAndPassword(auth, email, password)
    .then((userInfo) => {
      // console.log(userInfo);
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
      setLoading({ ...loading, signUp: false });
      navigate(navStateData?.state?.redirect || "/");
    })
    .catch((err) => {
      setError(err.message);
      setLoading({ ...loading, signUp: false })
    });
}

};



  return (
    // logo
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      {/* //Form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
          style = {{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}>
          {navStateData?.state?.msg}
          
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Passord</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* Agreement */}
        <p>
          By Signing -in you agree to the Amazon Fake Clone Codition of use &
          sale please see our Privacy Notice, our Cookies & our Interest Based
          Ads Notice.
        </p>
        {/* Create Account btn */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;