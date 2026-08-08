import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Activities from '../components/Activities.jsx'

describe('Activities', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the Activities heading', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Activities />)
    await waitFor(() => expect(screen.getByText('Activities')).toBeInTheDocument())
  })

  it('renders the Activities description', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Activities />)
    await waitFor(() => expect(screen.getByText('Track logged activity details for Octofit athletes.')).toBeInTheDocument())
  })

  it('shows activity records returned from the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', activity_type: 'Running', duration: 30 }],
    })
    render(<Activities />)
    await waitFor(() => expect(screen.getByText('Running')).toBeInTheDocument())
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('shows empty state when no activities exist', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Activities />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })
})
