import { message } from 'antd';
import http from '../utils/http';


async function __get(params) {
  return http({ method: 'post', api: 'getinfo', params });
}

async function __set(data) {
  return http({ method: 'post', api: 'setinfo', data });
}

const initState = {
  currentUser: {},

  // 弹出框的打开和关闭
  showModalSet: false,
};


export default {
  namespace: 'user',

  state: initState,

  effects: {
    *get(_, { call, put, select }) {
      try {
        const { currentUser } = yield select(state => state.user);
        const params = { uid: currentUser };

        const { code, message, data } = yield call(__get, params);
        if (code === 200) {
          yield put({
            type: 'saveCurrentUser',
            payload: data.list,
          });
        } else {
          
        }
      } catch (e) {
        //
      }
    },

    *set({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__set, payload);
        if (code === 200) {
          message.success(msg);
          yield put({
            type: '_hideModal',
            payload: { type: 'Set' },
          });
          yield put({ type: 'get' });
        } else {
          message.warn(msg);
        }
      } catch (e) {
        //
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
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
    // setCurrentUser(state, action) {
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //   };
    // },
    
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};

