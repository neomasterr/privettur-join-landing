class JcoreVendor {
    constructor() {

    }

    modalScroll(modal) {
        modal.emitter.on('render', () => {
            $('main.main').style.overflow = 'scroll';
            $('header.header').style.overflowY = 'scroll';
        })

        modal.emitter.on('destroy', () => {
            $('main.main').attr('style', null);
            $('header.header').attr('style', null);
        })
    }
}

export { JcoreVendor }

const jcoreVendor = new JcoreVendor();

export default jcoreVendor
