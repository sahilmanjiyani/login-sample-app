import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./Login.css"

async function loginFunc (credentials) {
    return fetch('localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [borderUsernameStyle, setBorderUserStyle] = useState('1px solid #ececec');
    const [borderPasswordStyle, setBorderPassStyle] = useState('1px solid #ececec');

    const emailValidation = () => {
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return !(!username || regex.test(username) === false);
    }

    const inputStyleVal = (val, inputType) => {
        if (inputType == 'username') {
            val ? setBorderUserStyle('1px solid green') : setBorderUserStyle('1px solid red')
        } else if (inputType == 'password') {
            val ? setBorderPassStyle('1px solid green') : setBorderPassStyle('1px solid red')
        } else {
            setBorderUserStyle('1px solid green');
            setBorderPassStyle('1px solid green');
        }
    }

    const onSubmitFunc = async  (e) => {
        e.preventDefault();
        
        const isEmailValid = emailValidation(username)
        
        isEmailValid ? inputStyleVal(true, 'username') : inputStyleVal(false, 'username')
        password!==undefined ? inputStyleVal(true, 'password') : inputStyleVal(false, 'password')
        
        if (isEmailValid && password) {
            const token = await loginFunc({
                username,
                password
              });
              setToken(token);
        } else {
        }
        
    }

    return(
        <div className="main-wrapper">
            <h1>Sign in</h1>
            <form onSubmit={onSubmitFunc}>
                <label className='email-label'>
                    <h3>Email</h3>
                    <input type="text" style={{border:borderUsernameStyle}} onChange={e => setUserName(e.target.value)} />
                </label>
                
                <label className='password-label'>
                    <h3>Password</h3>
                    <input type="password" style={{border:borderPasswordStyle}} onChange={e => setPassword(e.target.value)} />
                </label>
                <label className="checkbox-style">
                    <input type="checkbox" />
                    <p>Remember me?</p>
                </label>
                <div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
            <div className="second-element">
                <h4><a href='#ForgotPassword'>Forgot your password?</a> </h4>
                <h4><span>Don't have an account?</span><a href='#sign-up'>Sign up</a></h4>
                <h4><a href='#Resend-email'>Resend email confirmation</a></h4>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }