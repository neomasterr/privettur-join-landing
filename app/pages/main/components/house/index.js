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
            $element: $('.main-house .j-tabs')
        })
    }
}

export default MainHouse