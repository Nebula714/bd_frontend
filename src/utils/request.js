import axios from 'axios'
import {getCookie} from './util'

const instance = axios.create({
    baseURL:'http://10.128.30.77:9090 ',
    timeout:3000
});

export default instance;