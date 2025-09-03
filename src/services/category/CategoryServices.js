import apiClient from "../axios"

const slug = 'the-loai'

export const getDataCategory = async (category, page = 1, limit = 24) => {
    const endpoint = `${slug}/${category}`
    const res = await apiClient.get(endpoint, { params: {page, limit}});
    return res.data
}