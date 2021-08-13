import React, { useState } from "react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Line } from 'react-chartjs-2';


export default function Query() {

    //set table display(row)
    const [rowData, setRowData] = useState([]);
    //set chart display
    const [lineData, setLineData] = useState({});
    //return error message
    const [catchError, setCatchError] = useState({});
    //set searchbar
    const [innerSearch, setInnerSearch] = useState("");

    //columns of table
    const columns = [
        { headerName: "timestamp", field: "timestamp", sortable: true, filter: "agDateColumnFilter" },
        { headerName: "symbol", field: "symbol", sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "name", field: "name", sortable: true },
        { headerName: "industry", field: "industry", sortable: true },
        { headerName: "open", field: "open", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "high", field: "high", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "low", field: "low", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "close", field: "close", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "volumes", field: "volumes", sortable: true }
    ]

    //every time i click the button return value if value exist
    const handleClick = () => {

        //serchbar cannot be null
        if (!innerSearch) {
            alert('Search bar cannot be empty, please try again')
            return;
        }

        //url
        const url = `http://131.181.190.87:3000/stocks/${innerSearch}`

        fetch(url)
            .then(res => res.json())
            .then(res => {


                //if res have error, return error from res to display, set rowdata and linedata are null
                if (res.error) {
                    setCatchError(res)
                    setRowData([])
                    setLineData({})


                //otherwise res return the put the data into table and line chart
                } else {

                    // res return object type, then default object to array and display to table(row)
                    const tableArr = [res];  
                    setCatchError({})


                    //res return object and then let these objects be array objects to display on line chart
                    const { open, high, low, close } = res
                    const lineArr = [open, high, low, close]

                    //set line chart
                    const lineChart = {
                        labels: ['open', 'high', 'low', 'close'],
                        datasets: [
                            {
                                label: 'Price',
                                data: lineArr,
                                pointBorderColor: "#fff",
                                borderColor: "#fff",
                                pointHoverBorderColor: "#fff",
                                borderJoinStyle: 'miter',

                            }
                        ],

                    }


                    setRowData(tableArr)
                    setLineData(lineChart)
                }

            })
    }

    return (

        
        //table size
        <div className="ag-theme-balham" style=
            {{
                width: 1500,
                height: 150,
                position: "absolute",
                left: 150

            }}>

            {/* searchbar */}
            <div className="searchBar">
                
                <p1 className="heading-size">Please input a particluar stock by symbol to get latest data </p1>
                <br></br>
                <br></br>
                <label htmlFor="search">Campany: </label>
                <input className="searchoption"
                    type="Text"
                    value={innerSearch}
                    onChange={(e) => setInnerSearch(e.target.value)}
                    placeholder="Ready to search" />

                <button className="searchButton" onClick={handleClick}>search</button>
            
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

            <br></br>
            <br></br>
            <br></br>

            {/* display the line chart by foloow code */}
            <Line data={lineData}

                //set title and legand and scales 
                options={{

                    //set title name and color
                    title: {
                        display: true,
                        text: "The   line   of   latest   Price   Trendency   ",
                        fontColor: '#fff',
                        fontSize: 17
                    },

                    //set legand size and color
                    legend: {
                        labels: {
                            fontColor: '#fff',
                            fontSize: 15

                        }

                    },

                    //set xAxes and yAxes tick color
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

    )
}