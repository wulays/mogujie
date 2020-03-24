import axios from 'axios'

export default function (config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 7000
    })
    return instance(config)
}