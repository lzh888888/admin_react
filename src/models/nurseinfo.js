import { message } from 'antd';
import http from '../utils/http';
import { stat } from 'fs';
// import { delay } from '../utils/tools';

// 获取
async function __get(params) {
  return http({ method: 'post', api: 'getnurseinfo', params });
}
async function __add(params) {
  return http({ method: 'post', api: 'addnurseinfo', params });
}
async function __del(params) {
  return http({ method: 'get', api: 'delnurseinfo', params });
}
async function __edit(params) {
  return http({ method: 'post', api: 'updatenurseinfo', params });
}

const initState = {
  listData: {
    list: [],
    total: 0,
  },

  // 选中项，编辑和详情需要获取项数据
  activeItem: {},

  // 弹出框的打开和关闭
  showModalAdd: false,
  showModalDetail: false,
  showModalEdit: false,

  // 请求参数
  reqParams: {
    page: 1,
    userno: '',
    pageSize: 10,
  },
};

export default {
  namespace: 'nurseinfo',

  state: initState,

  effects: {
    *get(_, { call, put, select }) {
      try {
        const { user, nurseinfo } = yield select(state => state);
        const params = { ...nurseinfo.reqParams, userno: user.currentUser.phoneno };

        const { code, message, data } = yield call(__get, params);
        if(code === 200) {
          yield put({
            type: '_appendListData',
            payload: { list: data, total: data.total },
          });
        } else {
          message.warn(message);
          yield put({
            type: '_appendListData',
            payload: { list: [], total: 0 },
          });
        }
      } catch (e) {
        //
      }
    },

    *add({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__add, payload);
        if (code === 200) {
          // message.success(msg);
          yield put({
            type: '_hideModal',
            payload: { type: 'Add' },
          });
          yield put({ type: 'get' });
        } else {
          // message.warn(message);
        }
      } catch (e) {
        //
      }
    },


    *edit({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__edit, payload);
        if (code === 200) {
          // message.success(msg);
          yield put({
            type: '_hideModal',
            payload: { type: 'Edit' },
          });
          yield put({ type: 'get' });
        } else {
          message.warn(msg);
        }
      } catch (e) {
        //
      }
    },


    *del({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__del, payload);
        if (code === 200) {
          // message.success(msg);
          console.log(code);
          yield put({ type: 'get' });
        } else {
          // message.warn(msg);
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

    _showModal(state, { payload }) {
      return {
        ...state,
        activeItem: payload.item || {},
        [`showModal${payload.type}`]: true,
      };
    },

    _hideModal(state, { payload }) {
      return { ...state, [`showModal${payload.type}`]: false };
    },

    // 该页面注销后要清除当前的状态，防止下次进来还是之前的数据
    _clear() {
      return initState;
    },
  },
};