import {
    setLoc
} from '../../utils/common.js';
export default {
    _userInfo(state, userInfo) {
        setLoc('userInfo', userInfo);
        state.userInfo = userInfo;
    },
    _warnId(state, warnId) {
        setLoc('warnId', warnId);
        state.warnId = warnId;
    },
    _disptId(state, disptId) {
        setLoc('dispatchId', disptId);
        state.disptId = disptId;
    },
    _activeIndex(state, activeIndex) {
        state.activeIndex = activeIndex;
    }
}