import axios from "axios";
import Icons from "./components/Icons";
import backgroundWeather from "./assets/img-weather.jpg";
import { useCallback, useState } from "react";

export type Props = {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  dt?: number;
};

function App() {
  const [data, setData] = useState<Props>({
    name: "",
    main: {
      feels_like: 0,
      humidity: 0,
      temp: 0,
    },
    wind: {
      speed: 0,
    },
    weather: [
      {
        icon: "",
        main: "",
      },
    ],
  });
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=65c3c0cccd9f4b6a9e7dd0106ee5371f&units=metric`;

  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=65c3c0cccd9f4b6a9e7dd0106ee5371f`;
  //const WEATHER_IMG = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const searchLocation = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      await axios.get(url).then((response) => {
        setData(response.data);
        console.log("DATA", response.data);
        setIcon(data.weather[0].icon);
      });
      setLocation("");
    }
  };

  const handleTime = () => {
    const timeStamp = data.dt || 0;
    const convertData = new Date(timeStamp * 1000).toLocaleString("pt-BR");
    const week = new Date(timeStamp * 1000).toLocaleString("pt-BR", {
      weekday: "long",
    });
    return { convertData, week };
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundWeather})` }}
      className="w-full h-[100vh] py-20 bg-cover"
    >
      <div className="flex justify-center">
        <input
          className="mt-20 rounded py-2 px-2"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUpCapture={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {/* Other stats */}
      <div className="flex justify-center max-w-6xl mx-auto mt-20 bg-slate-900 bg-opacity-60 rounded-xl py-20">
        <div className="flex justify-center flex-col mr-10">
          <p className="px-10 text-8xl font-bold text-white	">
            {data.main.temp}º F
          </p>

          {data.dt && (
            <div>
              <p className="px-10 font-sans font-nunito text-4xl	text-white mb-1">
                {handleTime().convertData}
              </p>
              <p className="px-10 font-sans font-nunito text-4xl	text-white mb-4">
                {handleTime().week}
              </p>
            </div>
          )}
        </div>
        <div className="text-white font-semibold">
          <div className="ml-10">
            {/* {data.weather[0].icon !== '' && <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icon-weather" />}
             */}
            {/* <p className="flex justify-end text-4xl">
               {data.main.feels_like}
             </p> */}
            <p className="flex justify-center text-2xl mt-4">Feels Like</p>
            <img
              className=""
              src={Icons(data.weather[0].main)}
              alt="icon-weather"
            />

            <div className="grid grid-cols-3 gap-2 mt-10 border rounded-lg p-2">
              <div className="">
                teste 01
                <p>teste</p>
              </div>
              <div className="">teste 02</div>
              <div className="">teste 03</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
