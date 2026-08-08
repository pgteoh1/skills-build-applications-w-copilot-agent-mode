import ResourceView from './ResourceView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      description="Browse recommended workouts and personalized plans."
      endpoint={endpoint}
    />
  )
}

export default Workouts
