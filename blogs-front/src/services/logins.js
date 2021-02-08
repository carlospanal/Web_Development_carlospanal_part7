import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/login'


const sendLogin  =  async newObject => {
  console.log('sending login')
  const response = await axios.post(baseUrl, newObject)

  return response.data
}

export default { sendLogin }
