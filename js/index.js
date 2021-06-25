'use strict';

const searchLocationEl = document.querySelector('.search-location');
const loadingTitleListEl = document.querySelector('.loading-title-list');
const loadingBoxEl = document.querySelector('#loading-box');

function checkLocation() {
    const location = localStorage.getItem('location');

    const { WEATHER_API_KEY, KAKAO_API_KEY } = config;

    function loadingIndicator() {
        let num = 1;

        const loadingTitleFirstEl = loadingTitleListEl.firstElementChild.cloneNode(true);
        loadingTitleListEl.appendChild(loadingTitleFirstEl);

        return function () {
            const unit = 80;
            const time = 4;
            const delay = Number(time + '00');

            loadingTitleListEl.style.top = `-${unit * num}px`;

            if (num === 3) {
                setTimeout(function () {
                    loadingTitleListEl.style.transition = 'none';
                    loadingTitleListEl.style.top = `0px`;

                    num = 1;
                }, delay);
            } else {
                loadingTitleListEl.style.transition = `top 0.${time}s cubic-bezier(0.03, 0.01, 0.18, 0.99)`;
            }

            num++;
        };
    }

    const indecator = loadingIndicator();
    const indecatorInterval = setInterval(indecator, 600);

    function removeIndecator() {
        setTimeout(() => {
            loadingBoxEl.classList.remove('on');

            clearInterval(indecatorInterval);
        }, 1500);
    }

    // 접속한 적이 있는 경우
    if (location) {
        loadingTitleListEl.style.transition = 'none';
        loadingTitleListEl.style.top = '0px';
        loadingBoxEl.classList.add('on');
        removeIndecator();

        searchLocationEl.classList.remove('on');

        const location = JSON.parse(localStorage.getItem('location'));
        const { location_name, location_x, location_y } = location;

        function innerDataText(element, value) {
            element.innerText = value;
        }

        function weatherAPI() {
            const exclude = 'minutely,hourly,alert';
            const protocol = window.location.protocol.indexOf('https') !== -1 ? 'https' : 'http';
            const url = `${protocol}://api.openweathermap.org/data/2.5/onecall?lat=${location_y}&lon=${location_x}&exclude=${exclude}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const { current, daily } = res;

                    const weekData = daily.filter((item, idx) => idx !== 0 && idx !== 7);
                    const weekWeatherEl = document.querySelector('.week-weather');

                    weekWeatherEl.innerHTML = '';

                    weekData.map((item) => {
                        const { dt, temp, weather } = item;
                        const date = new Date(dt * 1000);
                        const days = date.toLocaleString('en-us', { weekday: 'short' }).toUpperCase();

                        weekWeatherEl.innerHTML += `
                        <li>
                            <div 
                                class="day ${days === 'SAT' ? 'saturday' : days === 'SUN' ? 'sunday' : ''}" 
                            >
                                ${days}
                            </div>
                            <div class="week-weather-icon">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                <path
                                    ${weatherIcon(weather[0].icon)}
                                </svg>
                            </div>
                            <div class="week-temp">${Math.round(temp.day)}°</div>
                        </li>
                        `;
                    });

                    document.querySelector('.weather-icon').innerHTML = `
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%" 
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        ${weatherIcon(current.weather[0].icon)}
                    </svg>
                `;
                    innerDataText(document.querySelector('.timezone'), location_name);
                    innerDataText(document.querySelector('.temperature'), Math.round(current.temp));
                    innerDataText(document.querySelector('.wind-speed'), current.wind_speed);
                    innerDataText(document.querySelector('.humidity'), current.humidity);
                    innerDataText(document.querySelector('.low-temp'), Math.round(daily[0].temp.min));
                    innerDataText(document.querySelector('.high-temp'), Math.round(daily[0].temp.max));

                    removeIndecator();
                })
                .catch((err) => console.log(err));
        }

        weatherAPI();
    } else {
        setTimeout(() => {
            loadingBoxEl.classList.remove('on');
            clearInterval(indecatorInterval);
        }, 1500);

        searchLocationEl.classList.add('on');

        const locationList = document.querySelector('.location-list');
        const searchLocationInputEl = searchLocationEl.querySelector('.search-location-input');
        const searchLocationBtnEl = searchLocationEl.querySelector('.search-icon');

        searchLocationInputEl.value = '';
        locationList.innerHTML = '<li class="location-list-help">검색어를 입력해주세요</li>';

        function searchLocation(value) {
            const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${value}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.documents.length) {
                        locationList.innerHTML = '';
                        res.documents.forEach((item) => {
                            locationList.innerHTML += `
                    <li 
                        class="location-ltem"
                        onclick='saveLocation("${item.address_name}","${item.x}","${item.y}")'
                    >
                        ${item.address_name}
                    </li>`;
                        });
                    } else {
                        locationList.innerHTML = '<li class="location-list-help">검색결과가 없습니다</li>';
                    }
                })
                .catch((err) => console.log(err));
        }

        searchLocationInputEl.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                searchLocation(e.target.value);
                return;
            }
        });
        searchLocationBtnEl.addEventListener('click', function () {
            const searchValue = searchLocationInputEl.value;
            searchLocation(searchValue);
        });
    }
}
checkLocation();

(() => {
    const settingIcon = document.querySelector('.setting-icon');
    const settingList = document.querySelector('.setting-list-box');

    settingIcon.addEventListener('click', function () {
        if (!settingList.classList.contains('on')) {
            settingList.classList.add('on');
        } else {
            settingList.classList.remove('on');
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.className.baseVal !== 'setting-icon') {
            settingList.classList.remove('on');
        }
    });
})();
