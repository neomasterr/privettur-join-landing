import inScreen from "../../../../utils/inScreen";
import swiperVendor from "../../../../vendors/swiper/vendors";

class MainCost {
    slider;
    $slider = $('.main-cost-list-wrapper');

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
        if (window.matchMedia('(min-width: 480px) and (max-width: 1023px)').matches && (this.slider?.destroyed || this.slider === undefined)) {
            const Swiper = await swiperVendor.get();

            this.slider = new Swiper(this.$slider.get(), {
                spaceBetween: 0,
                loop: false,
                slidesPerView: 'auto',
            })
            console.log('this.slider', this.slider);
        } else if (!window.matchMedia('(min-width: 480px) and (max-width: 1023px)').matches && !this.slider?.destroyed && this.slider) {
            console.log('this.slider', this.slider);
            this.slider.destroy(true, true);
        }
    }
}

export default MainCost
