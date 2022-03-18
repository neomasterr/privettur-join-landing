import IMask from 'imask';
import toastifyVendor from "vendors/toastify/vendors";

const $previewInputPhone = document.querySelector('.js-previewInputPhone');
const previewInputPhoneMask = IMask($previewInputPhone, {
    mask: '+7 (000) 000-00-00',
});

const $previewSendCallbackForm = document.querySelector('.js-previewSendCallbackForm');
const $previewSendCallbackSubmit = document.querySelector('button[type="submit"]');
$previewSendCallbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    $previewSendCallbackSubmit.setAttribute('disabled', 'disabled');

    const formData = new FormData(this);

    // сброс ошибок
    const $parent = $previewInputPhone.parentElement;
    $parent.classList.remove('is-error');
    const $oldError = $parent.querySelector('.pristine-error');
    if ($oldError) {
        $oldError.parentElement.removeChild($oldError);
    }

    fetch(this.action, {
        method: this.method,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    })
    .then(response => response.json())
    .then(r => {
        if (r.status != 'ok') {
            throw r;
        }

        toastifyVendor.toastSuccess('Заявка отправлена');
        $previewSendCallbackForm.reset();
    }).catch((r) => {
        $previewInputPhone.parentElement.classList.add('is-error');
        $previewInputPhone.insertAdjacentHTML('afterend', `<div class="pristine-error ui-form-field-error">${r.message}</div>`);
        toastifyVendor.toastError(r.message);
    }).finally(() => {
        $previewSendCallbackSubmit.removeAttribute('disabled');
    });
});
