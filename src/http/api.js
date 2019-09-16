import axios from 'axios';
const api = {
    //登录接口
    getLogin: 'warningAndDispatchPoliceService/checkUserIDAndUserPass',
    //获取角色
    getRole: 'warningAndDispatchPoliceService/findUserRole',
    //列表页面
    dispatchPolice: 'warningAndDispatchPoliceService/findDispatchPolice',

    findWarningInfo: 'warningAndDispatchPoliceService/findWarningInfo',
    //上传图片
    uploadWarningImgs: 'warningAndDispatchPoliceService/uploadWarningImgs',
    //查看回执
    viewDispatchPolice: 'warningAndDispatchPoliceService/viewDispatchPolice',
    //检查是否已被回执
    checkIsReceipt: 'warningAndDispatchPoliceService/checkIsReceipt',
    //准备添加数据
    preAddDispatchPolice: 'warningAndDispatchPoliceService/preAddDispatchPolice',
    //添加数据
    addDispatchPolice: 'warningAndDispatchPoliceService/addDispatchPolice'
}

for (var k in api) {
    if (process.env.NODE_ENV == 'development') {
        // api[k] = 'http://192.168.200.199/webservice/' + api[k];
        axios.baseURL = '/webservice/';
        api[k] = '/webservice/' + api[k];
    } else {
        // api[k] = 'http://192.168.200.199' + api[k];
        // api[k] = 'http://192.168.0.100:81/airPortService/' + api[k];
        axios.baseURL = 'http://192.168.200.125/webservice/';
        api[k] = 'http://192.168.200.125/webservice/' + api[k];
        // api[k] = '/webservice/' + api[k];
    }
}
export default api;