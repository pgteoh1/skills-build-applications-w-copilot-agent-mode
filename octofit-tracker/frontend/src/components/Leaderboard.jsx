import ResourceView from './ResourceView'
import { apiBaseUrl } from './resourceApi'

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

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${apiBaseUrl}/leaderboard/`

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      endpointUrl={leaderboardEndpoint}
      resourcePath="leaderboard"
      resourceKey="leaderboard"
      columns={columns}
      emptyMessage="No leaderboard entries found."
    />
  )
}

export default Leaderboard
