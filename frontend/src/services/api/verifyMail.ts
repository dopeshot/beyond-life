import axios from 'axios'

export const verifyMail = (token: string) => {
	return axios.post('/api/verifyMail', { token })
}
