import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Workouts from '../components/Workouts.jsx'

describe('Workouts', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the Workouts heading', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Workouts />)
    await waitFor(() => expect(screen.getByText('Workouts')).toBeInTheDocument())
  })

  it('renders the Workouts description', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Workouts />)
    await waitFor(() => expect(screen.getByText('Browse recommended workouts and personalized plans.')).toBeInTheDocument())
  })

  it('shows workout records returned from the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', name: 'CardioBlast', duration: 45 }],
    })
    render(<Workouts />)
    await waitFor(() => expect(screen.getByText('CardioBlast')).toBeInTheDocument())
    expect(screen.getByText('45')).toBeInTheDocument()
  })

  it('shows empty state when no workouts exist', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Workouts />)
    await waitFor(() => expect(screen.getByText('No records returned yet.')).toBeInTheDocument())
  })
})
