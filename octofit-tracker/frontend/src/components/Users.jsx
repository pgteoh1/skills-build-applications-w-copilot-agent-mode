import ResourceView from './ResourceView'

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

function Users() {
  return (
    <ResourceView
      title="Users"
      resourcePath="users"
      resourceKey="users"
      columns={columns}
      emptyMessage="No users found."
    />
  )
}

export default Users
