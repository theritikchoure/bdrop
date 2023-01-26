import axios from "axios";
import { getAPIResponseError } from "../helper/common";

export const getRequestMethod = async (url) => {
    try {
        if (!url) {
            throw new Error('request object must be provided');
        };

        let response = await axios.get(url);
        return response;
    } catch (e) {
        throw getAPIResponseError(e) || 'Unable to fetch data, please try again';
    }
}

export const postRequestMethod = async (url, payload) => {
    try {
        if (!url) throw new Error('url must be provided');
        if (!payload) throw new Error('payload must be provided');

        let response = await axios.post(url, payload);
        console.log("API Manager Response: ", response);
        return response;

    } catch (e) {
        throw getAPIResponseError(e) || 'Unable to create data, please try again';
    }
}

export const putRequestMethod = async (url, payload) => {
    try {
        if (!url) throw new Error('url must be provided');

        if (!payload) throw new Error('payload must be provided');

        let response = await axios.put(url, payload);
        return response;
    } catch (e) {
        throw getAPIResponseError(e) || 'Unable to create data, please try again';
    }
}

export const deleteRequestMethod = async (url) => {
    try {
        if (!url) throw new Error('url must be provided');

        let response = await axios.delete(url);
        return response;
    } catch (e) {
        throw getAPIResponseError(e) || 'Unable to delete data, please try again';
    }
}

export const postRequestMethodForFile = async (url, payload) => {
    try {
        if (!url) throw new Error('url must be provided');
        if (!payload) throw new Error('payload must be provided');

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }

        let response = await axios.post(url, payload, { headers, onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(
            ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
            console.log(progress);
        } });
        console.log("API Manager Response: ", response);
        return response;

    } catch (e) {
        throw getAPIResponseError(e) || 'Unable to create data, please try again';
    }
}