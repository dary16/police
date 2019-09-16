window.onload = function() {
    var _root = document.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function() {
            _root.style.fontSize = parseInt(_root.clientWidth / 7.5) + 'px';
            document.body && (document.body.style.fontSize = 0.16 + 'rem');
        };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', resizeCallback, false);
        resizeCallback();
        window.addEventListener(resizeEvent, resizeCallback, false);
    }
}

export function formatDate(time, type) {
    let format = '';
    let data = '';

    if (time) {
        data = new Date(parseInt(time));
    } else {
        data = new Date();
    }

    var o = {
        'M+': data.getMonth() + 1, //月份
        'd+': data.getDate(), //日
        'h+': data.getHours(), //小时
        'm+': data.getMinutes(), //分
        's+': data.getSeconds() //秒
    };

    format = type == 1 ? 'hh:mm:ss' : type == 2 ? 'yyyy-MM-dd' : type == 3 ? 'yyyy-MM-dd hh:mm:ss' : type == 4 ? 'yyyy-MM' : type == 5 ? 'MM' : type == 6 ? 'yyyy' : type == 7 ? 'hh:mm' : type == 8 ? 'yyyyMMdd' : 'yyyy-MM-dd hh:mm';

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

export function getPostData(name, arr) {
    var postdata = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.application.gds/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        getParams(name, arr) +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    return postdata;
}


// export function getParams(name, arr) {
//     if (typeof arr === 'object') {
//         var arrNew = []
//         for (let i in arr) {
//             arrNew.push(arr[i]); //属性
//         }

//         let str = '<ser:' + name + '>';
//         arrNew.forEach((item, index) => {
//             str += '<arg' + index + '>' + item + '</arg' + index + '>'
//         });
//         str = str + '</ser:' + name + '>';
//         return str;
//     }
// }

export function getParams(name, arr) {
    if (arr instanceof Array) {
        let str = '<ser:' + name + '>';
        arr.forEach((item, index) => {
            str += '<arg' + index + '>' + item + '</arg' + index + '>';
        });
        str = str + '</ser:' + name + '>';
        return str;
    } else {
        //参数为对象
        var arrNew = [];
        let str = '<ser:' + name + '>' + '<arg0>' + JSON.stringify(arr) + '</arg0>' + '</ser:' + name + '>';

        return str;
    }
}

//set local
export function setLoc(k, val) {
    if (typeof val == 'string') {
        localStorage.setItem(k, val);
        return val;
    }
    localStorage.setItem(k, JSON.stringify(val));
    return val;
}

//get local
export function getLoc(k) {
    let uu = localStorage.getItem(k);

    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) {}
    return uu;
}