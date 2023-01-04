const { REACT_APP_BACKEND_URL, NODE_ENV } = process.env

export const DEV = NODE_ENV === 'development'
export const BACKEND_URL = DEV ? REACT_APP_BACKEND_URL : ''
