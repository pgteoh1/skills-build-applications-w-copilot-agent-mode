import ResourceView from './ResourceView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      description="Compare teams and athletes on the latest leaderboard."
      endpoint={endpoint}
    />
  )
}

export default Leaderboard
