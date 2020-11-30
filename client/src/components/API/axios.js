
import Axios from 'axios'


export const axios = Axios.create({baseURL: "http://localhost:5001",
headers: {"Content-Type": "application/json"},
timeout: 3000
}); 