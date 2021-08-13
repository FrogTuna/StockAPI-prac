import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//import "../LandingPage/Style.css"
import Register from "../Components/Register.js"
import Login from "../Components/Login.js"
import Stock from "../Components/Stock.js"
import Query from "../Components/Query.js"
import PriceHistory from "../Components/PriceHistory.js"

//main function 
export default function App() {

    return (

        <Router>
            <div className="App">

                <Switch>

                    <Route exact path="/">
                        <Header />

                        <br></br>
                        <br></br>


                        <Welcome />
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/login" >
                        <Login />
                    </Route>

                    <Route exact path="/stock">

                        <Header />
                        <br></br>
                        <Stock />

                    </Route>

                    <Route exact path="/query">
                        <Header />
                        <br></br>
                        <Query />

                    </Route>


                    <Route exact path="/pricehistory">
                        <Header />
                        <br></br>
                        <PriceHistory />

                    </Route>

                </Switch>

            </div>
        </Router>
    )
}


//Header
function Header() {

    //if get token, then login
    let token = localStorage.getItem('token');

    //logout, clear token
    function Logout() {
        localStorage.clear();
        window.location.href = '/'
        alert('You have logout')
    }

    return (

        //Header
        <div className="Header">

            <div className="LeftHeader">
                <ul>
                    <Link to="/"><button className="button Home">Home</button></Link>
                    <Link to="/stock"><button className="button Stock">Stock</button></Link>
                    <Link to="/query"><button className="button Quote">Quote</button></Link>
                    <Link to="/pricehistory"><button className="button PriceHistory">Price History (stricted)</button></Link>

                </ul>
            </div>

            {/* if get token from res, then display logout button, otherwise display register and login */}
            {
                token ?
                    <div className="rightHeader">
                        <ul>
                            <Link ><button onClick={Logout} className="button login">Logout</button></Link>
                        </ul>
                    </div>
                    :
                    <div className="rightHeader">
                        <ul>
                            <Link to="/register"><button className="button Register">Register</button></Link>
                            <Link to="/login"><button className="button login">Login</button></Link>
                        </ul>
                    </div>
            }

        </div>


    )

}

//instruction for using this system
function Welcome() {

    return (

        <div className="welcome">

            <h1>Stock Price</h1>
            <p> Welcome to the Stock Analyst portal.<br></br><br></br></p>
            <li><b>Stock</b>: Click on Stocks to see the available companies.<br></br></li>
            <br></br>
            <li><b>Quote</b>: Click on Quote to get the latest price information by stock symbol.<br></br></li>
            <br></br>
            <li><b>PriceHistory</b>:  Click on PriceHistory to choose Price History to sample from.<br></br>
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               the most recent one hundred days of information for a<br></br>
                               particular stock if u have loged in.<br></br></li>
            <br></br>
            <li><b>Register</b>: creact an account. </li>
            <br></br>
            <li><b>Login</b>: log in to check PriceHostory.</li>
                   
        </div>

    )

}



    








