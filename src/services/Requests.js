import axios from 'axios'

export const putRequest = async (url, body) => {
    try {
        console.log("put Request", body)
        const response = await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!(response.status === 200)) {
            return {
                error: true,
                status: response.status,
                message: response.statusText
            }
        }
        return response.data;

    } catch (error) {
        console.error(error);
        return { error: true, status: 500, message: error.message }
    }
}

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!(response.status === 200)) {
            return {
                error: true,
                status: response.status,
                message: response.statusText
            }
        }
        return response.data;

    } catch (error) {
        return { error: true, status: 500,  message: error.response ? error.response.data.message : error.message }
    }
}

export const patchRequest = async (url, body) => {
    try {
        console.log("patch Request", body)
        const response = await axios.patch(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!(response.status === 200)) {
            return {
                error: true,
                status: response.status,
                message: response.statusText
            }
        }
        return response.data;

    } catch (error) {
        console.error(error);
        return { error: true, status: 500, message: error.message }
    }
}
export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);

        if (!(response.status === 200)) {
            return {
                error: true,
                status: response.status,
                message: response.statusText
            }
        }
        return response.data;

    } catch (error) {
        console.error(error);
        return { error: true, status: 500, message: error.message }
    }

}

export const deleteRequest = async (url) => {
    try {
        const response = await axios.delete(url);

        if (!(response.status === 200)) {
            return {
                error: true,
                status: response.status,
                message: response.statusText
            }
        }
        return response.data;

    } catch (error) {
        console.error(error);
        return { error: true, status: 500, message: error.message }
    }

}