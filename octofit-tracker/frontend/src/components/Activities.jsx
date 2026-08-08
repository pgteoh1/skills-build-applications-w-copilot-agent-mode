import ResourceView from './ResourceView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  return (
    <ResourceView
      title="Activities"
      description="Track logged activity details for Octofit athletes."
      endpoint={endpoint}
    />
  )
}

export default Activities
