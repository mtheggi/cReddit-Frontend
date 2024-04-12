import axios from 'axios'

export const putRequest = async (url, body) => {
    try {
        const response = await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}


export const putRequestFD = async (url, formData) => {
    try {
        return axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;

    } catch (error) {
        return error.response;
    }
}


export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}

export const postRequestImg = async (url, formData) => {
    for (let pair of formData.entries()) {
        if (pair[1] instanceof File && pair[1].type.startsWith('image/')) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }
    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const patchRequest = async (url, body) => {
    try {
        const response = await axios.patch(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}
export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response;

    } catch (error) {
        return error.response;
    }
}

export const deleteRequest = async (url) => {
    try {
        const response = await axios.delete(url);

        return response;

    } catch (error) {
        return error.response;
    }

}