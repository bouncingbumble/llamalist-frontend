import axios from 'axios'

export const apiCall = async (method, path, data) => {
    try {
        let res = await axios[method.toLowerCase()](
            `${process.env.REACT_APP_BACKEND_ENDPOINT}${path}`,
            data
        )

        return res.data
    } catch (err) {
        console.log(err)
    }
}
