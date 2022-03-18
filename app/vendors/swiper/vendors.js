import Swiper, {Navigation} from 'swiper';

class SwiperVendor {
    constructor() {

    }

    get() {
        return new Promise((resolve, reject) => {
            if (window.swiper) {
                return resolve(window.swiper)
            }

            Swiper.use([Navigation]);
            if (window.swiper === undefined) {
                window.swiper = Swiper;
            }

            resolve(Swiper)
        })
    }
}

export { SwiperVendor }

const swiperVendor = new SwiperVendor();

export default swiperVendor
