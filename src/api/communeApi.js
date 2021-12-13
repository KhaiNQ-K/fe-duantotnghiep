import axiosInstance from "./axiosInstance"

export const BASE_URL = '/communes/Districts'

const communeApi = {

    getByDistrict(id){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.get(url)
    }
    
}

export default communeApi;