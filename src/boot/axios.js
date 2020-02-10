import axios from 'axios'

export default async ({ Vue }) => {
  const heromillions_axios = axios.create({
    baseURL: 'https://euromillions-api.herokuapp.com'
  })

  Vue.prototype.$axios = heromillions_axios
}
