const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()

function deriveCodespacesApiBaseFromHost() {
  if (typeof window === 'undefined') {
    return ''
  }

  const { hostname, protocol } = window.location
  if (!hostname.endsWith('.app.github.dev')) {
    return ''
  }

  // Example: <name>-5173.app.github.dev -> <name>-8000.app.github.dev
  const backendHost = hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')
  if (backendHost === hostname) {
    return ''
  }

  return `${protocol}//${backendHost}/api`
}

const derivedCodespacesApiBase = deriveCodespacesApiBaseFromHost()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : derivedCodespacesApiBase || 'http://localhost:8000/api'

export function extractCollection(payload, resourceKey) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    resourceKey,
    'data',
    'items',
    'results',
    'docs',
    'rows',
  ]

  for (const key of candidates) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) {
      return value
    }
  }

  return []
}

export function extractPagination(payload) {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return null
  }

  const page = payload.page ?? payload.currentPage ?? payload.pageNumber
  const totalPages = payload.totalPages ?? payload.pages
  const totalItems = payload.totalItems ?? payload.total ?? payload.count

  if (page == null && totalPages == null && totalItems == null) {
    return null
  }

  return {
    page,
    totalPages,
    totalItems,
  }
}

export async function fetchResource(resourcePathOrUrl, signal) {
  const requestUrl = resourcePathOrUrl.startsWith('http')
    ? resourcePathOrUrl
    : `${apiBaseUrl}/${resourcePathOrUrl}/`

  const response = await fetch(requestUrl, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
