import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './components/Home'
import Lobby from './components/Lobby'
import Login from './components/Login'
import { usePlayer } from './util/hooks'

function App() {
  const player = usePlayer()

  return (
    <Router>
      <Switch>
        <Route path="/game/:id">
          {/* {!player.username ? <Redirect to="/login" /> : <Home />} */}
          <Lobby player={player} />
        </Route>
        <Route path="/login">
          <Login createPlayer={() => null} player={player} />
        </Route>
        <Route path="/">
          {!player.username ? <Redirect to="/login" /> : <Home />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
