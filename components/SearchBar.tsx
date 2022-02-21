import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { XIcon } from "@heroicons/react/solid";



export default function SearchBar({ placeholder}) {

  const [filteredData, setFilteredData] = useState([]);
  const [focused, setFocused] = useState(false)
  const searchBar = useRef(null)

  useEffect(() => {

    window.addEventListener("keydown", e => {

      if (e.key === "Enter" && focused && searchBar) {

        window.open(`/search/${searchBar.current.value}`, '_self')
      }
    })
  })

  return (
    <>
      <div className="grid grid-flow-col place-items-center rounded-lg border-gray-300 border-2 px-5 py-3">
        <input
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="h-full w-full"
        placeholder={placeholder}
        ref={searchBar}
        />
      </div>
    </>
  )
}
