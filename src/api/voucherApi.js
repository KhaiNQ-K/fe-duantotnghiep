import axiosInstance from "./axiosInstance"

export const BASE_URL = '/vouchers'

const voucherApi = {

    getAll(){
        return axiosInstance.get(BASE_URL)
    },

    getById(id){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.get(url)
    },

    create(data){
        return axiosInstance.post(BASE_URL, data)
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

export default voucherApi;