import Toastify from 'toastify-js'

if (window.toastify === undefined) {
    window.toastify = Toastify
} else {
    console.log('toastify already in use');
}