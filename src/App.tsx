import * as React from 'react';
import {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from 'react-router-dom';
import routeMap from './routeMap';
import './index.scss'

const App = () => {
  return (
    <Router>
      App
      <ul>
        <li>
          <NavLink to="/">usual-page</NavLink>
        </li>
        <li>
          <NavLink to="/photo-page">photo-page</NavLink>
        </li>
        <li>
          <NavLink to="/antd-page">antd-page</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Switch> {
          routeMap.map(item => <Route exact path={item.path} key={item.path} component={item.component}/>)
        }
        </Switch>
      </Suspense>
    </Router>
  );
};
export default App;
