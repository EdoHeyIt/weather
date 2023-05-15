const API_KEY = `af4c71f81e485a836f8b5f827549495d
`;

const iconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}.png`;

const getData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, pressure, humidity, feels_like, temp_min, temp_max },
    wind: { speed },
    name,
  } = data;

  const { parameters, icon } = weather[0];

  return {
    weather,
    temp,
    pressure,
    humidity,
    feels_like,
    temp_min,
    temp_max,
    speed,
    name,
    parameters,
    iconURL: iconUrl(icon),
  };
};

export { getData };
