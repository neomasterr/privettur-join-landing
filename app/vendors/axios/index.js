import axios from 'axios';

if (window.axios === undefined) {
    window.axios = axios;
} else {
    console.log('axios already in use');
}