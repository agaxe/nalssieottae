import { fetcher } from './fetcher.js';
import { getWeatherIcon } from './getWeatherIcon.js';

function getSvgTag(children) {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
    ${children}
    </svg>
  `;
}

const excludeValues = 'minutely,hourly,alert';

async function setWeather() {
  const location = JSON.parse(localStorage.getItem('location'));
  const { location_name, location_x, location_y } = location;

  // eslint-disable-next-line no-undef
  const { WEATHER_API_KEY } = config;
  const url = `${window.location.protocol}//api.openweathermap.org/data/2.5/onecall?lat=${location_y}&lon=${location_x}&exclude=${excludeValues}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;

  try {
    const data = await fetcher(url);
    const { current, daily } = data;

    const weekList = daily.filter((_, idx) => idx !== 0 && idx !== 7);
    const $weekWeather = document.querySelector('.week-weather');

    $weekWeather.textContent = '';

    weekList.forEach(item => {
      const { dt, temp, weather } = item;
      const date = new Date(dt * 1000);
      const days = date
        .toLocaleString('en-us', { weekday: 'short' })
        .toUpperCase();

      const $li = document.createElement('li');
      const $day = document.createElement('div');
      const $weatherIcon = document.createElement('div');
      const $weekTemp = document.createElement('div');

      // day
      const dayClasses = {
        SAT: 'saturday',
        SUN: 'sunday'
      };
      $day.classList.add('day');
      dayClasses[days] && $day.classList.add(dayClasses[days]);
      $day.innerText = days;

      // weatherIcon
      $weatherIcon.classList.add('week-weather-icon');
      $weatherIcon.innerHTML = getSvgTag(getWeatherIcon(weather[0].icon));

      // weekTemp
      $weekTemp.classList.add('week-temp');
      $weekTemp.innerText = `${Math.round(temp.day)}°`;

      // append
      $li.appendChild($day);
      $li.appendChild($weatherIcon);
      $li.appendChild($weekTemp);

      $weekWeather.appendChild($li);
    });

    const $mainWeatherIcon = document.querySelector('.weather-icon');
    $mainWeatherIcon.innerHTML = getSvgTag(
      getWeatherIcon(current.weather[0].icon)
    );

    document.querySelector('.timezone').innerText = location_name;
    document.querySelector('.temperature').innerText = Math.round(current.temp);
    document.querySelector('.wind-speed').innerText = current.wind_speed;
    document.querySelector('.humidity').innerText = current.humidity;
    document.querySelector('.low-temp').innerText = Math.round(
      daily[0].temp.min
    );
    document.querySelector('.high-temp').innerText = Math.round(
      daily[0].temp.max
    );
  } catch (error) {
    console.log('error', error);
  }
}

export { setWeather };
