import React from "react";
import { useEffect, useState, useRef } from "react";
import { getData } from "./Service";
import happy from "./assets/happy.png";
import atmospheric from "./assets/atmospheric.png";
import direction from "./assets/direction.png";
import humidity from "./assets/humidity.png";
import upArrow from "./assets/upArrow.png";
import downArrow from "./assets/downArrow.png";
import search from "./assets/search.png";
import cloud from "./assets/cloud.jpg";
import snow from "./assets/snow.jpg";
import hot from "./assets/hot.jpg";

export const Weather = () => {
  const [city, setCity] = useState("Sarajevo");
  const [weather, setWeather] = useState(null);
  const [bgr, SetBgr] = useState(cloud);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(city);
      setWeather(data);

      if (data.temp > 19) SetBgr(hot);
      else if (data.temp < 4) SetBgr(snow);
      else SetBgr(cloud);
    };

    fetchData();
  }, [city]);

  const enterTextField = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const findCity = () => {
    setCity(inputRef.current.value);
  };

  return (
    <div style={{ backgroundImage: `url(${bgr})` }} className="bg-cover">
      {weather && (
        <div className=" flex items-center justify-center text-white h-screen w-screen ">
          <div className=" border-4 border-white py-10 px-5 bg-gradient-to-tr from-blue-900 to-blue-700">
            <div className="pb-7 flex justify-center items-center">
              <input
                onKeyDown={enterTextField}
                type="text"
                placeholder="Lokacija"
                ref={inputRef}
                className=" w-[220px] h-7 border-none p-2 rounded-xl font-bold text-black text-xl text-center"
              />
              <button onClick={findCity}>
                <img className="w-6 h-6 ml-1" src={search} alt="search" />
              </button>
            </div>
            <div className="pt-4 text-3xl text-center h-[180px] w-[250px] bg-red m-auto">
              <h3 className="font-bold">{`${weather.name}`}</h3>
              <img
                className="mx-auto h-[70px] w-[70px]"
                src={weather.iconURL}
                alt="weather icon"
              />
              <h1>{weather.temp.toFixed()} °C</h1>
            </div>
            <div className="grid ss:grid-cols-3 grid-cols-2 gap-3 text-xl pt-4 max-w-lg m-auto">
              <div>
                <div className="text-center pt-5">
                  <h3>Osjećaj</h3>
                  <img
                    className="w-7 h-7 m-auto my-2 "
                    src={happy}
                    alt="happyicon"
                  />
                  <p>{weather.feels_like.toFixed()} °C</p>
                </div>
              </div>
              <div>
                <div className="text-center px-4 pt-5">
                  <h3>Minimalna</h3>
                  <img
                    className="w-7 h-7 m-auto my-2"
                    src={downArrow}
                    alt="downArrow icon"
                  />
                  <p>{weather.temp_min.toFixed()} °C</p>
                </div>
              </div>
              <div>
                <div className="text-center pt-5">
                  <h3>Maksimalna</h3>
                  <img
                    className="w-7 h-7 m-auto my-2"
                    src={upArrow}
                    alt="upArrow icon"
                  />
                  <p>{weather.temp_max.toFixed()} °C</p>
                </div>
              </div>
              <div>
                <div className="text-center pt-5">
                  <h3>Vjetar</h3>
                  <img
                    className="w-7 h-7 m-auto my-2"
                    src={direction}
                    alt="direction icon"
                  />
                  <p>{(weather.speed * 1.60934).toFixed()} km/h</p>
                </div>
              </div>
              <div className="px-4 text-center pt-5">
                <h3>Pritisak</h3>
                <img
                  className="w-7 h-7 m-auto my-2"
                  src={atmospheric}
                  alt="atmospheric icon"
                />
                <p>{weather.pressure} mb</p>
              </div>
              <div className="text-center pt-5">
                <h3>Vlažnost</h3>
                <img
                  className="w-7 h-7 m-auto my-2"
                  src={humidity}
                  alt="humidity icon"
                />
                <p>{weather.humidity} %</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Weather;
