import ResourceView from './ResourceView'

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

function Teams() {
  return (
    <ResourceView
      title="Teams"
      resourcePath="teams"
      resourceKey="teams"
      columns={columns}
      emptyMessage="No teams found."
    />
  )
}

export default Teams
