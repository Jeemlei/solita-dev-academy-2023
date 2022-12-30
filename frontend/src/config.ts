const { REACT_APP_BACKEND_URL, NODE_ENV } = process.env

export default NODE_ENV ? REACT_APP_BACKEND_URL : ''