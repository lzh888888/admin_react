import { message } from 'antd';
import http from '../utils/http';

// 获取
async function __get(params) {
  return http({ method: 'post', api: 'getschedule', params });
}

const initState = {
  listData: {
    list: [],
    total: 0,
  },

  // 选中项，编辑和详情需要获取项数据
  activeItem: {},


  // 请求参数
  reqParams: {
    uid: '',
  },
};

export default {
  namespace: 'doctorschedule',

  state: initState,

  effects: {
    *get(_, { call, put, select }) {
      try {
        const { user, doctorschedule } = yield select(state => state);
        const params = { ...doctorschedule.reqParams, uid: user.currentUser.phoneno };

        const { status, msg, data } = yield call(__get, params);
        if (code === '200') {
          yield put({
            type: '_appendListData',
            payload: { list: data },
          });
        } else {
          message.warn(msg);
          yield put({
            type: '_appendListData',
            payload: { list: [] },
          });
        }
      } catch (e) {
        //
      }
    },

  },

  reducers: {
    _appendListData(state, action) {
      return {
        ...state,
        listData: action.payload,
      };
    },

    // 修改请求参数
    _changeReqParams(state, action) {
      return {
        ...state,
        reqParams: {
          ...state.reqParams,
          ...action.payload,
        },
      };
    },


    // 该页面注销后要清除当前的状态，防止下次进来还是之前的数据
    _clear() {
      return initState;
    },
  },
};
