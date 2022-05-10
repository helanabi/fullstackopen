import axios from "axios";
import { useEffect, useState } from "react";

function Weather({ data }) {
  if (data) {
    return (
      <div>
        <p>Temperature: {data.temp} Celccius</p>
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
        />
        <p>Wind: {data.wind} m/s</p>
      </div>
    );
  } else {
    return <p>Loading data...</p>;
  }
}

function Country({ country }) {
  const capital = country.capital[0];
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather" +
          `?q=${capital}` +
          `&appid=${apiKey}` +
          `&units=metric`
      )
      .then(({ data }) =>
        setWeather({
          temp: data.main.temp,
          icon: data.weather[0].icon,
          descriptionn: data.weather[0].description,
          wind: data.wind.speed,
        })
      );
  }, [capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital.join(", ")}
        <br />
        Area: {country.area}
        <br />
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>
      <p style={{ fontSize: "10rem", margin: "1rem 0" }}>{country.flag}</p>
      <div>
        <h2>Weather in {capital}</h2>
        <Weather data={weather} />
      </div>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(resp => setCountries(resp.data));
  }, []);

  const filterCountries = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter)
  );

  return (
    <div>
      <label>
        Find countries <input onChange={filterCountries} />
        <br />
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map(country => (
            <span key={country.name.common}>
              <br />
              {country.name.common}{" "}
              <button
                onClick={() => setFilter(country.name.common.toLowerCase())}
              >
                Show
              </button>
            </span>
          ))
        ) : filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          <p>No matches found!</p>
        )}
      </label>
    </div>
  );
}

export default App;
