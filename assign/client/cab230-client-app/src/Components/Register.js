import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {

    //set email and password state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //if registered, then go to '/login'
    const history = useHistory();


    //get token
    function setRegister() {

        const url = `http://131.181.190.87:3000/user/register`

        //get token 
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                //if have a error, then return alert on screen
                if (res.error) {
                    alert(res.message)
                    //otherwise push to '/login'
                } else {
                    alert('You have successfully created a new accout')
                    history.push('/login')
                }
            })
    }


    return (

        //Email and password display and style
        <div className="login-and-register">

            {/* back to home page(link to '/') */}
            <div>
                <Link to='/'><button className='button back-to-home'>Back</button></Link>
            </div>

            <br></br>
            <br></br>
            <br></br>


            <div className='Heading-register'>
                <h>Register</h>
            </div>

            <br></br>
            <br></br>


            {/* Email */}
            <div className="username">
                
                <label className="login-register-label-register">Email: </label>
                <input className="username-txt"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                
            </div>

            <br></br>
            <br></br>

            {/* password */}
            <div className="password">
                
                <label className="login-register-label-register">password: </label>
                <input className="password-txt"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                
            </div>

            <br></br>
            <br></br>

            {/* register button */}
            <div className="button-user">
                <button className="user-click-button-register" onClick={setRegister} >Register</button>
            </div>


            {/* if have a account, then link to /login */}
            <div className='check-user'>
                <Link to='/login'><li>already have a account?</li></Link>
            </div>


        </div>

    )


}

export default Register;
