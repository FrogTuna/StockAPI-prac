import React from "react";
import { useState } from "react"
//import jwt from "jsonwebtoken"
import { useHistory} from "react-router-dom";

import { Link } from "react-router-dom";


export default function Login() {

    //set email and password
    const [emailState, setEmailState] = useState("")
    const [passwordState, setPasswordState] = useState("")

    //if login, click to '/' page(home)
    const history = useHistory();


    //example@api.com
    //asdlkfj1

    //set login, get token 
    function setLogin() {

        //url
        const url = `http://131.181.190.87:3000/user/login`

        //get token 
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailState, password: passwordState })

        })

            .then((res) => res.json())
            .then((res) => {
                //if have a error, then return alert on display
                if (res.error) {
                    alert(res.message)
                    //otherwise set token in localstorage, then declare token in anywhere
                } else {
                    localStorage.setItem("token", res.token)
                    history.push('/')
                }

            })


    }

    return (

        <form >

            <div className="login-and-register">
                <div>

                    {/* back to home page(link to '/') */}
                    <Link to='/'><button className='button back-to-home'>Back</button></Link>

                </div>


                <br></br>
                <br></br>
                <br></br>

                <div className = 'Heading-login'>
                    <h>Login</h>
                </div>

                <br></br>
                <br></br>

                {/* Email */}
                <div className="username">
                    
                    <label className="login-register-label">Email: </label>
                    <input className="username-txt"
                        //name="username"
                        type="email"
                        value={emailState}
                        onChange={(e) => setEmailState(e.target.value)}
                        placeholder="Email"
                    />
                    
                </div>
                <br></br>
                <br></br>

                {/* password */}
                <div className="password">
                    
                    <label className="login-register-label">password: </label>
                    <input className="password-txt"
                        //name="password"
                        type="password"
                        value={passwordState}
                        onChange={(e) => setPasswordState(e.target.value)}
                        placeholder="Password"
                    />
                    
                </div>

                <br></br>
                <br></br>

                {/* login button */}
                <div className="button-user">
                    <button type="button" className="user-click-button-login" onClick={setLogin}>Login</button>

                </div>

                {/* if you haven't have a account, then link to '/register' */}
                <div className='check-user'>
                    <Link to='/register'><li>haven't have a account?</li></Link>
                </div>


            </div>
        </form>
    )
}

