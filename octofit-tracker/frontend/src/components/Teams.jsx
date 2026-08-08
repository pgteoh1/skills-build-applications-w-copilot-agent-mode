import ResourceView from './ResourceView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  return (
    <ResourceView
      title="Teams"
      description="Manage team rosters and group progress from one place."
      endpoint={endpoint}
    />
  )
}

export default Teams
