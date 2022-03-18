class MainHouse {
    slider;

    constructor() {
        this.init();
    }

    init() {
        this.addTabs();
    }

    addTabs() {
        new jcore.Tab({
            $element: $('.main-house .j-tabs'),
            on: {
                toggle: (self, tab, content) => {
                    const $button = self.$tabs.find($tab => $tab.hasAttribute('data-active'));
                    document.querySelector('.main-house-image img').src = $button.dataset.src;
                },
            },
        })
    }
}

export default MainHouse
