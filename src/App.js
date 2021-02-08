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
import { useSelector } from 'react-redux'
import { selectPlayer } from './features/player/playerSlice'

function App() {
  const player = useSelector(selectPlayer)

  const displayLobby = () => {
    if (!player.username) {
      return <Redirect to="/login" />
    }
    return <Lobby />
  }

  return (
    <Router>
      <Switch>
        <Route path="/game/:gameID">{displayLobby()}</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
