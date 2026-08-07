import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

const workoutCards = [
  {
    title: 'Track effort clearly',
    copy: 'Log sessions, sets, and recovery metrics in one place with a structure ready for API-backed activity history.',
  },
  {
    title: 'Compete with teams',
    copy: 'Keep team spaces and leaderboard data behind dedicated backend routes so the presentation tier stays focused.',
  },
  {
    title: 'Coach from data',
    copy: 'Use MongoDB models and typed services as the backbone for personalized workout suggestions and progress insights.',
  },
]

function HomePage() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Modern multi-tier starter</span>
          <h1>OctoFit Tracker is wired for React 19, Express, and MongoDB.</h1>
          <p>
            The frontend is running on Vite with Bootstrap and React Router. The backend is prepared for
            Express, TypeScript, Mongoose, and API routes under <code>/api</code>.
          </p>
          <div className="hero-actions">
            <a className="btn btn-danger btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <NavLink className="btn btn-outline-dark btn-lg" to="/insights">
              View architecture
            </NavLink>
          </div>
        </div>

        <aside className="hero-card">
          <img src={logo} alt="OctoFit Tracker logo" className="hero-logo" />
          <dl>
            <div>
              <dt>Frontend</dt>
              <dd>Vite on port 5173</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>Express API on port 8000</dd>
            </div>
            <div>
              <dt>Database</dt>
              <dd>MongoDB on port 27017</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="feature-grid">
        {workoutCards.map((card) => (
          <article key={card.title} className="feature-card">
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </article>
        ))}
      </section>
    </>
  )
}

function TeamsPage() {
  return (
    <section className="content-panel">
      <span className="eyebrow">Planned capability</span>
      <h1>Teams and leaderboard flows fit behind dedicated API modules.</h1>
      <p>
        This starter keeps room for user profiles, team management, competition logic, and workout recommendation
        endpoints without mixing API concerns into the UI tier.
      </p>
    </section>
  )
}

function InsightsPage() {
  return (
    <section className="content-panel">
      <span className="eyebrow">Current stack</span>
      <h1>Typed backend services meet routed frontend surfaces.</h1>
      <ul className="stack-list">
        <li>React 19 + Vite presentation tier</li>
        <li>Bootstrap and React Router for application structure</li>
        <li>Express + TypeScript backend targeting <code>/api</code></li>
        <li>Mongoose connection to <code>octofit_db</code> on port 27017</li>
      </ul>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand-mark" to="/">
            <img src={logo} alt="OctoFit Tracker" />
            <span>OctoFit Tracker</span>
          </NavLink>

          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/">Overview</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/insights">Insights</NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
