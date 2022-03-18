class JcoreVendor {
    constructor() {

    }

    // get() {
    //     return new Promise((resolve, reject) => {
    //         if (window.jcore) {
    //             return resolve(window.jcore)
    //         }

    //         import(/* webpackChunkName: `chunk_jcore` */ 'jcore-ui').then((jcore) => {
    //             if (window.jcore === undefined) {
    //                 window.jcore = jcore;
    //             }

    //             resolve(jcore)
    //         })
    //     })
    // }

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