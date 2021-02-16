import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  RouteChildrenProps,
} from 'react-router-dom';
import Lobby from './components/Lobby';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { selectPlayer } from './features/player/playerSlice';
import Notification from './components/Notification/Notification';
import { CSSTransition } from 'react-transition-group';
import { NotificationType } from './util/types';

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
        <Route path="/game/:gameID">
          {(props: RouteChildrenProps) => (
            <CSSTransition
              in={props.match != null}
              classNames="slide-lobby"
              timeout={800}
              unmountOnExit
            >
              {displayLobby()}
            </CSSTransition>
          )}
        </Route>
        <Route exact path="/">
          {(props: RouteChildrenProps) => (
            <CSSTransition
              in={props.match != null}
              classNames="slide-login"
              timeout={800}
              unmountOnExit
            >
              <Login />
            </CSSTransition>
          )}
        </Route>
        {/* <Route exact path="/">
          {(props) => {
            return <Redirect to="/login" />
          }}
        </Route> */}

        <Notification type={NotificationType.INFO} message="An info message" />
      </div>
    </Router>
  );
};

export default App;
