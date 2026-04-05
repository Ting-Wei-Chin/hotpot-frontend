// 開發環境用 Vite proxy (/api)，正式環境用 api.gmsthg.com
const API = import.meta.env.VITE_API_URL || '/api'
export default API
