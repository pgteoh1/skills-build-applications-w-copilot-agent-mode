import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Teams from '../components/Teams.jsx'

describe('Teams', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the Teams heading', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Teams />)
    await waitFor(() => expect(screen.getByText('Teams')).toBeInTheDocument())
  })

  it('renders the Teams description', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Teams />)
    await waitFor(() => expect(screen.getByText('Manage team rosters and group progress from one place.')).toBeInTheDocument())
  })

  it('shows team records returned from the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', name: 'OctoSquad', members: ['Alice', 'Bob'] }],
    })
    render(<Teams />)
    await waitFor(() => expect(screen.getByText('OctoSquad')).toBeInTheDocument())
    expect(screen.getByText('Alice, Bob')).toBeInTheDocument()
  })

  it('shows empty state when no teams exist', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Teams />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })
})
