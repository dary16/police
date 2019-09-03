//获取后台服务端数据
export function getPostData(obj) {
    var userID = obj.userID ? obj.userID : '';
    var userPass = obj.userPass ? obj.userPass : '';
    var status = obj.status ? obj.status : '';
    var html = "";
    if (obj.port == "checkUserIDAndUserPass") {
        html = '<ser:checkUserIDAndUserPass>' +
            '<arg0>' + userID + '</arg0>' +
            '<arg1>' + userPass + '</arg1>' +
            '</ser:checkUserIDAndUserPass>';
    }
    if (obj.port == "findUserRole") {
        html = '<ser:findUserRole>' +
            '<arg0>' + userID + '</arg0>' +
            '</ser:findUserRole>';
    }
    if (obj.port == "findDispatchPolice") {
        html = '<ser:findDispatchPolice>' +
            '<arg0>' + userID + '</arg0>' +
            '<arg1>' + status + '</arg1>' +
            '</ser:findDispatchPolice>';
    }
    var postdata = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.application.gds/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        html +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    console.log(postdata);
    return postdata;
}