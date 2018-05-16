
import {
    PixelRatio,
    Dimensions
} from 'react-native';


import {toastShort} from '../toast';
const base_unit = 8;
function em(value) {
    return base_unit*PixelRatio.get()* value;
}


const Util = {
    key:'LPISHUSGtl5qVYe6Dn9DhFyLZI90upg8',
    version:'1.0',
    ratio: PixelRatio.get(),  //像素密度
    pixel: 1 / PixelRatio.get(),  //最小像素
    url:'http://47.104.236.86/',
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    style :{
        FONT_SIZE: em(0.8),
        FONT_SIZE_SMALLER: em(0.6),
        FONT_SIZE_SMALL: em(0.7),
        FONT_SIZE_TITLE: em(1),

    },
    em(value) {
        return base_unit*PixelRatio.get()* value;
    },
    toQueryString(obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            let val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    },
    timeTrans(time){
        let date = new Date(parseInt(time));//如果date为13位不需要乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    post(url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: data
        };
        fetch(url,fetchOptions)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                callback(responseData);
            })
            .catch(function(err) {
                console.log(err)
                toastShort('网络连接失败')
        });

        // _fetch(fetch(url,fetchOptions),2000).then((response) => {
        //     return response.json()
        // })
        //     .then((responseData) => {
        //
        //         callback(responseData);
        //     })
        //     .catch(function(err) {
        //         toastShort('网络连接失败')
        //     });

    },
    get(url,callback){
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                callback(responseData);
            }).catch(function(err) {
                toastShort('网络连接失败')
        })
    }
};

export default Util;