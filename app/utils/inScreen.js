const inScreen = (item, callback = () => { }) => {
    let init = false;

    function check() {
        if (init !== true) {
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
                windowScroll = document.documentElement.scrollTop || document.body.scrollTop,
                elemRect = windowScroll + item.getBoundingClientRect().top,
                windowCordStart = windowScroll,
                windowCordEnd = windowHeight + windowScroll,
                elemCordStart = windowScroll + item.getBoundingClientRect().top,
                elemCordEnd = elemRect + item.clientHeight;

            if (elemCordStart - 25 <= windowCordEnd && windowCordStart <= elemCordEnd + 25) {
                init = true;
                callback()
            }
        }
    }

    check()
    window.addEventListener('scroll', () => check())
}

export default inScreen
