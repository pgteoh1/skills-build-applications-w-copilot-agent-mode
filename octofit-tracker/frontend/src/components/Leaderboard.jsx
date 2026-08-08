import ResourceView from './ResourceView'

const columns = [
  {
    header: 'Rank',
    render: (item) => item.rank ?? '-',
  },
  {
    header: 'User',
    render: (item) => item.user?.name ?? '-',
  },
  {
    header: 'Period',
    render: (item) => item.period ?? '-',
  },
  {
    header: 'Points',
    render: (item) => item.points ?? '-',
  },
]

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      resourcePath="leaderboard"
      resourceKey="leaderboard"
      columns={columns}
      emptyMessage="No leaderboard entries found."
    />
  )
}

export default Leaderboard
