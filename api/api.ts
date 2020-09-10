import axios, {AxiosResponse} from 'axios'

export interface ApiCallData {
    data: {
      ip: string
    },
    headers: {
      date: Date
    },
    requestResponseTimeout: number
  }
  

export const getMessage = async() => {
    try {
        const startTime = Date.now()

        const response = await axios.get('https://api.ipify.org?format=json').then((res) => {
            return {...res, requestResponseTimeout: Date.now() - startTime}
        })

        return response
    } catch(e) {
        console.log(e)
    }
}