import * as React from 'react';
import {Link} from 'react-router';


class FATMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extensionStatus: 'Extension is idle.'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('handle click triggered!');
    this.setState({
      extensionStatus: 'Clicked select elements button'
    });
    const timeout = setTimeout(() => {
      this.setState({
        extensionStatus: 'Extension is idle.'
      });
      clearTimeout(timeout);
    }, 1500);
  }

  render() {
    return (
      <div id='main-page'>
        <a className='button' onClick={this.handleClick} id='quick-select-button'>
          Select Elements
        </a>
        <Link to='/settings' className='button' id='settings-page-button'>
          View Settings
        </Link>

        <strong id='status'>{this.state.extensionStatus}</strong>
      </div>
    );
  }
}

export default FATMain;
