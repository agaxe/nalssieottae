import { checkLocation } from './checkLocation.js';
import { $changeLocationBtn } from './elements.js';

function setSettingArea() {
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

  // 위치 변경
  $changeLocationBtn.addEventListener('click', () => {
    localStorage.removeItem('location');
    checkLocation();
  });
}

export { setSettingArea };
