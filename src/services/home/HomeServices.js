import apiClient from "@/services/axios"
const endpointHome = "home"

export const getDataHome = async () => {
    const dataHome = await apiClient.get(endpointHome)
    return dataHome.data
}