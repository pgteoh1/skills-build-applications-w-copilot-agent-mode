import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Users from '../components/Users.jsx'

describe('Users', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the Users heading', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Users />)
    await waitFor(() => expect(screen.getByText('Users')).toBeInTheDocument())
  })

  it('renders the Users description', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Users />)
    await waitFor(() => expect(screen.getByText('Review Octofit athlete profiles and account details.')).toBeInTheDocument())
  })

  it('shows user records returned from the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', username: 'Thor', email: 'thor@example.com' }],
    })
    render(<Users />)
    await waitFor(() => expect(screen.getByText('Thor')).toBeInTheDocument())
    expect(screen.getByText('thor@example.com')).toBeInTheDocument()
  })

  it('shows empty state when no users exist', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Users />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })
})
