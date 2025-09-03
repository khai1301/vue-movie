import apiClient from "../axios"

const slug = 'quoc-gia'

export const getDataCountry = async (country, page = 1, limit = 24) => {
    const endpoint = `${slug}/${country}`
    const res = await apiClient.get(endpoint, { params: {page, limit}});
    return res.data
}