import { CardHeader, Typography } from "@material-tailwind/react";
// import { ReactDOM, useState } from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";



const Header= ({title,buttonValue,icon,color})=>{

    const [searchTerm, setSearchTerm] = useState("");
    // const [filteredData, setFilteredData] = useState([]);
    const linkStyle = {
        backgroundColor: "#F2F2F2",
        height:"2.75rem",
        color: "#183087",
        marginLeft: "1rem",
        padding: ".625rem",
        borderRadius: "8px",
      };

    return (
        <CardHeader color={color} variant="" className="shadow-none h-26 w-full mr-0 items-center mt-0 p-6  rounded-4" >
            <div className="h-11 w-full flex justify-end  items-center relative">
                <Typography className="text-themeclr1 absolute right-0 text-xl">{title}</Typography>
                <input
                    className="h-full rounded-md p-1 m-0  pr-2 pl-6 ml-6 text-gray-900 focus:outline-none"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{backgroundColor: "#F2F2F2"}}
                />
                 <div className="py-2  mt-0">
                    <Link
                        to={`/dashboard/Tutorials/create`}
                        className="flex justify-center items-center text-sm"
                        style={linkStyle}
                    >
                       ثبت {buttonValue} جدید
                       <img src={icon} alt="" />
                    </Link>
                </div>
            </div>
      </CardHeader>
    );
}

export default Header;
