import moment from "moment"

export const formatPrice = (number) => {
    return new Intl.NumberFormat('vi-VN', 
    { style: 'currency', currency: 'VND' }).format(number);
}

// export const getUniqueValues = (data, type) => {
//     let unique = data.map((item) => item[type])

//     return ['all', ...new Set(unique)]
// }
//convert date to dd//yy/mmm
export const formatDate = (date) => {
    return (moment(date).format('DD-MM-YYYY'));
}