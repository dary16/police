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