import jcore from 'jcore-ui';

if (window.jcore === undefined) {
    window.jcore = jcore;
} else {
    console.log('jcore already in use');
}

if (window.$ === undefined) {
    window.$ = jcore.$;
} else {
    console.log('jdom already in use');
}