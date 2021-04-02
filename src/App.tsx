import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import GameArea from './components/GameArea';
import Lobby from './components/Lobby';
import Login from './components/Login';
import Notification from './components/Notification/Notification';
import { selectNotification } from './features/notification/notificationSlice';
import { selectPlayer } from './features/player/playerSlice';

const App: React.FC = () => {
  const player = useSelector(selectPlayer);
  const notification = useSelector(selectNotification);

  const displayLobby = () => {
    if (!player.username) {
      return <Redirect to="/" />;
    }
    return <Lobby />;
  };

  return (
    <Router>
      <div className="flex flex-col items-center pt-8">
        <h1 className="mb-4 text-5xl font-bold text-transparent sm:text-6xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text font-display">
          Skull App_
        </h1>
        <Switch>
          <Route path="/game/:game_id/board">
            <GameArea />
          </Route>
          <Route path="/game/:game_id">
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

        <Notification {...notification} />
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
