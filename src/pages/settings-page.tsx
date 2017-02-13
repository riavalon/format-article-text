import * as React from 'react';
import {Link} from 'react-router';

import {DEFAULT_CSS} from '../config/constants.ts';


class FATSettings extends React.Component {
  setDefaultText() {
    return JSON.stringify(DEFAULT_CSS, null, 4);
  }

  render() {
    return (
      <div id='settings-page'>
        <textarea id='custom-css' defaultValue={this.setDefaultText()}></textarea>
        <Link to='/' className='button' id='return-main-button'>
          Back
        </Link>
      </div>
    );
  }
}

export default FATSettings;
