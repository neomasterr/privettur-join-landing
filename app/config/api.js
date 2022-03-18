import config from "./index";

const api = {
    app: {
        request_call: config.host + '/app/request_call/',
        object_place: config.host + '/app/object_place/'
    }
}

export default api