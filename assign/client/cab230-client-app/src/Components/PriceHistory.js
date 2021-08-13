import React, { useState, useEffect } from "react"

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


import { Line } from 'react-chartjs-2'
//import {Login} from "login.js";



export default function PriceHistory() {


    //return error message from res
    const [catchError, setCatchError] = useState({});
    //set table row
    const [rowData, setRowData] = useState([]);
    //set line dataset
    const [lineData, setLineData] = useState({});
    //whether login
    const [isLogin, setIsLogin] = useState(false);
    //set search bar
    const [innerSearch, setInnerSearch] = useState('');
    //set previous date
    const [from, setFrom] = useState(`2020-03-15T00:00:00.000Z`);
    //set current date
    const [to, setTo] = useState('');


    //const [lineData, setlineData] = useState({})

    //chech login state
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, []);


    //set searchbar by symbol
    const handClick = () => {

        //only login 
        var token = localStorage.getItem('token')

        //searchbar cannot be null
        if (!innerSearch) {
            alert('company name is required, please try again')
            return
        }

        //url
        const url = `http://131.181.190.87:3000/stocks/authed/${innerSearch}?from=${from}&to=${to}`

        //fetch from res(only login)
        return fetch(url, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((res) => {


                //if res return array, then put value into rowdata , error is null,    
                if (Array.isArray(res)) {
                    setRowData(res)
                    setCatchError({})

                    const { open, high, low, close } = res
                    const lineArr = [ open, high, low, close]
                    const lineHistry = {
                        labels: [ 'open', 'high', 'low', 'close'],
                        datasets: [
                            {
                                label: 'Price',
                                data: lineArr,
                                pointBorderColor: "#fff",
                                borderColor: "#fff",
                                pointHoverBorderColor: "#fff",
                                borderJoinStyle: 'miter',

                            }
                        ]
                        
                        // ,
                        // datasets: [
                        //     {
                        //         label: 'Price',
                        //         data: lineArr,
                        //         pointBorderColor: "#fff",
                        //         borderColor: "#fff",
                        //         pointHoverBorderColor: "#fff",
                        //         borderJoinStyle: 'miter',

                        //     }
                        // ]

                    }
                    setLineData(lineHistry)



                    //otherwise rowdata is null, invole error message from res 
                } else {
                    setRowData([])
                    setCatchError(res)

                }

            })


    }




    //columns of table
    const columns = [
        { headerName: "timestamp", field: "timestamp", sortable: true, filter: "agDateColumnFilter" },
        { headerName: "symbol", field: "symbol", sortable: true, filter: 'agTextColumnFilter'},
        { headerName: "name", field: "name", sortable: true },
        { headerName: "industry", field: "industry", sortable: true },
        { headerName: "open", field: "open", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "high", field: "high", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "low", field: "low", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "close", field: "close", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "volumes", field: "volumes", sortable: true }
    ]

    return (
        <div>

            {
                //if login, then return below
                isLogin ?

                    // table size
                    <div className="ag-theme-balham" style=
                        {{
                            width: 1700,
                            height: 200,

                        }}>

                        {/* campanyname by symbol  (it is compulsory)  */}
                        <div className="searchBar-history">
                            
                            <label htmlFor="campany-name"> campany:  </label>
                            <input className="searchoption"
                                type="Text"
                                value={innerSearch}
                                onChange={(e) => setInnerSearch(e.target.value)}
                                placeholder="Ready to search" />
                            
                        </div>

                        {/* initial date requirment (not the compulsory)*/}
                        <div className="from">
                            
                            <label htmlFor="previousdate"> From: </label>
                            <input className="previous-date"
                                type="date"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}

                            />
                            
                        </div>


                        {/* second date requirement （not the compulsory）*/}
                        <div className="to">
                            
                            <label htmlFor="currentdate">   to: </label>
                            <input className="current-date"
                                type="date"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}

                            />

                            <button type="button" onClick={handClick} className="currentdate-button" id="currentdate" >confirm</button>
                            
                        </div>


                        <br></br>
                        <br></br>
                        <br></br>

                        {/* if have error , return error message from res */}
                        {catchError.error ? <p>{catchError.message}</p> : ''}


                        {/* display the table by follow code */}
                        <AgGridReact
                            columnDefs={columns}
                            rowData={rowData}
                            pagination={true}
                            paginationPageSize={50}
                        />


                        {/* display the line chart by foloow code */}
                        <Line data={lineData}
                            options={{
                                title: {
                                    display: true,
                                    text: "The   line   of   current  Price   Trendency   (ALL) ",
                                    fontColor: '#fff',
                                    fontSize: 17
                                },

                                legend: {
                                    labels: {
                                        fontColor: '#fff',
                                        fontSize: 15

                                    }

                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            fontColor: '#fff',
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: '#fff',
                                        }
                                    }]
                                }
                            }}
                        />


                    </div>

                    :

                    //otherwise return to no-login state
                    <div className='logout-state'>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h>Please check priceHistory after login</h>
                    </div>

            }

        </div>

    )


}

