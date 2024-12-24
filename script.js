function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
let cityName = document.getElementById("cityName").value;

function fetchCities(cityName) {
  const API_key = import.meta.env.VITE_API_KEY;
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=6&appid=${API_key}`;

  let containerEl = document.querySelector(".container");
  function createDivs(data) {
    //declaring the function which will dynamically gen divs
    containerEl.innerHTML = "";
    data.forEach((item) => {
      let temp = document.createElement("div");
      temp.classList.add("suggestion-div");
      temp.innerHTML = `
      <p class="text-kuromiLightPink font-Outfit text-item bg-red">${item.name},${item.state}</p>
       <p class="text-xs text-kuromiBlack">${item.country}</p>`;
      containerEl.appendChild(temp);

      temp.addEventListener("click", () => {
        document.getElementById(
          "cityName"
        ).value = `${item.name},  ${item.country}`;
        containerEl.innerHTML = "";
        def(item.lat, item.lon);
      });
    });
  }
  // ***********************************
  async function abc(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const extractedData = data.map((elem) => ({
        name: elem.name,
        lat: elem.lat,
        lon: elem.lon,
        country: elem.country,
        state: elem.state,
      }));
      createDivs(extractedData); //calling the generated divs
    } catch (error) {
      console.log(error);
    }
  }
  abc(url);
  //second req to display weather
  async function def(lat, lon) {
    try {
      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
      const weather_response = await fetch(weather_url);
      const weather_data = await weather_response.json();
      //extract the data we want to show

      const extractedWeatherData = weather_data.weather.map((item) => ({
        weather: {
          main: item.main,
          description: item.description,
          icon: item.icon,
        },
        main: {
          temp: weather_data.main.temp,
          feels_like: weather_data.main.feels_like,
          temp_min: weather_data.main.temp_min,
          temp_max: weather_data.main.temp_max,
        },
      }));
      const weatherIcon = extractedWeatherData[0].weather.icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const weatherText = extractedWeatherData[0].weather.description;
      const weatherStat = extractedWeatherData[0].main.temp - 273;
      const feels_like = extractedWeatherData[0].main.feels_like - 273;
      document.getElementById(
        "weather-status"
      ).innerHTML = `<p class="text-kuromiLightPink font-Outfit">Currently it is: ${weatherStat.toFixed(
        2
      )} C <br> Feels like: ${feels_like.toFixed(2)}C</p>
                      `;

      document.getElementById("weather-txt").textContent = weatherText;
      document.getElementById("weather-icon").src = iconUrl;
    } catch (error) {
      console.log(error);
    }
  }
}

//debouncing
const debouncedfetchCities = debounce(fetchCities, 400);
document.getElementById("cityName").addEventListener("input", (event) => {
  const cityName = event.target.value;
  if (cityName.trim()) {
    debouncedfetchCities(cityName);
  }
});
