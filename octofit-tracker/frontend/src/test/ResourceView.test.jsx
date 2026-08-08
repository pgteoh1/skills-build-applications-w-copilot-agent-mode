import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ResourceView from '../components/ResourceView.jsx'

describe('ResourceView', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows loading state initially', () => {
    fetch.mockReturnValue(new Promise(() => {}))
    render(<ResourceView title="Test" description="A description" endpoint="/api/test/" />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('renders title and description', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    })
    render(<ResourceView title="Activities" description="Track activities" endpoint="/api/activities/" />)
    await waitFor(() => expect(screen.getByText('Activities')).toBeInTheDocument())
    expect(screen.getByText('Track activities')).toBeInTheDocument()
  })

  it('shows empty state when no records are returned', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    })
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })

  it('shows error message when fetch fails with non-ok status', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    })
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('Request failed with status 500')).toBeInTheDocument())
  })

  it('shows error message when fetch throws a network error', async () => {
    fetch.mockRejectedValue(new Error('Network error'))
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('Network error')).toBeInTheDocument())
  })

  it('renders a table with data when records are returned', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { _id: '1', name: 'Alice', score: 100 },
        { _id: '2', name: 'Bob', score: 200 },
      ],
    })
    render(<ResourceView title="Leaderboard" description="Scores" endpoint="/api/leaderboard/" />)
    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument())
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('renders table columns from the data keys', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', username: 'alice', email: 'alice@example.com' }],
    })
    render(<ResourceView title="Users" description="Users list" endpoint="/api/users/" />)
    await waitFor(() => expect(screen.getByText('username')).toBeInTheDocument())
    expect(screen.getByText('email')).toBeInTheDocument()
  })

  it('handles paginated response with results array', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ _id: '1', name: 'CardioBlast' }] }),
    })
    render(<ResourceView title="Workouts" description="Plans" endpoint="/api/workouts/" />)
    await waitFor(() => expect(screen.getByText('CardioBlast')).toBeInTheDocument())
  })

  it('handles non-array single object response', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ _id: '1', name: 'Solo' }),
    })
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('Solo')).toBeInTheDocument())
  })

  it('formats null values as em dash', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', name: null }],
    })
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('—')).toBeInTheDocument())
  })

  it('formats array values as comma-separated string', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', members: ['Alice', 'Bob'] }],
    })
    render(<ResourceView title="Test" description="desc" endpoint="/api/test/" />)
    await waitFor(() => expect(screen.getByText('Alice, Bob')).toBeInTheDocument())
  })
})
