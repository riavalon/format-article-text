// Set document event listeners for selecting elements in page.
(function() {
  const node = document.createElement('style');
  document.head.appendChild(node);
  window.addStyleString = function(str) {
    node.innerHTML = str;
  }
}());

;(function() {
  // Default css.
  // TODO: Find a way to populate this object dynamically from the extensions settings page.
  const DEFAULT_CSS = {
    width: '800px',
    margin: '0 auto',
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
  };

  const createCloseModalButton = () => {
    const button = document.createElement('button');
    const styles = {
      // fixed to modal top left corner
      position: 'fixed',
      top: '40px',
      left: '40px',

      // button styling
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      background: '#555',
      color: 'white',
      cursor: 'pointer'
    };
    Object.keys(styles).forEach(key => button.style[key] = styles[key]);
    button.setAttribute('id', 'FATModalCloseButton');
    button.textContent = 'Close Modal';
    document
      .getElementById('FATModal')
      .shadowRoot
      .appendChild(button);
  };

  const createModalDiv = () => {
    const modalDiv = document.createElement('div');
    const centeringDiv = document.createElement('div');
    const modalStyles = {
      position: 'fixed',
      zIndex: '9999',
      top: '20px',
      right: '20px',
      left: '20px',
      bottom: '10px',
      boxShadow: '5px 5px 0 rgba(0,0,0,0.4)',
      background: '#fbfbfb',
      padding: '20px',
      overflowY: 'scroll',
      border: '1px solid rgba(0,0,0,0.2)'
    };
    const centeringStyles = {
      width: '50%',
      margin: '10px auto',
    };

    centeringDiv.setAttribute('id', 'FATModalCenteringDiv');
    modalDiv.setAttribute('id', 'FATModal');

    Object.keys(centeringStyles).forEach(key => centeringDiv.style[key] = centeringStyles[key]);
    Object.keys(modalStyles).forEach(key => modalDiv.style[key] = modalStyles[key]);

    // create shadow root for style encapsulation! Muahahaha
    const shadow = modalDiv.createShadowRoot();
    shadow.appendChild(centeringDiv);
    document.body.appendChild(modalDiv);
  }

  const removeModalDivFromPage = () => {
    const modal = document.getElementById('FATModal');
    const closeButton = modal.shadowRoot.getElementById('FATModalCloseButton');
    closeButton.removeEventListener('click', removeModalDivFromPage);
    document.body.removeChild(modal);
  };

  const cloneElement = (el) => {
    if (el.tagName === 'BODY') {
      let newEl = document.createElement('div');
      // create a div as the container instead.
      el.childNodes.forEach((node) => {
        if (node.tagName && node.tagName !== 'SCRIPT') {
          let clone = node.cloneNode(true);
          newEl.appendChild(clone);
        }
      })
      document.body.appendChild(newEl);
      el = newEl;
    } else {
      el = el.cloneNode(true);
    }

    createModalDiv();
    createCloseModalButton();
    const modalShadow = document.getElementById('FATModal').shadowRoot;
    const modalDivCentering = modalShadow.getElementById('FATModalCenteringDiv');
    const modalDivCloseButton = modalShadow.getElementById('FATModalCloseButton');

    modalDivCentering.appendChild(el);
    removeCSSFromElement(el);
    applyStyles(el);

    // bind event listener to remove div from page.
    modalDivCloseButton.addEventListener('click', removeModalDivFromPage);
  };

  const unsubscribeOnClick = (event) => {
    document.removeEventListener('mouseover', listenToEvents);
    document.removeEventListener('click', unsubscribeOnClick);

    cloneElement(event.target);
  };

  const resetPage = () => {
    const div = document.getElementById('FATModal');
    if (div) {
      document.body.removeChild(div);
    }
  };

  const bindEventListeners = () => {
    resetPage();
    document.addEventListener('mouseover', listenToEvents);
    document.addEventListener('click', unsubscribeOnClick);
  };

  bindEventListeners();
})();
