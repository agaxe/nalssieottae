import { $searchLocation } from './elements.js';
import { checkLocation } from './checkLocation.js';
import { fetcher } from './fetcher.js';

// eslint-disable-next-line no-undef
const { KAKAO_API_KEY } = config;

function initWeather() {
  $searchLocation.classList.add('on');

  const $locationList = document.querySelector('.location-list');
  const $searchLocationInput = $searchLocation.querySelector(
    '.search-location-input'
  );
  const $searchLocationBtn = $searchLocation.querySelector('.search-icon');

  // 검색 input 영역
  $searchLocationInput.value = '';

  const helpItem = document.createElement('li');
  helpItem.classList.add('location-list-help');
  helpItem.innerText = '검색어를 입력해주세요';

  $locationList.innerHTML = '';
  $locationList.append(helpItem);

  async function searchLocation(value) {
    try {
      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${value}`;
      const data = await fetcher(url, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`
        }
      });

      //* 검색 결과가 없는 경우
      if (!data.documents.length) {
        const $item = document.createElement('li');

        $item.classList.add('location-list-help');
        $item.innerText = '검색결과가 없습니다';

        $locationList.innerHTML = '';
        $locationList.appendChild($item);
        return;
      }

      $locationList.innerHTML = '';
      data.documents.forEach(item => {
        const { address_name, x, y } = item;

        const $item = document.createElement('li');

        $item.classList.add('location-ltem');
        $item.innerText = address_name;

        $item.addEventListener('click', () => {
          const location = {
            location_name: address_name,
            location_x: x,
            location_y: y
          };

          localStorage.setItem('location', JSON.stringify(location));
          checkLocation();
        });

        $locationList.appendChild($item);
      });
    } catch (error) {
      console.error('error', error);
    }
  }

  $searchLocationInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      searchLocation(e.target.value);
      return;
    }
  });
  $searchLocationBtn.addEventListener('click', function () {
    const searchValue = $searchLocationInput.value;
    searchLocation(searchValue);
  });
}

export { initWeather };
