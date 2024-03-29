import axios from 'axios'
import jwtDecode from 'jwt-decode'

const stripeInstance = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`,
    },
})

export const setTokenHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const apiCall = async (method, path, data) => {
    try {
        const config = {
            headers: { llamaDate: new Date() },
        }

        const decoded = await jwtDecode(
            axios.defaults.headers.common['Authorization']
        )

        const res = await axios[method.toLowerCase()](
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/${decoded._id}${path}`,
            data,
            config
        )

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const stripeAPI = async (method, path, data) => {
    try {
        const response = await stripeInstance[method.toLowerCase()](
            `https://api.stripe.com/v1${path}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data
    } catch (err) {
        throw err.response
    }
}

export const analytics = {
    trigger: (data) => {
        return axios.post(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/analytics/trigger`,
            data
        )
    },
    identify: (data) => {
        return axios.post(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/analytics/identify`,
            data
        )
    },
}
