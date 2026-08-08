import ResourceView from './ResourceView'
import { apiBaseUrl } from './resourceApi'

const columns = [
  {
    header: 'Name',
    render: (item) => item.name ?? '-',
  },
  {
    header: 'School',
    render: (item) => item.school ?? '-',
  },
  {
    header: 'Slogan',
    render: (item) => item.slogan || '-',
  },
]

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${apiBaseUrl}/teams/`

function Teams() {
  return (
    <ResourceView
      title="Teams"
      endpointUrl={teamsEndpoint}
      resourcePath="teams"
      resourceKey="teams"
      columns={columns}
      emptyMessage="No teams found."
    />
  )
}

export default Teams
