// const BASE_URL = "https://api.openweathermap.org/data/2.5"; /openweather
const BASE_URL = "https://api.weatherapi.com/v1"; 

const gettime = () =>{
    const date = Date.now();
    return Math.floor(date/1000);
}
const extactDailyForecastArray = (data) =>{
    const forecastdays = data.forecast.forecastday.map(({date_epoch, day: {avgtemp_c, condition:{icon,text}}}) =>({
        date_epoch,
        avgtemp_c,
        icon,
        text
    }));
    return {forecastdays};
};
const extractHourlyForecastArray = (data) => {
 const forecastHours = data.forecast.forecastday[0].hour;
 const time = gettime();
 const nextForecast = [];
 for(let i=0;i<forecastHours.length;i++){
    if(forecastHours[i].time_epoch > time){
        if(nextForecast.length <4){
            nextForecast.push(forecastHours[i]);
        }
    }
 }
 return {nextForecast}
}
const extractWeatherData = (data) =>{
    const {
        current:{feelslike_c,humidity, wind_kph, condition:{text,icon}},
        location:{name, localtime},
        forecast: {forecastday: [firstDayForecast]}
    } = data;
    const {
        day:{avgtemp_c, maxtemp_c, mintemp_c},
        astro:{sunrise,sunset}
    } = firstDayForecast;

    return {feelslike_c,humidity, wind_kph, name, localtime, avgtemp_c, maxtemp_c, mintemp_c,text,icon,sunrise,sunset}
}


const weatherServices = async(searchParams) =>{
    const url = new URL (BASE_URL + '/forecast.json');
    url.search = new URLSearchParams({key:(process.env.REACT_APP_API_KEY), ...searchParams});
        try{
            const response = await fetch(url);
            let errorMessage = null;
            if(!response.ok){
                try{
                    const errorData = await response.json();
                    errorMessage = errorData.error.message;
                }
                catch(error){
                    errorMessage = await response.text();
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            throw new Error(error);
        }
}

const weatherDataFormat = async(searchParams) =>{
    let extractedWeatherData = null;
    let extractedDailyForecastArray = null;
    let extractedHourlyForecastArray = null;

    try{
        const response = await weatherServices(searchParams);
        if(!response){
            throw new Error("something went wrong");
        }
        extractedWeatherData = extractWeatherData(response);
        extractedDailyForecastArray = extactDailyForecastArray(response);
        extractedHourlyForecastArray = extractHourlyForecastArray(response);
    }
    catch(error){
        throw new Error(error.message);
    }
    
    return {...extractedWeatherData, ...extractedDailyForecastArray, ...extractedHourlyForecastArray};
}


export {weatherDataFormat};
export default weatherServices