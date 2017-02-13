import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import FATMain from './pages/main-page.tsx';
import FATSettings from './pages/settings-page.tsx';


class FATRouter extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={FATMain} />
        <Route path='settings' component={FATSettings} />
      </Router>
    );
  }
}

export default FATRouter;
