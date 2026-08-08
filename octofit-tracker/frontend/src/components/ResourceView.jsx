import { useEffect, useMemo, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return payload ? [payload] : []
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function ResourceView({ title, description, endpoint }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setItems(normalizeItems(payload))
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data.')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      isMounted = false
    }
  }, [endpoint])

  const columns = useMemo(() => {
    const keys = new Set()

    items.forEach((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        Object.keys(item).forEach((key) => keys.add(key))
      }
    })

    return [...keys]
  }, [items])

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 mb-2">{title}</h1>
          <p className="text-body-secondary mb-0">{description}</p>
        </div>
        {import.meta.env.DEV ? <span className="badge text-bg-dark">{endpoint}</span> : null}
      </div>

      {loading ? <div className="alert alert-info mb-0">Loading data...</div> : null}

      {!loading && error ? (
        <div className="alert alert-warning mb-0" role="alert">
          {error}
        </div>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <div className="alert alert-secondary mb-0" role="status">
          No records returned yet.
        </div>
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item?.id ?? item?._id ?? index}>
                  {columns.map((column) => (
                    <td key={column}>{formatValue(item?.[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default ResourceView
