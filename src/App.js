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
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const player = usePlayer()

  return (
    <Router>
      <Switch>
        <Route path="/game/:gameID">
          <Lobby player={player} />
        </Route>
        <Route path="/login">
          <Login player={player} />
        </Route>
        <Route path="/">
          {!player.state.username ? <Redirect to="/login" /> : <Home />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
