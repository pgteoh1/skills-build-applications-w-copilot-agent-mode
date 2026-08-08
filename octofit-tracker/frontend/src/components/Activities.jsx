import ResourceView from './ResourceView'
import { apiBaseUrl } from './resourceApi'

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

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${apiBaseUrl}/activities/`

function Activities() {
  return (
    <ResourceView
      title="Activities"
      endpointUrl={activitiesEndpoint}
      resourcePath="activities"
      resourceKey="activities"
      columns={columns}
      emptyMessage="No activities found."
    />
  )
}

export default Activities
