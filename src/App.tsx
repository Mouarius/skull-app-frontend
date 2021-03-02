import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Lobby from './components/Lobby';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { selectPlayer } from './features/player/playerSlice';
import GameArea from './components/GameArea';

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
        <h1 className="mb-4 text-5xl font-bold text-transparent sm:text-6xl bg-gradient-to-r from-red to-yellow bg-clip-text font-display">
          Skull App_
        </h1>
        <Switch>
          <Route path="/game/:gameID/board">
            <GameArea />
          </Route>
          <Route path="/game/:gameID">
            <Lobby />
          </Route>
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
        {/* <div>
          Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}
      </div>
    </Router>
  );
};

export default App;
