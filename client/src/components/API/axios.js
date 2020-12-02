
import Axios from 'axios'

//Create axios instance
export const axios = Axios.create({baseURL: "http://localhost:5000",
headers: {"Content-Type": "application/json"},
timeout: 3000
}); 