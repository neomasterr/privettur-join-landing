import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

if (window.swiper === undefined) {
    window.swiper = Swiper
} else {
    console.log('swiper already in use');
}

// if (getCookie('chunk_swiper') !== 'load') {
//     window.addEventListener('touchstart', () => {
//         setCookie('chunk_swiper', 'load', {
//             'max-age': 3600 * 1000 * 24 * 30,
//             'domain': `.${window.cityData.domain}`
//         })
//     }, { once: true, passive: true })
// }