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