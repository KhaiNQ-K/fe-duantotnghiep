import axiosInstance from "./axiosInstance"

export const BASE_URL = '/districts/Provinces'

const districtApi = {

    getByProvinces(id){
        const url = `${BASE_URL}/${id}`
        return axiosInstance.get(url)
    }
    
}

export default districtApi;