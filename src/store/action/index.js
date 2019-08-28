import {
    toast
} from 'vant';
import htp from '../../http';

export default {
    //接口请求到的值，直接返回
    _getInfo({
        commit
    }, data) {
        const method = data.method ? data.method : 'post';

        htp({
            ur: data.api,
            options: data.ops,
            method: method
        }).then(
            res => {
                typeof data.callback == 'function' && data.callback(res);
            },
            er => {
                Toast({
                    type: "fail",
                    message: er
                });
            }
        );
    }
};