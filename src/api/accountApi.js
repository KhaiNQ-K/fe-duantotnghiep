import axiosInstance from "./axiosInstance"

export const BASE_URL = '/accounts'

const accountApi = {

    getAll(){
        return axiosInstance.get(BASE_URL)
    },

    getById(id){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.get(url)
    },

    create(data){
        const url = `${BASE_URL}/register`
        return axiosInstance.post(url, data)
    },

    update(id, data){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.put(url, data)
    },

    delete(id, data){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.put(url, data)
    }

}

export default accountApi;
