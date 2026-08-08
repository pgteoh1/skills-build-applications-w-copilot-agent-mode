import ResourceView from './ResourceView'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString()
}

const columns = [
  {
    header: 'User',
    render: (item) => item.user?.name ?? '-',
  },
  {
    header: 'Type',
    render: (item) => item.type ?? '-',
  },
  {
    header: 'Duration (min)',
    render: (item) => item.durationMinutes ?? '-',
  },
  {
    header: 'Calories',
    render: (item) => item.caloriesBurned ?? '-',
  },
  {
    header: 'Points',
    render: (item) => item.pointsEarned ?? '-',
  },
  {
    header: 'Performed At',
    render: (item) => formatDate(item.performedAt),
  },
]

function Activities() {
  return (
    <ResourceView
      title="Activities"
      resourcePath="activities"
      resourceKey="activities"
      columns={columns}
      emptyMessage="No activities found."
    />
  )
}

export default Activities
