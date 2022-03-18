class AxiosVendor {
    constructor() {

    }

    // get() {
    //     return new Promise((resolve, reject) => {
    //         if (window.axios) {
    //             return resolve(window.axios)
    //         }

    //         import(/* webpackChunkName: `chunk_axios` */ 'axios').then((axios) => {
    //             if (window.axios === undefined) {
    //                 window.axios = axios.default;
    //             }

    //             resolve(axios.default)
    //         })
    //     })
    // }
}

export default AxiosVendor