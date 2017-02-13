import {DEFAULT_CSS, ERoute} from './config/constants';


function setTextAreaContent() {
  const textArea = document.getElementById('custom-css');
  textArea.textContent = JSON.stringify(DEFAULT_CSS, null, 2);
}

function selectElement() {
  const statusBar = document.getElementById('status');
  statusBar.textContent = 'Select element button clicked!';
  let x = setTimeout(function() {
    statusBar.textContent = 'Extension is idle.';
    clearTimeout(x);
  }, 1500);
}

export function setPage(page?: ERoute) {
  const mainPage = document.getElementById('main-page');
  const settingsPage = document.getElementById('settings-page');

  if (!page) {
    // default to main
    settingsPage.style = 'display: none';
    mainPage.style = 'display: block';
  } else {
    switch (page) {
      case ERoute.HOME:
        settingsPage.style = 'display: none';
        mainPage.style = 'display: block';
        break;
      case ERoute.SETTINGS:
        settingsPage.style = 'display: block';
        mainPage.style = 'display: none';
        setTextAreaContent();
        break;
    }
  }
}

export default function bootstrap() {
  // Set the default route up
  setPage();

  // // Set the default css values inside the text area
  // setTextAreaContent();

  // Register the select element button event
  document
    .getElementById('quick-select-button')
    .addEventListener('click', selectElement);

  document
    .getElementById('settings-page-button')
    .addEventListener('click', setPage.bind(null, ERoute.SETTINGS));

  document
    .getElementById('return-main-button')
    .addEventListener('click', setPage);
}
