import ResourceView from './ResourceView'

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

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      resourcePath="workouts"
      resourceKey="workouts"
      columns={columns}
      emptyMessage="No workouts found."
    />
  )
}

export default Workouts
