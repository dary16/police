/**
 * 参数说明
 * @userInfo 用户登录信息
 * @warningID 告警消息ID
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    warnId: '',
    disptId: '',
    activeIndex: 0
}