import ResourceView from './ResourceView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  return (
    <ResourceView
      title="Users"
      description="Review Octofit athlete profiles and account details."
      endpoint={endpoint}
    />
  )
}

export default Users
