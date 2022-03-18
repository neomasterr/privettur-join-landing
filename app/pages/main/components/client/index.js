import inScreen from "../../../../utils/inScreen";
import swiperVendor from "../../../../vendors/swiper/vendors";

class MainClient {
    slider;
    $slider = $('.main-client__list-wrapper');

    constructor() {
        this.init();
    }

    init() {
        inScreen(this.$slider.get(), () => {
            this.addSlider();
        })

        window.addEventListener('resize', () => {
            this.addSlider()
        })
    }

    async addSlider() {
        const Swiper = await swiperVendor.get();

        this.slider = new Swiper(this.$slider.get(), {
            spaceBetween: 0,
            loop: false,
            slidesPerView: 'auto',
            navigation: {
                prevEl: $('.main-client-wrapper .swiper-button-prev').get(),
                nextEl: $('.main-client-wrapper .swiper-button-next').get()
            },
            init: false
        })

        this.slider.init();

        window.addEventListener('resize', () => {
            this.slider.update();
            setTimeout(() => {
                this.slider.update();
            }, 300);
        })
    }
}

export default MainClient