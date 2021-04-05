import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { socket } from './connection/socket';
import { setGame } from './features/game/gameSlice';
import { selectNotification } from './features/notification/notificationSlice';
import { selectPlayer, setPlayer } from './features/player/playerSlice';
import { Game } from './util/types';

const App: React.FC = () => {
  const player = useSelector(selectPlayer);
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();

  const displayLobby = () => {
    if (!player.username) {
      return <Redirect to="/" />;
    }
    return <Lobby />;
  };

  useEffect(() => {
    socket.on('GAME_UPDATE', (game: Game) => {
      console.log(`Game has been updated to ${game}`);
      const updatedGame: Game = game;
      updatedGame.players.forEach((p) => {
        if (p.id === player.id) {
          dispatch(setPlayer(p));
        }
      });
      dispatch(setGame(updatedGame));
    });
  });

  return (
    <Router>
      <div className="flex flex-col items-center pt-8">
        <h1
          style={{
            textShadow: '0px 0px 15px rgba(255,255,255,0.3)',
          }}
          className="mb-4 text-5xl font-bold sm:text-6xl text-blue-50 font-display"
        >
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
