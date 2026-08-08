import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Leaderboard from '../components/Leaderboard.jsx'

describe('Leaderboard', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the Leaderboard heading', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Leaderboard />)
    await waitFor(() => expect(screen.getByText('Leaderboard')).toBeInTheDocument())
  })

  it('renders the Leaderboard description', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Leaderboard />)
    await waitFor(() => expect(screen.getByText('Compare teams and athletes on the latest leaderboard.')).toBeInTheDocument())
  })

  it('shows leaderboard entries returned from the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', username: 'Thor', score: 500 }],
    })
    render(<Leaderboard />)
    await waitFor(() => expect(screen.getByText('Thor')).toBeInTheDocument())
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('shows empty state when no leaderboard entries exist', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Leaderboard />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })
})
