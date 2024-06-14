import React from "react";
const WeatherData = ({weather, error}) => {
    const dayOfWeek = (epoch) =>{
        const date = new Date(epoch * 1000);
        const days = ['Sun','Mon', "Tue", 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    }
    const hourNow = (epoch) => {
        const date = new Date(epoch*1000);
        const hours = date.getHours();
        const mins = date.getMinutes();
        const formattedHours = String(hours).padStart(2,'0');
        const formattedMinutes = String(mins).padStart(2,'0');
        const meridian = hours<12 ?"AM":"PM";
        return `${formattedHours}:${formattedMinutes} ${meridian}`;
    }
    if(error|| !weather.nextForecast){
        if(!weather.nextForecast){
            return(<div className='lg:py-10 md:px-5 lg:px-0 bg-indigo-700 w-[100%] h-[100vh] text-white text-2xl flex justify-center items-center'>Loading</div>)
        }
        return(
            <div className='lg:py-10 md:px-5 lg:px-0 bg-indigo-700 w-[100%] h-[100vh] text-white text-2xl flex justify-center items-center'>{error}</div>
        )
    }
    return(
        <div className='lg:py-10 md:px-5 lg:px-0 bg-indigo-700 w-[100%] h-[100vh]'>
            <div className="w-[100%] h-[80%] bg-indigo-700 lg:border-l-2 border-t-2 lg:border-t-0 border-white flex flex-col justify-center pt-20">
                <div className="pl-8">
                    <div className="text-white font-semibold border-b-2 border-white text-left w-[95%] pt-16 pb-2"><p>HOURLY FORECAST</p></div>
                        <div className="grid grid-cols-3 md:grid-cols-4">
                            {
                                weather.nextForecast&& weather.nextForecast.map(hour => (
                                    <div key={hour.time_epoch} className="flex flex-col items-center my-4 space-y-2 text-white lg:my-5">
                                        <span>{hourNow(hour.time_epoch)}</span>
                                        <img className="h-[35%] w-[35%] rounded-full inline-block" src={hour.condition.icon} alt="weather-icon" />
                                        <span>{`${hour.temp_c}\u00B0 C`}</span>
                                    </div>
                                ))
                            }
                        </div>
                </div>
                <div className="pl-8">
                    <div className="text-white font-semibold border-b-2 border-white text-left w-[95%] pt-10 pb-2"><p>DAILY FORECAST</p></div>
                    <div className="grid grid-cols-3 md:grid-cols-4 place">
                        {
                            weather.forecastdays&& weather.forecastdays.map(day => (
                                <div key={day.date_epoch} className="flex flex-col items-center my-4 space-y-2 text-white lg:my-5">
                                    <span>{dayOfWeek(day.date_epoch)}</span>
                                    <img className="h-[35%] w-[35%] rounded-full inline-block" src={day.icon} />
                                    <span>{`${day.avgtemp_c}\u00B0 C`}</span>
                                </div>
                            ))
                        }  
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherData