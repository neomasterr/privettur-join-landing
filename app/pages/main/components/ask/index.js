class MainAsk {
    constructor() {
        this.init();
    }

    init() {
        this.addAccordion();
    }

    addAccordion() {
        this.accordion = new jcore.Accordion({
            $element: $('.j-accordion[data-name="ask"]'),
            options: {

            }
        })

        this.accordion.unmount()

        setTimeout(() => {
            this.accordion.mount()
        }, 300);
    }
}

export default MainAsk
