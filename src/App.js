import './App.css';
import Header from './components/Header';
import WeatherData from './components/WeatherData';
import { useEffect, useState } from 'react';
import {weatherDataFormat}from './components/RequestData/WeatherServices'


function App() {
  const [query, setQuery] = useState({q:"delhi", days:4});
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetching = async () =>{
      try{
        const data = await weatherDataFormat(query);
        setWeather(data);
        setError(null);
      }
      catch(error){
        setError(error.message);
      }
    }
    fetching();
  },[query]);
 
  return (
    <div className="App">
      <div className='grid lg:grid-cols-2 place-items-center'>
        <Header setQuery={setQuery} weather={weather} error={error} />
        <WeatherData weather={weather} error={error} />
      </div>
    </div>
  );
}

export default App;
