import ResourceView from './ResourceView'
import { apiBaseUrl } from './resourceApi'

const columns = [
  {
    header: 'Title',
    render: (item) => item.title ?? '-',
  },
  {
    header: 'Difficulty',
    render: (item) => item.difficulty ?? '-',
  },
  {
    header: 'Focus Area',
    render: (item) => item.focusArea ?? '-',
  },
  {
    header: 'Duration (min)',
    render: (item) => item.durationMinutes ?? '-',
  },
  {
    header: 'Recommended For',
    render: (item) =>
      Array.isArray(item.recommendedFor) && item.recommendedFor.length > 0
        ? item.recommendedFor.join(', ')
        : '-',
  },
]

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${apiBaseUrl}/workouts/`

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      endpointUrl={workoutsEndpoint}
      resourcePath="workouts"
      resourceKey="workouts"
      columns={columns}
      emptyMessage="No workouts found."
    />
  )
}

export default Workouts
