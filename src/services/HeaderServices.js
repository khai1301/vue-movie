import apiClient from "./axios";
const endpointCategory = "the-loai";
const endpointCountry = "quoc-gia";
const endpointYear = "nam-phat-hanh";

export const getDataCategory = async () => {
    const res = await apiClient.get(endpointCategory);
    return res.data;
}
export const getDataCountry = async () => {
    const res = await apiClient.get(endpointCountry);
    return res.data;
}
export const getDataYear = async () => {
    const res = await apiClient.get(endpointYear);
    return res.data;
}