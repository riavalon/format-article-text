// Set document event listeners for selecting elements in page.
;(function() {
  // Default css.
  const DEFAULT_CSS = {
    width: '800px',
    fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", "Calibri", "Arial", sans-serif',
    fontSize: '18px',
    lineHeight: '1.6',
    webkitFontSmoothing: 'antialiased',
    textShadow: '1px 1px 1px rgba(0,0,0,0.04)',
  };

  const getMouseCoords = (event) => {
    return [event.clientX, event.clientY];
  };

  const getElementUnderCursor = (coords) => {
    return document.elementFromPoint(coords[0], coords[1]);
  };

  const addCSSToElement = (el) => {
    el.style.outline = '3px solid black';
    console.log('add css called!');
  };

  const removeCSSFromElement = (el) => {
    el.style.outline = null;
    el.removeEventListener('mouseout', removeCSSFromElement, false);
  };

  const listenToEvents = (event) => {
    const coords = getMouseCoords(event);
    const element = getElementUnderCursor(coords);

    // Add css to element and event listener for removing css.
    addCSSToElement(element);
    element.addEventListener('mouseout', removeCSSFromElement.bind(null, element));
  };

  const applyStyles = (el) => {
    const styleKeys = Object.keys(DEFAULT_CSS);
    styleKeys.forEach((key) => {
      el.style[key] = DEFAULT_CSS[key];
    });
  }

  const unsubscribeOnClick = (event) => {
    applyStyles(event.target);

    document.removeEventListener('mouseover', listenToEvents);
    document.removeEventListener('click', unsubscribeOnClick);
  };

  const bindEventListeners = () => {
    document.addEventListener('mouseover', listenToEvents);
    document.addEventListener('click', unsubscribeOnClick);
  };

  bindEventListeners();
})();
