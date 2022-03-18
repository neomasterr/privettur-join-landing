import appSerivce from "../../../services/app";
import jcoreVendor from "../../../vendors/jcore/vendors";
import pristineVendor from "../../../vendors/pristine/vendors";
import toastifyVendor from "../../../vendors/toastify/vendors";

class ModalPhone {
    constructor(props = {
        $inputForPhone: null
    }) {
        this.modal = new jcore.Modal({
            $element: $('.j-modal[data-name="phone"]')
        });

        this.$form = this.modal.$element.find('form');
        this.$input = this.modal.$element.find('input');
        this.$checkbox = this.modal.$element.find('input[type="checkbox"]');
        this.$action = this.modal.$element.find('button');

        this.$inputForPhone = props.$inputForPhone;

        this.init();
    }

    init() {
        this.addEvents();

        jcore.mask.phone(this.$input.get());
    }

    addEvents() {
        jcoreVendor.modalScroll(this.modal);
        this.modal.emitter.once('render', () => {
            this.submit();
        })
    }

    async submit() {
        await toastifyVendor.get();
        const pristine = await pristineVendor.get();
        const formik = new pristine(this.$form.get(), pristineVendor.options);

        pristineVendor.phoneValidator(this.$input.get(), formik)
        pristineVendor.checkboxValidator(this.$checkbox.get(), formik)

        this.$form.on('submit', (e) => {
            e.preventDefault();

            const valid = formik.validate();

            if (valid) {
                this.send();
            }
        });
    }

    send() {
        appSerivce.requestCall({
            phone: this.$input.value,
            on: this.$checkbox.get().checked
        }).then(res => {
            if (res.status === 'ok') {
                this.modal.destroy();
                return toastifyVendor.toastSuccess('Заявка успешно оформлена!')
            }

            return toastifyVendor.toastError(res?.message)
        }).catch(err => {
            toastifyVendor.toastError()
        })
    }
}

export default ModalPhone