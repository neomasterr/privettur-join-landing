import pristine from 'pristinejs'

if (window.pristine === undefined) {
    window.pristine = pristine
} else {
    console.log('pristine already in use');
}