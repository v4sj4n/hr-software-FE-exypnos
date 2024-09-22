import { useState, useEffect } from "react";
import axios from "axios";
import style from './../style/weather.module.css';
import image1 from './../../../../public/Images/s1.webp';
import image2 from './../../../../public/Images/s2.webp';
import image3 from './../../../../public/Images/s3.webp';
import image4 from './../../../../public/Images/s4.jpg';
import image5 from './../../../../public/Images/s5.jpg';

const getBackgroundImage = (description: string) => {
    switch (description.toLowerCase()) {
        case "clear sky":
            return image1;
        case "few clouds":
        case "scattered clouds":
        case "broken clouds":
            return image2;
        case "rain":
        case "shower rain":
            return image3;
        case "thunderstorm":
            return image4;
        case "snow":
            return image5;
        default:
            return image2;
    }
};

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}

const Weather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const API_KEY = "ae7dda8ea8fa8b8d83e59fb0172ec1ed";

    const getWeatherForTirana = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=Tirana&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching the weather data:", error);
            alert("Failed to fetch weather data for Tirana!");
        }
    };

    useEffect(() => {
        getWeatherForTirana();
    }, []);

    return (
        <div className={style.container}>
            {weatherData && (
                <div
                    className={style.weatherApp}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '10px',
                    }}
                >
                    <div className={style.weatherHeader}>
                        <h2>{weatherData.name}</h2>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>

                    <div
                        style={{
                            width: '150px', 
                            height: '150px', 
                            backgroundImage: weatherData
                                ? `url(${getBackgroundImage(weatherData.weather[0].description)})`
                                : 'none',
                            backgroundSize: 'contain', 
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    ></div>

                    <div className={style.mainWeather}>
                        <div className={style.weatherDetails}>
                            <p>Temp: {Math.round(weatherData.main.temp)} °C</p>
                            <p>Wind: {weatherData.wind.speed} km/h</p>
                            <p>Humidity: {weatherData.main.humidity} %</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
