import ResourceView from './ResourceView'
import { apiBaseUrl } from './resourceApi'

const columns = [
  {
    header: 'Name',
    render: (item) => item.name ?? '-',
  },
  {
    header: 'Email',
    render: (item) => item.email ?? '-',
  },
  {
    header: 'Fitness Level',
    render: (item) => item.fitnessLevel ?? '-',
  },
  {
    header: 'Points',
    render: (item) => item.points ?? '-',
  },
  {
    header: 'Team',
    render: (item) => item.team?.name ?? '-',
  },
]

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/users/`

function Users() {
  return (
    <ResourceView
      title="Users"
      endpointUrl={usersEndpoint}
      resourcePath="users"
      resourceKey="users"
      columns={columns}
      emptyMessage="No users found."
    />
  )
}

export default Users
