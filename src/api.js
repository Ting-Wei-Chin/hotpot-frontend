const BASE = import.meta.env.VITE_API_URL || '/api'

export const apiFetch = (path, options = {}) => {
  const mode = sessionStorage.getItem('appMode')
  const sep = path.includes('?') ? '&' : '?'
  const modeStr = mode === 'test' ? `${sep}mode=test` : ''
  return fetch(`${BASE}${path}${modeStr}`, options)
}

export default BASE
