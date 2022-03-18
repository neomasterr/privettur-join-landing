import config from "../config";

class CoreService {
    /** обьект с полями api эндпоинтов */
    api;
    /** обьект с заглушками для ответа апи */
    mock;

    constructor(props) {
        this.mock = props?.mock || null;
    }

    toastError(msg) {
        toastify({
            text: Array.isArray(msg) ? msg[0] : msg || "Произошла непредвиденная ошибка!",
            duration: 2500,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff0000, #d13b2d)",
            },
            // onClick: function(){} // Callback after click
        }).showToast();
    }

    toastSuccess(msg) {
        toastify({
            text: Array.isArray(msg) ? msg[0] : msg || "Успешно!",
            duration: 2500,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, rgb(33, 150, 83), rgba(33, 150, 83, .9))",
            }
        }).showToast();
    }

    formData(data) {
        let formData = new FormData;

        for (let key in data) {
            formData.append(key, data[key]);
        }

        return formData
    }

    json(data) {
        return JSON.stringify({ ...data })
    }

    async fetch(url, params) {
        if (config.dev) {
            console.log(`fetch: ${url}`);
        }

        /** Если включена заглушка для этого url, то возвращаем ее */
        if (config.dev && this.mock && typeof url === 'string' && this.mock[url]?.enable && this.mock[url]?.data) {
            return Promise.resolve(this.mock[url].data)
        }

        return fetch(url, Object.assign({
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }, params || {}))
            .then(async (res) => {
                if (res.status === 200) {
                    try {
                        return Promise.resolve(res)
                    } catch (error) {
                        return Promise.reject(error);
                    }
                } else {
                    return Promise.reject(`${res.status}: ${res.statusText || await res.text()}`);
                }
            })
            .then(res => res.json())
    }


    // async axios(url, params) {
    //     if (config.dev) {
    //         console.log(`api: ${url}`);
    //     }

    //     /** Если включена заглушка для этого url, то возвращаем ее */
    //     if (config.dev && this.mock && typeof url === 'string' && this.mock[url]?.enable && this.mock[url]?.data) {
    //         return Promise.resolve(this.mock[url].data)
    //     }

    //     return this.$api.request(merge({
    //         withCredentials: true,
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         method: 'post',
    //     }, Object.assign(params || {}, {
    //         url
    //     })))
    //         .then(function (res) {
    //             return res.data
    //             // return res
    //         })
    //         .catch(function (error) {
    //             if (error.response?.data) {
    //                 throw error.response.data;
    //             }
    //             throw error
    //         });
    // }
}

export { CoreService }