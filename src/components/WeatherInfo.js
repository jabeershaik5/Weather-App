import React from "react";
import { IoIosThermometer  } from "react-icons/io";
import { WiSunrise, WiSunset  } from "react-icons/wi";
import { FiDroplet,FiWind  } from "react-icons/fi";
import { FaTemperatureArrowDown,FaTemperatureArrowUp } from "react-icons/fa6";

const WeatherInfo = ({weather, error}) => {
    if(error){
        return(
            <div className=" flex items-center justify-center text-2xl text-white h-[225px]">{error}</div>
        )
    }
    return(
        <div className="w-[100%] h-[300px] ">
            <span className="flex justify-center text-2xl font-semibold text-white md:text-3xl"><p></p><p className="mx-2">{weather.name}</p></span>
            <div className="py-5 text-lg text-white md:text-xl">{weather.text}</div>
            <div className="grid grid-cols-3 place-items-center">
                <div>
                    <span className="h-[50px] w-[50px] inline-block rounded-full"><img src={weather.icon} alt="weathericon" /></span>
                </div>
                <div><p className="text-2xl font-semibold text-white md:text-4xl">{`${weather.avgtemp_c}\u00B0 C`}</p></div>
                <div className="flex flex-col my-8 space-y-4 text-sm text-white md:text-md">
                    <span className="flex space-x-1 md:space-x-2"><IoIosThermometer size="20" /><p>{`Feels: ${weather.feelslike_c}\u00B0 C`}</p></span>
                    <span className="flex space-x-1 md:space-x-2"><FiDroplet size="20" /><p>{`Humidity: ${weather.humidity}%`}</p></span>
                    <span className="flex space-x-1 md:space-x-2"><FiWind size="20"  /><p>{`Wind: ${weather.wind_kph} kph`}</p></span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-10 text-white place-items-center">
                <div className="flex flex-col space-y-3">
                <span className="flex space-x-2"><WiSunrise size="25" /><p className="text-sm">{`Rise: ${weather.sunrise}`}</p></span>
                <span className="flex space-x-2"><WiSunset  size="25" /><p className="text-sm">{`Set: ${weather.sunset}`}</p></span>
                </div>
                <div className="flex flex-col space-y-3">
                <span className="flex justify-start space-x-2"><FaTemperatureArrowUp  size="25" /><p className="text-sm">{`Low: ${weather.maxtemp_c}\u00B0 C`}</p></span>
                <span className="flex justify-start space-x-2 "><FaTemperatureArrowDown  size="25" /><p className="text-sm">{`Low: ${weather.mintemp_c}\u00B0 C`}</p></span>
                </div>   
            </div>
        </div>
    )
}
export default WeatherInfo