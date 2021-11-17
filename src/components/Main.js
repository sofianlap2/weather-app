import React, { useState, useEffect } from 'react';
import {data} from '../utils/data';
import axios from 'axios';
import '../App.css';

const Main = () => {

    const [locationSearch, setLocationSearch] = useState('');
    const [locations, setLocations] = useState([]);
    const [apiResult, setApiResult] = useState();

    const key = "2ed4d21b46bddb3381950e4711804a6c";
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${locationSearch}&appid=${key}`;

    useEffect(() => {

        axios.get(api).then((response) => {
            setApiResult(response.data)
        }).catch(err=> console.log(err));

        //setApiResult(data);
    }, [api, locationSearch])

    const disabledSearch = locationSearch.trim() === '';

    const searchHandler = (e) => {
        setLocationSearch(e.target.value)
    }

    const addLocation = (e) => {
        e.preventDefault();
        setLocations([...locations, locationSearch]);
        setLocationSearch('');
    }

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    return (
        <div className="weather-container">
            <h1>Get your city weather</h1>

            <form className="weather-form">
                <input className="search-inp" value={locationSearch} onChange={searchHandler} type="text" placeholder="search a city"></input>
                <button className="search-btn" onClick={addLocation} disabled={disabledSearch}>Search</button>
            </form>

            <div className="weather-card">
                <ul className="weather-list">
                    <li className="weather-info">{apiResult ? apiResult.name : 'null'}</li>
                    <li className="weather-info">{today.toDateString()}</li>
                    <li className="weather-info">{apiResult ? Math.round(apiResult.main.temp - 273.15) + "°C" : 'null'}</li>
                    <li className="weather-info">{apiResult ? apiResult.weather[0].description : 'null'}</li>
                </ul>
            </div>
        </div>
    )
}

export default Main
