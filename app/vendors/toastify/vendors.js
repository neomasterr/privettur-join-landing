class ToastifyVendor {
    constructor() {

    }

    async get() {
        if (window.toastify) {
            return window.toastify
        }

        const toastify = await import(/* webpackChunkName: `chunk_toastify` */ 'toastify-js');

        if (window.toastify === undefined) {
            window.toastify = toastify.default;
        }

        return window.toastify
    }

    async toastError(msg) {
        const toastify = await this.get();

        toastify({
            className: "ui-toast ui-toast_error",
            text: Array.isArray(msg) ? msg[0] : msg || "Произошла непредвиденная ошибка, обратитесь к администратору!",
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

    async toastSuccess(msg) {
        const toastify = await this.get();

        toastify({
            className: "ui-toast ui-toast_success",
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

    async toastWarning(msg) {
        const toastify = await this.get();

        toastify({
            className: "ui-toast ui-toast_warning",
            text: Array.isArray(msg) ? msg[0] : msg || "Что то произошло!",
            duration: 2500,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, var(--color-orange-5), var(--color-orange-4))",
            }
        }).showToast();
    }
}

export { ToastifyVendor }

const toastifyVendor = new ToastifyVendor();

export default toastifyVendor