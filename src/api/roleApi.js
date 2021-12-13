import axiosInstance from "./axiosInstance"

export const BASE_URL = '/roles'

const roleApi = {

    getAll(){
        return axiosInstance.get(BASE_URL)
    }
    
}

export default roleApi;