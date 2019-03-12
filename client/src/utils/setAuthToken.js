import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // If no token, delete it from the header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
