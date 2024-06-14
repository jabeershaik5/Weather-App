import React, { useEffect, useRef, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { IoSearchSharp, IoLocationSharp } from "react-icons/io5";

const cities = [
    {   id:1,
        name:"Rome"
    },
    {   id:2,
        name:"London"
    },
    {   id:3,
        name:"New York"
    },
    {   id:4,
        name:"Moscow"
    },
];
const Header = ({setQuery, weather, error,query}) =>{
    const [city, setCity] = useState("");
    const cityInput = useRef("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        setCity(cityInput.current.value);
        cityInput.current.value = "";
    }
    useEffect(()=>{
        if(city!== ""){
            setQuery({q:city, days:4});
        }
    },[city, setQuery]);
    return(
        <div className="h-[100vh] bg-indigo-700 px-16 py-10 w-[100%] overflow-hidden">
            <div className="">
                <ul className="flex justify-center space-x-10 font-semibold text-white">
                    {cities.map(city => <li className="cursor-pointer" key={city.id} onClick={e => setQuery({q :city.name, days:4})}>{city.name}</li>)}
                </ul>
            </div>
            <div className="my-10">
                <form onSubmit={handleSubmit} className="flex items-center justify-center text-center">
                    <input placeholder="Search..." className="p-2 rounded-lg w-[300px] outline-none" ref={cityInput} />
                    <div className="mx-5">
                        <div className="flex space-x-3">
                        <IoSearchSharp size="25" className="text-white cursor-pointer" name="search" onClick={handleSubmit}/>
                        <IoLocationSharp size="25" className="text-white cursor-pointer" />
                        </div>
                    </div>
                </form>
            </div>
            <WeatherInfo weather={weather} error={error} />
        </div>
    )
}
export default Header