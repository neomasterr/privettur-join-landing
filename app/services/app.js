import api from '../config/api';
import appMock from '../config/mock/app';
import { CoreService } from './core';

class AppService extends CoreService {
    api = api.app;

    constructor() {
        super({
            mock: appMock
        })
    }

    async requestCall(data) {
        return this.fetch(this.api.request_call, {
            method: 'POST',
            body: this.formData(data)
        })
    }

    async objectPlace(data) {
        return this.fetch(this.api.object_place, {
            method: 'POST',
            body: this.formData(data)
        })
    }
}

export { AppService }

const appSerivce = new AppService()

export default appSerivce