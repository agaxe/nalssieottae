import { $loadingTitleList, $loadingBox } from './elements.js';

function runIndecator() {
  function loadingIndicator() {
    let num = 1;

    const loadingTitleFirstEl =
      $loadingTitleList.firstElementChild.cloneNode(true);
    $loadingTitleList.appendChild(loadingTitleFirstEl);

    return function () {
      const unit = 80;
      const time = 4;
      const delay = Number(time + '00');

      $loadingTitleList.style.top = `-${unit * num}px`;

      if (num === 3) {
        setTimeout(function () {
          $loadingTitleList.style.transition = 'none';
          $loadingTitleList.style.top = `0px`;

          num = 1;
        }, delay);
      } else {
        $loadingTitleList.style.transition = `top 0.${time}s cubic-bezier(0.03, 0.01, 0.18, 0.99)`;
      }

      num++;
    };
  }
  const indecator = loadingIndicator();
  const indecatorInterval = setInterval(indecator, 600);

  return function removeIndecator() {
    setTimeout(() => {
      $loadingBox.classList.remove('on');

      clearInterval(indecatorInterval);
    }, 1500);
  };
}

export { runIndecator };
