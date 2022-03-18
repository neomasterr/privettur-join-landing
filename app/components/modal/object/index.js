import appSerivce from "../../../services/app";
import jcoreVendor from "../../../vendors/jcore/vendors";
import pristineVendor from "../../../vendors/pristine/vendors";
import toastifyVendor from "../../../vendors/toastify/vendors";

class ModalPhone {
    constructor(props = {
        $inputForPhone: null
    }) {
        this.modal = new jcore.Modal({
            $element: $('.j-modal[data-name="object"]')
        });

        this.$form = this.modal.$element.find('form');
        this.$name = this.modal.$element.find('input[name="name"]');
        this.$mail = this.modal.$element.find('input[name="email"]');
        this.$phone = this.modal.$element.find('input[name="phone"]');
        this.$checkbox = this.modal.$element.find('input[name="on"]');
        this.$action = this.modal.$element.find('button');
        this.$select = new jcore.Select({
            $element: this.modal.$element.find('.j-select'),
            options: {
                value: {
                    value: "1"
                }
            }
        });

        this.$inputForPhone = props.$inputForPhone;

        this.init();
    }

    init() {
        this.addEvents();

        jcore.mask.phone(this.$phone.get());
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

        pristineVendor.phoneValidator(this.$phone.get(), formik)
        pristineVendor.checkboxValidator(this.$checkbox.get(), formik)
        pristineVendor.emailValidator(this.$mail.get(), formik)
        pristineVendor.minText(this.$name.get(), formik, {
            message: 'Введите имя'
        })

        this.$form.on('submit', (e) => {
            e.preventDefault();

            const valid = formik.validate();

            if (valid) {
                this.send();
            }
        });
    }

    send() {
        appSerivce.objectPlace({
            name: this.$name.value,
            email: this.$mail.value,
            tarif: this.$select.value.value,
            phone: this.$phone.value,
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