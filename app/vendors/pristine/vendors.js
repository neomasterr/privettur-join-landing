import pristinejs from 'pristinejs';

class PristineVendor {
    constructor() {
        this.options = {
            classTo: 'ui-input-group',
            errorClass: 'is-error',
            successClass: 'is-success',
            errorTextParent: 'ui-input-group',
            errorTextTag: 'div',
            errorTextClass: 'ui-form-field-error'
        }
    }

    async get() {
        return pristinejs;
    }

    phoneValidator(input, formik, opt = {}) {
        const option = Object.assign({
            idx: 1,
            stop: false,
            message: "Некорректный телефон"
        }, opt)

        formik.addValidator(input, function (value) {
            if (value.length === 17 || value.length === 18) {
                return true;
            }
            return false;
        }, option.message, option.idx, option.stop);
    }

    checkboxValidator(checkbox, formik, opt = {}) {
        const option = Object.assign({
            idx: 1,
            stop: false,
            message: "Подтвердите свое согласие"
        }, opt)

        formik.addValidator(checkbox, function (value) {
            if (checkbox.checked) {
                return true;
            }
            return false;
        }, option.message, option.idx, option.stop);
    }

    emailValidator(input, formik, opt = {}) {
        const option = Object.assign({
            idx: 1,
            stop: false,
            message: "Введите корректный email"
        }, opt)

        formik.addValidator(input, function (value) {
            if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                return true;
            }
            return false;
        }, option.message, option.idx, option.stop);
    }

    minText(input, formik, opt = {}) {
        const option = Object.assign({
            idx: 1,
            stop: false,
            message: "Введите даннные"
        }, opt)

        formik.addValidator(input, function (value) {
            if (value.length > 0) {
                return true;
            }
            return false;
        }, option.message, option.idx, option.stop);
    }
}

export { PristineVendor }

const pristineVendor = new PristineVendor();

export default pristineVendor
