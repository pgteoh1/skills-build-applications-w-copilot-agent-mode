import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
        <div className="container py-2">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={logo} width="36" height="36" alt="Octofit Tracker logo" />
            <span>Octofit Tracker</span>
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            <NavLink className="nav-link px-2" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link px-2" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link px-2" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link px-2" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link px-2" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <Routes>
                  <Route path="/" element={<Navigate to="/activities" replace />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/workouts" element={<Workouts />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
