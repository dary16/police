/*
 * @Author: dairui 
 * @Date: 2019-09-02 19:00:44 
 * @Last Modified by: dairui
 * @Last Modified time: 2019-09-04 10:51:07
 */

import store from '../store';
//处理事件的辅助函数
function ToggleConnectionClicked() {
    if (SocketCreated && (ws.readyState == 0 || ws.readyState == 1)) {
        ws.close();
    } else {
        console.log("准备连接到聊天服务器 ...");
        try {
            ws =
                new WebSocket("ws://127.0.0.1");
            SocketCreated = true;
        } catch (ex) {
            console.log(ex, "ERROR");
            return;
        }

        ws.onopen = WSonOpen;
        ws.onmessage = WSonMessage;
        ws.onclose = WSonClose;
        ws.onerror = WSonError;
    }
};

function WSonOpen() {
    console.log("连接已经建立。", "OK");
};

function WSonMessage(event) {
    console.log(event.data);
};

function WSonClose() {
    console.log("连接关闭。", "ERROR");
};


function WSonError() {
    console.log("WebSocket错误。", "ERROR");
};

export function cmtWsClientFn() {
    return new ToggleConnectionClicked();
}