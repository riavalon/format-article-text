import * as React from 'react';
import {Link} from 'react-router';

import selectElementFile from '../events/select-element.ext.js';


class FATMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extensionStatus: 'Extension is idle.'
    };
    this.handleClick = this.handleClick.bind(this);
    this.someOtherFunction = this.someOtherFunction.bind(this);
  }

  someOtherFunction() {
    const a = 'Hello';
    const b = 'World!';
    console.log(`${a}, ${b}`);
  }

  handleClick() {
    chrome.tabs.executeScript({
      code: selectElementFile
    });
    window.close();  // Close popup so user can select elements on page.
  }

  render() {
    return (
      <div id='main-page'>
        <a className='button' onClick={this.handleClick} id='quick-select-button'>
          Select Elements
        </a>
        {/*<Link to='/settings' className='button' id='settings-page-button'>
          View Settings
        </Link>*/}

        <strong id='status'>{this.state.extensionStatus}</strong>
      </div>
    );
  }
}

export default FATMain;
