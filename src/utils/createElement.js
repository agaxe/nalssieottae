export const createElement = ({ element, className }) => {
  const $element = document.createElement(element);

  if (className) $element.classList.add(className);

  return $element;
};
