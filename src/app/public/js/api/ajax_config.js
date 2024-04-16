import * as API from './api.js';

//Ajax
export async function getList(endPoint, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "GET",
            contentType: "application/json",
        });
        if (res) {
            return res;
        }
    } catch (e) {
        console.log(e);
    }
    finally {
    }
}

export async function getData(endPoint, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "GET",
            contentType: "application/json",
        });
        if (res) {
            return res;
        }
    } catch (e) {
        console.log(e);
    }
    finally {
    }
}

export async function postData(endPoint, data, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
        });
        if (res) {
            return res;
        }
    } catch (e) {
        console.log(e);
    }
    finally {
    }
}

export async function postDataImage(endPoint, data, header = false) {
    var formData = new FormData();
    formData.append("images", data);
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
        });
        if (res) {

        }
    } catch (e) {
        console.log(e);

    }
    finally {

    }
}

export async function putData(endPoint, data, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),

        });

    } catch (e) {
        console.log(e);

    }
    finally {

    }
}

export async function putStatus(endPoint, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "PUT",
            contentType: "application/json",

        });

    } catch (e) {
        console.log(e);

    }
    finally {

    }
}

export async function deleteData(endPoint, header = false) {
    try {
        const res = await $.ajax({
            url: `${API.API_URL}${endPoint}`,
            type: "DELETE",
            contentType: "application/json",

        });

    } catch (e) {
        console.log(e);
  
    }
    finally {

    }
}