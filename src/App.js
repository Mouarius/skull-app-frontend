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
import Notification from './components/Notification/Notification'

function App() {
  const player = useSelector(selectPlayer)

  const displayLobby = () => {
    if (!player.username) {
      return <Redirect to="/login" />
    }
    return <Lobby />
  }

  return (
    <div className="flex flex-col items-center pt-8">
      <h1 className="mb-4 text-5xl font-bold text-transparent sm:text-6xl bg-gradient-to-r from-purple to-blue bg-clip-text font-display">
        Skull App_
      </h1>

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
      <Notification type="info" message="An info message" />
    </div>
  )
}

export default App
