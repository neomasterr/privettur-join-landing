import api from "../api";

const appMock = {
    [api.app.request_call]: {
        enable: true,
        data: {
            status: 'ok',
            message: 'Заявка оформлена!',
            payload: {}
        }
    },
    [api.app.object_place]: {
        enable: true,
        data: {
            status: 'ok',
            message: 'Заявка оформлена!',
            payload: {}
        }
    }
};

export default appMock