import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand-mark" to="/activities">
          <img src={logo} alt="OctoFit Tracker" />
          <span>OctoFit Tracker</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main className="main-content container py-4">
        {!codespaceName && (
          <div className="alert alert-warning" role="alert">
            VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000 for API requests.
          </div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
