import { useEffect, useState } from 'react'
import { apiBaseUrl, extractCollection, extractPagination, fetchResource } from './resourceApi'

function ResourceView({ title, endpointUrl, resourcePath, resourceKey, columns, emptyMessage }) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      setLoading(true)
      setError('')

      try {
        const payload = await fetchResource(endpointUrl || resourcePath, controller.signal)
        setItems(extractCollection(payload, resourceKey))
        setPagination(extractPagination(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load resource data.')
          setItems([])
          setPagination(null)
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()

    return () => controller.abort()
  }, [endpointUrl, resourcePath, resourceKey])

  const sourceUrl = endpointUrl || `${apiBaseUrl}/${resourcePath}/`

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h1 className="h3 mb-0">{title}</h1>
          <small className="text-body-secondary">Source: {sourceUrl}</small>
        </div>

        {loading && <p className="mb-0">Loading {title.toLowerCase()}...</p>}

        {!loading && error && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && <p className="mb-0">{emptyMessage}</p>}

        {!loading && !error && items.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column.header}>
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${resourcePath}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.header}>{column.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && (
          <p className="text-body-secondary mt-3 mb-0">
            Page: {pagination.page ?? '-'} | Total Pages: {pagination.totalPages ?? '-'} | Total Items:{' '}
            {pagination.totalItems ?? '-'}
          </p>
        )}
      </div>
    </section>
  )
}

export default ResourceView
