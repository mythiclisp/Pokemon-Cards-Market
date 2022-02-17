import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { XIcon } from "@heroicons/react/solid";

export default function SearchBar({ placeholder, data }) {

  const [filteredData, setFilteredData] = useState([1]);
  const [wordEntered, setWordEntered] = useState("");

  function filterData(e) { 
    
    console.log(e.target.value)
  }

  return (
    <>
      <div className="w-64 grid grid-flow-col place-items-center rounded-lg border-gray-300 border-2 px-5 py-3 m-64">
        <input type="text" className="h-full w-full" placeholder={placeholder} onChange={filterData} />
        {filterData.length > 1 ? 
        'X' :
        <SearchIcon />
        }
      </div>
    </>
  )
}
