import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  RouteChildrenProps,
  Switch,
} from 'react-router-dom';
import Lobby from './components/Lobby';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { selectPlayer } from './features/player/playerSlice';
import { CSSTransition } from 'react-transition-group';

const App: React.FC = () => {
  const player = useSelector(selectPlayer);

  const displayLobby = () => {
    if (!player.username) {
      return <Redirect to="/" />;
    }
    return <Lobby />;
  };

  return (
    <Router>
      <div className="flex flex-col items-center pt-8">
        <h1 className="mb-4 text-5xl font-bold text-transparent sm:text-6xl bg-gradient-to-r from-purple to-blue bg-clip-text font-display">
          Skull App_
        </h1>
        <Switch>
          <Route path="/game/:gameID">{displayLobby()}</Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        {/* <Route exact path="/">
          {(props) => {
            return <Redirect to="/login" />
          }}
        </Route> */}

        {/* <Notification type={NotificationType.INFO} message="An info message" /> */}
      </div>
    </Router>
  );
};

export default App;
