import config from "./index";

const api = {
    app: {
        request_call: config.host + '/about/join/send_callback/',
        object_place: config.host + '/about/join/send_new_object/'
    }
}

export default api
