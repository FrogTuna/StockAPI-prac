import React, { useState, useEffect } from "react"


import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export default function Stock() {


    //set table display(row)
    const [rowData, setRowData] = useState([]);
    
    //set searchbar
    const [innerSearch, setInnerSearch] = useState("");

    //return error message (object type)
    const [catchError, setCatchError] = useState({});


    //columns of table
    const columns = [

        { headerName: "name", field: "name", sortable: true },
        { headerName: "symbol", field: "symbol", sortable: true },
        { headerName: "industry", field: "industry", sortable: true, filter: 'agTextColumnFilter' }

    ]

    //url
    const url_stock = `http://131.181.190.87:3000/stocks/symbols`
    const url_template = `http://131.181.190.87:3000/stocks/symbols?industry=${innerSearch}`


    //every time i click the button return value if value exist
    const handleClick = () => {

        //searchBar cannot be null
        if (!innerSearch) {

            alert('Search bar cannot be empty, please try again')
            return;

        }

        //fetch data
        fetch(url_template)
            .then((res) => res.json())
            .then((res) => {
                //if res have error, return error from res to display
                if (res.error) {
                    setCatchError(res);
                    setRowData([]);
                }
                //otherwise return object array from res
                else {
                    setRowData(res);
                    setCatchError({});
                }
            })



    };

    //to show all kind of industry in the table 
    useEffect(() => {

        fetch(url_stock)
            .then((res) => res.json())
            .then((res) =>  setRowData(res))
            
    }, [url_stock])



    return (

        

        
        <div className="ag-theme-balham" style=
            {{
                width: 650,
                height: 500,
                position: "absolute",
                left: 500

            }}>

            {/* search bar and button */}
            <div className="searchBar">
                
                <p1 className="heading-size">Please input a particluar industry</p1>
                <br></br>
                <br></br>
                <label htmlFor="search">Industry: </label>
                <input className="searchoption"
                    type="text"
                    placeholder="Ready to search"
                    value={innerSearch}
                    onChange={(e) => setInnerSearch(e.target.value)}
                />

                <button className="searchButton" onClick={handleClick}>Search</button>
                
            </div>
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

        </div>

        
        
    )
}
