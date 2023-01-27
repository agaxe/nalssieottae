import { runIndecator } from './setLoading.js';
import { $searchLocation, $loadingTitleList, $loadingBox } from './elements.js';
import { setWeather } from './setWeather.js';
import { initWeather } from './initWeather.js';

export function checkLocation() {
  const location = localStorage.getItem('location');
  const removeIndecator = runIndecator();

  removeIndecator();

  //* 접속한 적이 있는 경우
  if (location) {
    $loadingTitleList.style.transition = 'none';
    $loadingTitleList.style.top = '0px';
    $loadingBox.classList.add('on');
    $searchLocation.classList.remove('on');

    setWeather();
    return;
  }

  //* 접속한 적이 없는 경우
  initWeather();
}
